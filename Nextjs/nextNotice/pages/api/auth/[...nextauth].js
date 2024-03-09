//깃허브 oAuth연동하기 -> NEXTjs에서 자동으로 제공하는 소셜로그인 라이브러리임
//npm install next-auth -> JWT방식 
//npm install @auth/mongodb-adapter mongodb -> 세션 방식(DB와 연동) ,DB별로 어답터가 있으니 찾아서 적용

import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
//import { connectDB } from "@/util/database";
//import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { CredentialsProvider } from "next-auth/providers";
import bcrypt from 'bcrypt';

export const authOptions = {
  providers: [ //로그인할 방식 넣기
    GithubProvider({ //깃허브 로그인
      clientId: 'Github에서 발급받은ID',
      clientSecret: 'Github에서 발급받은Secret',
    }),
    CredentialsProvider({ //자체 로그인 회원가입
      //1. 로그인페이지 폼 자동생성해주는 코드 
      name: "credentials",
        credentials: {
          email: { label: "email", type: "text" }, //로그인페이지에 들어갈 인풋들
          password: { label: "password", type: "password" },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고 
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials) {
        let db = (await connectDB).db('forum2');
        let user = await db.collection('user_cred').findOne({email : credentials.email})
        if (!user) {
          console.log('해당 이메일은 없음');
          return null
        }
        const pwcheck = await bcrypt.compare(credentials.password, user.password);
        if (!pwcheck) {
          console.log('비번틀림');
          return null
        }
        return user
      }
    })
  ],
  //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
  session: {
    strategy: 'jwt', //세션으로 할지 jwt로할지 고르는데 jwt추천
    maxAge: 30 * 24 * 60 * 60 //30일
  },


  callbacks: {
    //4. jwt 만들 때 실행되는 코드 
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name
        token.user.email = user.email
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }) => {
      session.user = token.user;  
      return session;
    },
  },

  secret : 'jwt생성시쓰는암호' //이부분은 .env파일로 사용하는걸 추천
  //adapter : MongoDBAdapter(connectDB) //DBadapter일경우에만 추가하는 셋팅
};
export default NextAuth(authOptions); 