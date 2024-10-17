import User from '../models/User';
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
  const user = await User.findOne({ username });
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
  const data = await fetch(finalUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json', // 응답을 JSON 형식으로 받기 위해 Accept 헤더를 설정
    },
  });
  const json = await data.json(); // 요청에 대한 응답 데이터를 JSON으로 변환
  console.log(json);
};
export const logout = (req, res) => res.send('Log out');
export const edit = (req, res) => res.rend('Edit User');
export const remove = (req, res) => res.send('Remove User');
export const see = (req, res) => res.send('See User');
