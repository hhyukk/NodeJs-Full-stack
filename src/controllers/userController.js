import User from '../models/User';
import Video from '../models/Video';
import bcrypt from 'bcrypt';

export const getJoin = (req, res) => res.render('join', { pageTitle: 'Join' });
export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  const pageTitle = 'Join';
  if (password != password2) {
    return res.status(400).render('join', {
      pageTitle,
      errorMessage: 'Password confirmation does not match',
    });
  }
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render('join', {
      pageTitle,
      errorMessage: 'This username/email is already taken',
    });
  }
  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    res.redirect('/login');
  } catch (error) {
    return res.status(400).render('join', { pageTitle: 'Post Join', errorMessage: error._message });
  }
};

export const getLogin = (req, res) => res.render('login');
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = 'Login';
  const user = await User.findOne({ username, githubId: false });
  if (!user) {
    return res
      .status(400)
      .render('login', { pageTitle, errorMessage: 'An account with this username does not exists.' });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render('login', {
      pageTitle,
      errorMessage: 'Wrong password',
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  res.redirect('/');
};

// GitHub OAuth 로그인 요청을 처리하는 함수
export const startGithubLogin = (req, res) => {
  const baseUrl = `https://github.com/login/oauth/authorize`;

  // GitHub OAuth 인증에 필요한 파라미터 설정
  const config = {
    client_id: process.env.GH_CLIENT, // GitHub OAuth 애플리케이션의 클라이언트 ID
    allow_signup: false, // 새로운 사용자 가입을 허용하지 않음 (false)
    scope: 'read:user user:email', // GitHub API에서 요청할 권한 범위 (사용자의 기본 정보 및 이메일)
  };

  // 설정한 파라미터들을 URLSearchParams를 통해 URL 형식으로 변환
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`; // 최종적으로 GitHub OAuth 인증 URL을 생성

  return res.redirect(finalUrl);
};
// GitHub OAuth 로그인 후 액세스 토큰을 처리하는 함수
export const finishGithubLogin = async (req, res) => {
  // GitHub OAuth 액세스 토큰 요청 URL의 기본 경로
  const baseUrl = 'https://github.com/login/oauth/access_token';

  // GitHub OAuth 액세스 토큰 요청에 필요한 파라미터 설정
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code, // GitHub 로그인 과정에서 전달된 인증 코드
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json', // 응답을 JSON 형식으로 받기 위해 Accept 헤더를 설정
      },
    })
  ).json();

  // 액세스 토큰이 응답에 포함되어 있는지 확인
  if ('access_token' in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = 'https://api.github.com'; // GitHub API의 기본 URL 설정

    // GitHub 사용자 정보를 가져오기 위한 API 호출
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    // GitHub 사용자 이메일 정보
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    // 이메일 정보 중에서 primary(기본 이메일)이며, verified(검증된 이메일)인 이메일을 찾음
    const emailObj = emailData.find((email) => email.primary === true && email.verified === true);

    // 유효한 이메일이 없는 경우
    if (!emailObj) {
      return res.redirect('/login ');
    }

    // 이메일로 기존 사용자를 DB에서 찾음
    let user = await User.findOne({ email: emailObj.email });

    // 기존 사용자가 없으면 새 사용자 생성
    if (!user) {
      const user = await User.create({
        name: userData.name,
        avatarUrl: userData.avatar_url,
        username: userData.login,
        email: emailObj.email,
        password: '',
        githubId: true,
        location: userData.location,
      });
    }
    // 기존 사용자가 있으면 세션에 로그인 상태와 사용자 정보를 저장
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect('/');
  } else {
    // 액세스 토큰을 받지 못한 경우
    return res.redirect('/login');
  }
};
export const logout = (req, res) => {
  req.session.destroy(); //세션 제거
  return res.redirect('/');
};

export const getEdit = (req, res) => {
  console.log(req.session.user);
  return res.render('edit-profile', { pageTitle: 'Edit Profile' });
};
export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl, email: sessionEmail, username: sessionUserName },
    },
    body: { name, email, username, location },
    file,
  } = req;
  if (await User.exists({ $or: [{ username }, { email }] })) {
    if (sessionEmail === email || sessionUserName === username) {
    } else {
      return res.status(400).json({ errorMessage: 'username or email already exists!' });
    }
  }
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl,
      name,
      email,
      username,
      location,
    },
    { new: true }
  );
  req.session.user = updatedUser;
  return res.redirect('/users/edit');
};

export const getChangePassword = (req, res) => {
  if (req.session.user.githubId === true) {
    return res.redirect('/');
  }
  return res.render('users/change-password', { pageTitle: 'Change Password' });
};
export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id, password },
    },
    body: { oldPassword, newPassword, newPasswordConfirmation },
  } = req;
  const user = await User.findById(_id); //로그아웃 없이 비밀번호 변경하는 경우 세션 업데이트가 필요
  const ok = await bcrypt.compare(oldPassword, user.password);
  if (!ok) {
    return res.status(400).render('users/change-password', {
      pageTitle: 'Change Passwordddd',
      errorMessage: 'The current password is incorrect',
    });
  }
  if (newPassword !== newPasswordConfirmation) {
    return res.status(400).render('users/change-password', {
      pageTitle: 'Change Passwordddd',
      errorMessage: 'The password does not match the confirmation',
    });
  }
  console.log('Old password', user.password);
  user.password = newPassword;
  console.log('New unhashed pw', user.password);
  await user.save();
  console.log('new pw', user.password);

  return res.redirect('/users/logout');
};
export const see = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate('videos');
  if (!user) {
    return res.status(404).render('404', { pageTitle: 'User not found.' });
  }
  return res.render('users/profile', { pageTitle: user.name, user });
};
