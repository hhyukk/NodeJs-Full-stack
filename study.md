# What is NodeJS

NodeJS: 브라우저 밖에서 돌아가는 자바스크립트

# What is NPM

npm 은 자바스크립트 프로그래밍 언어를 위한 패키지 관리자이다.

자바스크립트 런타임 환경 Node.js의 기본 패키지 관리자이다.

https://www.npmjs.com/

- node -v: node 버전 확인
- npm - v: npm 버전 확인

# Dependencies

package.json파일의 dependencies는 프로젝트를 실행하는 데 필요한 필수 모듈들의 목록이다.
package-lock.json은 node_modules 구조나 package.json이 수정되고 생성될 때 당시 의존성에 대한 정확하고 구체적인 정보를 품고 자동으로 생성된다.

# Express

자바스크립트 프레임워크로 React, 자바 프레임워크로 Spring 등등이 있는 것처럼 Express는 node.js를 빠르고 간결하게 사용할 수 있게 해주는 NodeJS의 프레임워크이다.

### Express의 특징

- Express는 서버 사이드 프레임워크로 node.js의 api를 단순화하고, 유용한 기능을 추가해 쉽게 서버를 구축할 수 있게 해준다.
- 코드의 양을 줄여주고 유지 보수가 쉽게 해준다.
- 확장성을 지향한다. 불필요한 간섭이 없고 사용자가 필요한 라이브러리를 추가해서 확장 가능하다.
- http request와 response를 컨트롤할 수 있다.

# Babel

Babel이란 최신 ES6, ES7 버전의 JavaScript 코드를, ES5버전의 코드로 바꾸어주는 Node.js 패키지

### Babel 설치

npm install --save-dev @babel/core

npm install @babel/preset-env --save-dev

babel.config.json파일 생성

```
{
"presets": ["@babel/preset-env"]
}
```

https://babeljs.io/setup#installation

@babel/preset-env는 환경에 필요한 구문 변환을 세부적으로 관리할 필요 없이 최신 JavaScript를 사용할 수 있게 해주는 스마트한 preset

https://babeljs.io/docs/en/babel-preset-env

script를 `node index.js`에서 `babel-node index.js`로 수정하여 사용

# Nodemon

Nodemon은 프로젝트 폴더의 파일들을 모니터링 하고 있다가 파일이 수정되면 서버를 자동으로 restart 시켜주는 패키지

npm install @babel/core @babel/node --save-dev

script를 `nodemon --exec babel-node index.js` 로 수정

# GET Request

서버를 만들면 서버가 사용자 요청에 응답하도록 해야 한다.

사용자는 HTTP 프로토콜을 사용하여 요청한다. 이 요청을 GET request라고 한다.

주소 표시줄에 URL을 입력하고 페이지가 로드되면 실제로 서버에 GET 요청을 보내 응답을 얻고 브라우저에 응답을 표시한다.

사용자 브라우저의 GET 요청에 서버가 응답하도록 하려면 다음과 같이 "홈 URL" 및 "eventHandler 기능"을 사용하는 .get()을 설정합니다:

```js
const handleHome = () => console.log('Somebody is trying to go home.');
app.get('/', handleHome);
```

server.js(익스프레스 서버가 시작된 후에 배치해야 함)에 이러한 코드가 있으면 사용자의 GET 요청에 응답하는 방법을 알 수 있습니다.

그러나 EventHandler는 아무것도 반환하지 않기 때문에 서버의 응답을 기다리며 브라우저를 계속 로드합니다.

# Responses

.get("URL", "GET 핸들러 기능")을 설정하면 Get 요청이 처리되지만 GET 요청에는 응답하지 않는다.

서버가 사용자의 GET 요청에 응답하도록 하려면 EventHandler 함수를 화살표 함수로 수정해야 합니다. 그런 다음 response 인수 .end() 또는 .send()를 다음과 같이 만듭니다:

```js
const handleHome = (req, res) => {
  return res.send('Home here');
};
```

GET 핸들러 함수 내부의 첫 번째 인수는 일반적으로 요청 개체를 포함하는 "req"로 명명된다.

두 번째 인수는 일반적으로 "res"로 명명되며 응답 개체를 사용한다.

res.end()는 아무 것도 반환하지 않고 응답을 종료하고 res.send()는 사용자의 브라우저에 입력을 반환한다. 이 특정한 예에서 사용자는 서버에 홈("/") URL 페이지를 요청할 때 브라우저에 "Home here"라는 문자열을 볼 수 있다.

# Middleware

Middleware는 request와 response 사이의 소프트웨어다.

모든 Middleware는 handler이고 모든 controller는 Middleware다.

Middleware는 세 가지 논법을 가지고 있다. (req, res, next)

Next 인수는 [next()] 다음 처리기 함수가 존재하는 경우 이 함수를 호출한다.

```js
// Middleware "one"으로 시작하지만 next()가 호출되었기 때문에 결국 컨트롤러 "three"으로 끝난다.
// Middleware "one"과 "two"의 본체 안에 코드를 넣어 컨트롤러 "three"에 도달하기 전에 무언가를 확인할 수 있다.
const one = (req, res, next) => {
  next();
};
const two = (req, res, next) => {
  next();
};
const three = (req, res) => {
  console.log('Now three is handling');
};

// app.get은 "one" 핸들러로 "/" URL을 방문하는 사용자를 처리
app.get('/', one, two, three);
```

app.use는 global middleware를 만들 수 있게 해주는 함수

global middleware란 어떤 url을 들어가도 사용하게 되는걸 의미함

middleware는 express가 위에서 아래로 읽기 때문를 먼저 use 해주고 그 다음에 url을 get 해주는 순서를 지켜줘야한다

# Morgan

NodeJS를 위한 HTTP request logger

`npm i morgan`

https://www.npmjs.com/package/morgan

### Morgan 사용법

https://www.npmjs.com/package/morgan#examples

skip을 사용해서 특정 statusCode만 필터 가능

```js
// EXAMPLE: only log error responses
morgan('combined', {
  skip: function (req, res) {
    return res.statusCode < 400;
  },
});
```

# Router

모든 Express 애플리케이션에는 앱 라우터가 내장되어 있다.

라우터는 미들웨어 자체처럼 작동하므로 app.use()에 대한 인수로 또는 다른 라우터의 use() 메서드에 대한 인수로 사용할 수 있다.

최상위 익스프레스 객체에는 새로운 라우터 객체를 생성하는 Router() 메서드가 있다.

https://expressjs.com/ko/4x/api.html#router

`app.get([URL], [Handler])`를 사용하여 요청을 처리하는 대신 라우터를 만들고 라우터가 GET 요청을 처리하도록 할 수 있다.

`app.use('/', globalRouter);` - 이러한 방식으로 사용자가 GET 요청을 보내면 요청이 homeRouter로 라우팅된다.

그런 다음 다음 다음과 같이 globalRouter라는 상수 변수를 만든다:

`const globalRouter = express.Router();`

다음과 같이 핸들러 함수를 만든다:

`const handleHome = (req, res) => res.send('Home');`

라우터를 핸들러에 연결하려면 아래 코드를 사용한다:

`globalRouter.get('/', handleHome);`

# Export

다른 라우터에 다른 컨트롤러를 가져오기

export default 는 한파일에 하나밖에 export하지 못함

`export const (controller이름) = (req,res) => {}`

이렇게 export 한 후에는 `import {control1, control2} from ""` 처럼
import 할 수 있다

# 정규표현식

- \w+: 모든 문자, 숫자 선택
- \d+: 모든 숫자 선택

# Pug

Pug는 Haml의 영향을 많이 받은, Node.js 및 브라우저용 JavaScript로 구현된 고성능 템플릿 엔진입니다.

- npm i pug
- https://www.npmjs.com/package/pug

### 템플릿 엔진이란?

웹페이지 구성 시 가장 기본적으로 쓰이는 마크업 언어인 HTML은 정적인 언어이다.

주어진 기능만 사용할 수 있으며, 직접 기능을 추가할 수 없다. 그러나 자바스크립트와 함께라면 가능하다.

템플릿 엔진은 자바스크립트를 사용하여 HTML을 렌더링할 수 있게 해준다.

따라서 기존 HTML과 문법이 살짝 다를 수도 있고, 자바스크립트 문법이 들어가기도 한다.

템플릿 엔진에는 대표적으로 퍼그 (Pug), 넌적스 (Nunjucks), EJS, Handlebars 등이 있다.

### Express와 함께 사용

Express가 템플리트를 렌더링하려면 다음과 같은 애플리케이션 설정이 필요합니다.

views, 템플리트가 있는 디렉토리. 예: app.set('views', './views')

view engine, 사용할 템플리트 엔진. 예: app.set('view engine', 'pug')

https://expressjs.com/ko/guide/using-template-engines.html

### Pug 안에 Js 넣는법

`#{Js code}`

### Pug 장점

1. 깔끔한 html 작성
2. html안에 JS 작성가능
3. 반복하지 않고 한파일로 모든 템플릿 업데이트 가능!

### Includes

include를 사용하면 한 Pug 파일의 내용을 다른 파일에 삽입할 수 있습니다.

https://pugjs.org/language/includes.html

### Template Inheritance

Pug는 템플릿 상속을 지원합니다. 템플릿 상속은 block과 extends키워드를 통해 사용합니다.

템플릿의 block에는 하위 템플릿을 대체할 수 있습니다.

https://pugjs.org/language/inheritance.html

### `res.render(view [, locals] [, callback])`

res.render()를 통해 view를 렌더링하고 렌더링된 HTML 문자열을 클라이언트에 보냅니다.

locals에는 view에 전달한 local 변수를 지정할 수 있습니다.

https://expressjs.com/ko/api.html#res.render

### Conditionals(조건문)

https://pugjs.org/language/conditionals.html

### Iteration (반복)

Pug는 each와 while라는 두 가지 기본 반복 방법을 지원합니다.

```js
ul
  each val in [1, 2, 3, 4, 5]
    li= val
```

배열이나 객체에 반복할 값이 없으면 실행될 else 블록을 추가할 수도 있습니다.

```js
- var values = [];
ul
  each val in values
    li= val
  else
    li There are no values
```

https://pugjs.org/language/iteration.html

### Mixins

Mixin을 사용하면 재사용 가능한 Pug 블록을 만들 수 있습니다.

또한 Mixindm은 함수로 컴파일되며 인수를 사용할 수 있습니다.

```js
//- Declaration
mixin list
  ul
    li foo
    li bar
    li baz
//- Use
+list
+list
```

https://pugjs.org/language/mixins.html

# MVP

https://andybrewer.github.io/mvp

### MVP.css

link(rel="stylesheet" href="https://unpkg.com/mvp.css")

# req.body

req.body에는 form을 통해 submit된 데이터의 키-값 쌍을 포함합니다.

기본적으로는 undefined이며 express.json() 또는 express.urlencoded()와 같은 바디 파싱 미들웨어를 사용할 때 값을 받아옵니다.

```js
// 애플리케이션/json 파싱
app.use(express.json());
// application/x-www-form-urlencoded파싱 (form데이터 파싱)
app.use(express.urlencoded({ extended: true }));
```

https://expressjs.com/ko/api.html#req.body

express.urlencoded([options])
Express에 내장된 미들웨어 기능입니다.
urlencoded 페이로드로 들어오는 요청을 구문 분석하고 바디 파서를 기반으로 합니다.

https://expressjs.com/ko/api.html#express.urlencoded

# MongoDB

MongoDB는 문서 지향적인 NoSQL 데이터베이스로, 대량의 비정형 데이터를 저장하고 처리하는 데 사용된다.

## 문서 지향적이란?

문서 지향적(Document-oriented)이란 데이터베이스 시스템의 한 종류이다.

MongnDB에서는 비정형 데이터를 저장하고 관리하기 위해 문서(Document)라는 개념을 중심으로 데이터를 구성한다.

```json
{
  "name": "John",
  "age": 30,
  "email": "john@example.com"
}
```

### WSL에서 MongoDB 설치

https://www.mongodb.com/ko-kr/docs/manual/tutorial/install-mongodb-on-ubuntu/#std-label-install-mdb-community-ubuntu

# Mongoose
Mongoose 모듈은 MongoDB 라는 NoSQL 데이터베이스를 Node.js로 사용할 수 있도록 하는 확장 모듈 중 하나 입니다.

## MongoDB 연결
```js
import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/wetube');
```

# Error

`Error: Failed to lookup view "home" in views directory "/home/hhyukk/NodeJs/views"`

views 디렉토리에서 "home"이라는 view를 찾는데 실패했다는 오류 발생

즉, express가 views 디렉토리에서 home이라는 파일을 찾지 못했다는 뜻

기본적으로 express는 cwd(현재 작업 디렉토리) + /views에서 pug 파일을 찾지만 실제로 pug 파일은 cwd/src/views에 있기 때문에 오류가 발생한 것

cwd는 node.js를 실행하는 디렉토리이고 현재 node.js를 실행하는건 package.json이기 때문에 NodeJs/package.json이 cwd가 됨

### 해결방법

1. views 폴더를 src 밖으로 꺼낸다.
2. `app.set('views', process.cwd() + '/src/views');`을 사용해서 express의 default 값을 변경해준다.
