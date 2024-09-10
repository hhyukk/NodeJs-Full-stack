# What is NodeJS

NodeJS: 브라우저 밖에서 돌아가는 자바스크립트

## Dependencies

package.json파일의 dependencies는 프로젝트를 실행하는 데 필요한 필수 모듈들의 목록이다.
package-lock.json은 node_modules 구조나 package.json이 수정되고 생성될 때 당시 의존성에 대한 정확하고 구체적인 정보를 품고 자동으로 생성된다.

## GET Request

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

## Responses

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

# What is NPM

npm 은 자바스크립트 프로그래밍 언어를 위한 패키지 관리자이다.

자바스크립트 런타임 환경 Node.js의 기본 패키지 관리자이다.

https://www.npmjs.com/

- node -v: node 버전 확인
- npm - v: npm 버전 확인
-

## bcrypt

암호를 해시하는 데 도움이 되는 라이브러리입니다.

`npm i bcrypt`

https://www.npmjs.com/package/bcrypt

### bcrypt를 이용해서 비밀번호 비교

password: 유저가 입력한 비밀번호

user.passwordHash: DB에 해시화되서 저장된 비밀번호

```js
const match = await bcrypt.compare(password, user.passwordHash);
```

## express-session

Express용 세션 미들웨어

쿠키에는 세션 ID만 저장됩니다. 세션 데이터는 서버 측에 저장됩니다.

`npm i express-session`

https://www.npmjs.com/package/express-session

### Session 사용 예시

https://github.com/expressjs/session#example

### req.session.id 또는 req.sessionID

브라우저가 request할 때 같이 보내는 session id

### resave (변경 사항이 없어도 저장)

request하는 동안 세션이 수정되지 않은 경우에도 세션이 세션 저장소에 다시 저장되도록 합니다.

세션을 항상 저장할지 여부를 정하는 값 (익명성이나 봇에게 세션을 주게되면 DB도 그만큼 커지고 유지보수가 어렵기에 false 권장)

https://github.com/expressjs/session#resave

### saveUninitialized (세션 초기화 전에도 저장)

"초기화되지 않은" 세션을 저장소에 강제로 저장합니다.

request에서 새로 생성된 session에 아무런 작업이 이뤄지지 않은 상태도 저장할 것인가?

- true: 클라이언트들이 서버에 방문한 총 횟수를 알고자 할때 사용한다.

- false: uninitialized 상태인 세션을 강제로 저장하면 내용도 없는 빈 세션이 스토리지에 계속 쌓일수 있다. 이를 방지, 저장공간을 아끼기 위해 사용한다.

https://github.com/expressjs/session#saveuninitialized

## Nodemon

Nodemon은 프로젝트 폴더의 파일들을 모니터링 하고 있다가 파일이 수정되면 서버를 자동으로 restart 시켜주는 패키지

npm install @babel/core @babel/node --save-dev

script를 `nodemon --exec babel-node index.js` 로 수정

## Morgan

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

## Pug

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

## dotenv

Dotenv는 .env 파일에서 process.env로 환경 변수를 로드하는 제로 종속성 모듈입니다.

`npm i dotenv`

https://www.npmjs.com/package/dotenv

방법1. `import dotenv from "dotenv", dotenv.config()`

방법2. `import "dotenv/config"`

# Express

자바스크립트 프레임워크로 React, 자바 프레임워크로 Spring 등등이 있는 것처럼 Express는 node.js를 빠르고 간결하게 사용할 수 있게 해주는 NodeJS의 프레임워크이다.

## Express의 특징

- Express는 서버 사이드 프레임워크로 node.js의 api를 단순화하고, 유용한 기능을 추가해 쉽게 서버를 구축할 수 있게 해준다.
- 코드의 양을 줄여주고 유지 보수가 쉽게 해준다.
- 확장성을 지향한다. 불필요한 간섭이 없고 사용자가 필요한 라이브러리를 추가해서 확장 가능하다.
- http request와 response를 컨트롤할 수 있다.

## node.js express와 일반 서버의 차이

보통 일반적인 server에서는 1부터 9까지 요청이 있으면
1부터 9까지 순서대로 실행을 합니다.
여기서 발생할 수 있는 문제는 예를 들어, 4번 요청이 무거워서 실행이 오래 걸린다 치면 (500시간 짜리 영상 업로드라던지)
5~9번 요청은 4번 요청의 실행이 완료될 때까지 기다려야 합니다.

웹개발에서 이는 치명적이라 할 수 있습니다. 사용자 1 ~ 9 가 영상을 업로드하는데, 4번이 갑자기 500시간짜리 영상을 업로드 해버리면 5 ~ 9번 사용자의 요청은 4번 사용자의 요청이 완료될 때까지 기다려야합니다.

하지만 node.js 서버에서는 일단 1번부터 9번까지 다 받고
오래걸리는 4번은 나중에 실행됩니다. 덕분에 4번은 괘씸죄로 기다리지만 그 동안 4번을 제외한 나머지 요청은 빠르게 수행됩니다.

즉, nodejs의 서버는 일단 빠른건 다 실행하고 느린건 나중에 실행합니다.

위에서 설명한 일반서버처럼
순차적으로 처리하는 방식: 동기(Synchronous) 처리방식
비순차적으로 처리하는, 동시에 처리하는 방식: 비동기(Asynchronous) 처리 방식이라고 합니다

node.js가 요청이 굉장히 많은 (예: 채팅, 유튜브 등) 서버를 구현할 때 아주 유용한 이유가 여기에 있습니다. 다만 웹 개발 이외에는 (제가 아는 바로는) 비추하는 듯 합니다 (이미지 처리 등)

## res.locals

request 범위가 지정된 response 로컬 변수를 포함하는 객체이므로 request, response 주기동안 렌더링된 view에서만 사용할 수 있습니다.

(Pug나 EJS같은 템플릿 엔진에서 사용 가능하다는 의미)

이 속성은 request path, 인증된 사용자, 사용자 설정 등과 같은 request level의 정보를 노출하는 데 유용합니다.

```js
// 사용 예시
app.use(function (req, res, next) {
  res.locals.user = req.user;
  res.locals.authenticated = !req.user.anonymous;
  next();
});
```

https://expressjs.com/ko/api.html#res.locals

## `res.render`

res.render()를 통해 view를 렌더링하고 렌더링된 HTML 문자열을 클라이언트에 보냅니다.

locals에는 view에 전달한 local 변수를 지정할 수 있습니다.

https://expressjs.com/ko/api.html#res.render

## Middleware

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

## Router

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

### Export

다른 라우터에 다른 컨트롤러를 가져오기

export default 는 한파일에 하나밖에 export하지 못함

`export const (controller이름) = (req,res) => {}`

이렇게 export 한 후에는 `import {control1, control2} from ""` 처럼
import 할 수 있다

## req.body

req.body에는 form을 통해 submit된 데이터의 키-값 쌍을 포함합니다.

기본적으로는 undefined이며 express.json() 또는 express.urlencoded()와 같은 바디 파싱 미들웨어를 사용할 때 값을 받아옵니다.

```js
// 애플리케이션/json 파싱
app.use(express.json());
// application/x-www-form-urlencoded파싱 (form데이터 파싱)
app.use(express.urlencoded({ extended: true }));
```

https://expressjs.com/ko/api.html#req.body

### express.urlencoded([options])

Express에 내장된 미들웨어 기능입니다.

urlencoded 페이로드로 들어오는 요청을 구문 분석하고 바디 파서를 기반으로 합니다.

https://expressjs.com/ko/api.html#express.urlencoded

## req.query

라우트 안에 query string parameter를 포함하고 있는 객체로, URL에서 데이터를 가져올 때 주로 사용한다.

예) ?keyword="food" => {keyword: "food"}

query parse가 비활성화로 설정되면 빈 객체 {}이고, 그렇지 않으면 구성된 query parse의 결과입니다.

https://expressjs.com/ko/api.html#req.query

# Babel

Babel이란 최신 ES6, ES7 버전의 JavaScript 코드를, ES5버전의 코드로 바꾸어주는 Node.js 패키지

## Babel 설치

`npm install --save-dev @babel/core`

`npm install @babel/preset-env --save-dev`

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

# 정규표현식

- \w+: 모든 문자, 숫자 선택
- \d+: 모든 숫자 선택

http://regexpal.com

# MVP

https://andybrewer.github.io/mvp

## MVP.css

link(rel="stylesheet" href="https://unpkg.com/mvp.css")

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

## WSL에서 MongoDB 설치

https://www.mongodb.com/ko-kr/docs/manual/tutorial/install-mongodb-on-ubuntu/#std-label-install-mdb-community-ubuntu

## MongoDB regex ($regex)

몽고DB에서 정규표현식을 사용하기 위해 사용하는 키워드

쿼리의 패턴 일치 문자열에 대한 정규식 기능을 제공합니다.

https://docs.mongodb.com/manual/reference/operator/query/regex

## MongoDB Document

몽고DB는 ObjectID를 24바이트 16진 문자열 표현으로 반환한다.

https://mongodb.github.io/node-mongodb-native/api-bson-generated/objectid.html
https://docs.mongodb.com/manual/reference/method/ObjectId/

## $or

or 연산자는 둘 이상의 조건에 대해 논리적 OR 연산을 수행하고 조건 중 하나 이상을 충족하는 문서를 선택합니다.

```mongodb
db.inventory.find({ $or: [{ quantity: { $lt: 20 } }, { price: 10 }] });
```

https://docs.mongodb.com/manual/reference/operator/query/or/#mongodb-query-op.-or

## MongoDB의 collection이름이 Video가 아닌 videos인 이유

Mongoose는 자동으로 모델을 찾고, 해당 모델의 이름을 따서 소문자+뒤에 s(복수형)을 붙여 컬렉션을 생성합니다.

Tank 모델은 -> 컬렉션에 저장될 때, tanks로 저장됩니다.

`Document.prototype.save()`

https://mongoosejs.com/docs/api.html#document_Document-save

`Model.create()`

하나 이상의 문서를 데이터베이스에 저장하기 위한 손쉬운 방법입니다.

MyModel.create(docs)는 문서의 모든 문서에 대해 새로운 MyModel(doc).save()를 수행합니다.

create()을 하게 되면 save()를 생략할 수 있습니다.

create()이 다음 미들웨어인 save()를 트리거하기 때문입니다.

https://mongoosejs.com/docs/api.html#model_Model.create

Collection: Document들을 담고 있는 묶음

# RegExp mdn

RegExp 생성자는 패턴을 사용해 텍스트를 판별할 때 사용합니다.

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/RegExp

## RegExp 사용 방법

RegExp 객체는 리터럴 표기법과 생성자로써 생성할 수 있습니다.

리터럴 표기법의 매개변수는 두 빗금으로 감싸야 하며 따옴표를 사용하지 않습니다.

생성자 함수의 매개변수는 빗금으로 감싸지 않으나 따옴표를 사용합니다.

```js
// /ab+c/i 를 아래 RegExp 생성자를 이용해서 만들 수 있습니다.
new RegExp(/ab+c/, 'i'); // 리터럴 표기법
new RegExp('ab+c', 'i'); // 생성자 함수
```

# Mongoose

Mongoose 모듈은 MongoDB 라는 NoSQL 데이터베이스를 Node.js로 사용할 수 있도록 하는 확장 모듈 중 하나 입니다.

## MongoDB 연결

```js
import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/wetube');
```

## Schemas

몽구스의 모든 것은 스키마로 시작합니다.

각 스키마는 MongoDB 컬렉션에 매핑되고 해당 컬렉션 내 문서의 모양을 정의합니다.

https://mongoosejs.com/docs/guide.html#schemas

### 몽구스 스키마 타입 확인

Mongoose 스키마는 Mongoose 모델을 구성하기 위한 객체로 생각할 수 있습니다.
https://mongoosejs.com/docs/schematypes.html

### 몽구스 스키마 타입 정의

몽구스의 모든 것은 스키마로 시작합니다. 각 스키마는 MongoDB 컬렉션에 매핑되고 해당 컬렉션 내 문서의 모양을 정의합니다.
https://mongoosejs.com/docs/guide.html

### `SchemaType.prototype.unique()`

고유 인덱스를 선언합니다.

제약 조건을 위반하면 Mongoose 유효성 검사 오류가 아니라 저장할 때 MongoDB에서 E11000 오류를 반환합니다.

https://mongoosejs.com/docs/api.html#schematype_SchemaType-unique

## Models

`mongoose.model(modelName, schema);`

모델은 스키마 정의에서 컴파일된 멋진 생성자입니다.

모델의 인스턴스를 document라고 합니다.

모델은 기본 MongoDB 데이터베이스에서 문서를 만들고 읽습니다.

https://mongoosejs.com/docs/guide.html#models

https://mongoosejs.com/docs/models.html

### Statics

모델에 static 함수를 추가할 수도 있습니다.

스키마에서 컴파일된 모델에 정적 "class" 메서드를 추가합니다.

Static 사용하는 두 가지 방법

```js
animalSchema.statics.findByName = function (name) {
  return this.find({ name: new RegExp(name, 'i') });
};

animalSchema.static('findByBreed', function (breed) {
  return this.find({ breed });
});
```

https://mongoosejs.com/docs/guide.html#statics

### Model.find()

documents를 찾습니다. (findOne과 다르게 전체 document를 찾습니다.)

Mongoose는 명령이 전송되기 전에 모델의 스키마와 일치하도록 필터를 캐스팅합니다.

https://mongoosejs.com/docs/api.html#model_Model.find

## Queries

몽구스 모델은 CRUD 작업을 위한 여러 정적 헬퍼함수를 제공합니다.

이러한 각 함수는 몽구스 쿼리 객체를 반환합니다.

https://mongoosejs.com/docs/queries.html#queries

### Query.prototype.sort()

정렬 순서를 설정합니다. 개체가 전달되면 허용되는 값은 asc, desc, 오름차순, 내림차순, 1 및 -1입니다.

https://mongoosejs.com/docs/api.html#query_Query-sort

## Middleware

미들웨어(pre또는 post훅이라고도 불림)는 비동기 함수를 실행하는 동안 제어가 전달되는 함수입니다.

몽구스는 document middleware, model middleware, aggregate middleware, query middleware 4가지 미들웨어가 있습니다.

https://mongoosejs.com/docs/middleware.html#middleware

### model middleware가 지원하는 기능

document middleware함수에서 this는 현재 document를 참조합니다.

https://mongoosejs.com/docs/middleware.html#types-of-middleware

### Pre

```
pre("save", async function ());
```

https://mongoosejs.com/docs/middleware.html#pre

## findOne

해당 조건과 일치하는 document를 찾는다.

\_id로 찾는 경우에는 findById()를 사용할 것을 권장

findById(id)는 거의\* findOne({ \_id: id })과 동일합니다.

https://mongoosejs.com/docs/api.html#model_Model.findOne

## findById

https://mongoosejs.com/docs/api.html#model_Model.findById

## findByIdAndDelete()

document의 \_id 필드로 MongoDB findOneAndDelete() 명령을 실행합니다.

findByIdAndDelete(id)는 findOneAndDelete({ \_id: id })의 줄임말입니다.

https://mongoosejs.com/docs/api.html#model_Model.findByIdAndDelete

# JavaScript

## async function

async function 선언은 AsyncFunction객체를 반환하는 하나의 비동기 함수를 정의합니다. 비동기 함수는 이벤트 루프를 통해 비동기적으로 작동하는 함수로, 암시적으로 Promise를 사용하여 결과를 반환합니다. 그러나 비동기 함수를 사용하는 코드의 구문과 구조는, 표준 동기 함수를 사용하는것과 많이 비슷합니다.

async(비동기) -- await(수행될 때까지 기다려준다)
=> 데이터베이스가 데이터 찾을때까지 기다려준다(다음 것이 먼저 수행되는 것을 막음)
에러는 try-catch문으로 잡는다.

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function

## `String.prototype.startsWith()`

startsWith() 메소드는 어떤 문자열이 특정 문자로 시작하는지 확인하여 결과를 true 혹은 false로 반환합니다.

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith

## `String.prototype.endsWith()`

The endsWith() 메서드를 사용하여 어떤 문자열에서 특정 문자열로 끝나는지를 확인할 수 있으며, 그 결과를 true 혹은 false로 반환한다.

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith

# 상태코드

- 200(OK): 서버가 요청을 제대로 처리했다는 뜻이다. 이는 주로 서버가 요청한 페이지를 제공했다는 의미로 쓰인다.
-
- 400(Bad Request): 서버가 요청의 구문을 인식하지 못할 때 발생한다. 클라이언트 측에서 문제가 있을 때 주로 발생한다.
-
- 404(Not Found): 서버가 요청한 페이지를 찾을 수 없을 때 발생한다. 서버에 존재하지 않는 페이지에 대한 요청이 있을 경우 서버는 이 코드를 제공한다.
- https://ko.wikipedia.org/wiki/HTTP_%EC%83%81%ED%83%9C_%EC%BD%94%EB%93%9C

## res.status(code)

response에 대한 HTTP 상태를 설정합니다. (status를 설정한다.)

https://expressjs.com/ko/api.html#res.status
https://nodejs.org/api/http.html#http_response_statuscode

# Set-Cookie

Set-Cookie HTTP 응답 헤더는 서버에서 사용자 브라우저에 쿠키를 전송하기 위해 사용됩니다.

https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Set-Cookie

## 쿠키에 설정가능한 옵션

### Domain

쿠키가 적용되어야 하는 호스트를 지정.

### Expires

HTTP 타임스템프로 기록된 쿠키의 최대 생존 시간(수명).

### Max-Age

쿠키가 만료될 때 까지의 시간 (밀리세컨드)

### secret

이것은 세션 ID 쿠키에 서명하는 데 사용되는 비밀입니다.

https://www.npmjs.com/package/express-session

## COOKIE_SECRET에 넣을 랜덤 문자열 생성 사이트

https://randomkeygen.com/

# Error 1

`Error: Failed to lookup view "home" in views directory "/home/hhyukk/NodeJs/views"`

views 디렉토리에서 "home"이라는 view를 찾는데 실패했다는 오류 발생

즉, express가 views 디렉토리에서 home이라는 파일을 찾지 못했다는 뜻

기본적으로 express는 cwd(현재 작업 디렉토리) + /views에서 pug 파일을 찾지만 실제로 pug 파일은 cwd/src/views에 있기 때문에 오류가 발생한 것

cwd는 node.js를 실행하는 디렉토리이고 현재 node.js를 실행하는건 package.json이기 때문에 NodeJs/package.json이 cwd가 됨

### 해결방법

1. views 폴더를 src 밖으로 꺼낸다.
2. `app.set('views', process.cwd() + '/src/views');`을 사용해서 express의 default 값을 변경해준다.

# Error 2

`Error: Cannot init client. Please provide correct options`

mongodb에 세션을 저장하기 위해 .env 파일 안의 내용을 사용할 때 오류 발생
