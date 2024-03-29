import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import LoginBtn from "./LoginBtn";
import { LogOutBtn } from "./LoginBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  let userInfo = await getServerSession(authOptions) //로그인된 유저정보출력 함수
  //클라이언트 페이지에서도 useSession을 통해서 정보를 가져올 수 있지만
  //html을 다 보여주고 나서 한박자 늦게 실행될 수 있기 때문에
  //서버 컴포넌트에서 정보를 뽑아서 클라이언트페이지로 전송하는게 나음

  console.log(userInfo);
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="navbar">
          <Link href="/" className="logo">Appleforum</Link>
          <Link href="/list">List</Link>
          {
            userInfo //유저정보가 트루라면
              ? <span>{session.user.name} <LogOutBtn /> </span> //로그아웃 버튼
              : <LoginBtn></LoginBtn> //펄스면 로그인 버튼 출력
          }
        </div>
        {children}
      </body>
    </html>
  );
}
