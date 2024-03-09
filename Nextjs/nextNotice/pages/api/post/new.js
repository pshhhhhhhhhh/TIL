//pages/api/post/new.js 글 발행 서버파일
//서버기능은 /api폴더에 넣자
//프론트엔드에서도 공백을 막을 순 있지만 위조가 가능하기 때문에 서버에서도 막아야함

import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(요청, 응답) {
    let userInfo = await getServerSession(요청,응답,authOptions) //접속중인 유저의 정보 출력하기
    if(userInfo){ //유저 정보 글 작성시 같이 넣기
        요청.body.author = userInfo.user.email;
    }
    if (요청.method == 'POST') {
        if (요청.body.title == '' && 요청.body.content == '') {
            return 응답.status(500).json('공백쓰지마시오') //공백 예외처리
        }
        try{ //db에러 예외처리를 위해서 트라이캐치로 감싸기
            const client = await connectDB;
            const db = client.db("forum2")
            let result = await db.collection('post2').insertOne(요청.body) //db에 document 만들어서 넣기
            console.log(요청.body)
            return 응답.status(200).json('저장 완료') //응답 안하면 클라이언트가 무한대기가 됨
            //return 응답.redirect(302,'/list') //요청 완료하고 해당 경로로 페이지 이동(리다이렉트)
        } catch(error){
            console.log('db에러')
        }
    }
}