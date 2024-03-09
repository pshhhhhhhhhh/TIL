//pages/api/edit.js 글 수정 서버 파일
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(요청, 응답) {
    if (요청.method == 'POST') {

        console.log(요청.body)

        let editBody = { //리퀘스트에는 id도 있기 때문에 글내용만 빼주기
            title: 요청.body.title,
            content: 요청.body.content
        }
        const client = await connectDB;
        const db = client.db("forum2")
        let result = await db.collection('post2').updateOne( //글 수정 로직은 updateOne
            { _id: new ObjectId(요청.body._id) }, //게시글 서버가 db로 보내기
            { $set: editBody }
        )
        응답.redirect(302, '/list')
    }
}