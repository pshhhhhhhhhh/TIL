//layout.js는 서버컴포넌트이기 때문에 js문법을 사용할수 없음
//그래서 만든 로그인버튼 컴포넌트 페이지

'use client'

import {signIn} from 'next-auth/react'; //로그인 라이브러리 불러오기

export default function LoginBtn() {
    return (
        <button onClick={() => {signIn()}}>로그인</button> /*실행되면 깃허브로그인페이지로 자동이동하는 함수 */ 
    )
}

export function LogOutBtn(){
    return (
      <button onClick={()=>{ signOut() }}>로그아웃</button>
    )
  } 