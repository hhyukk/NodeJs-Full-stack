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

@babel/preset-env

@babel/preset-env는 환경에 필요한 구문 변환을 세부적으로 관리할 필요 없이 최신 JavaScript를 사용할 수 있게 해주는 스마트한 preset

https://babeljs.io/docs/en/babel-preset-env

# Nodemon
