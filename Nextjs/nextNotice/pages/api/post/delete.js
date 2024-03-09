//글 삭제 서버 파일 pages/api/post/delete.js
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(요청, 응답){

    if(요청.method == 'DELETE'){

        let userInfo = await getServerSession(요청,응답,authOptions);


        const client = await connectDB;
        const db = client.db("forum2")
        let find = await db.collection('post2').findOne({ _id : new ObjectId(요청.body) }) //해당하는 document 찾기
        if(find.author == userInfo.user.email){ //해당하는 유저가 맞다면
        let result = await db.collection('post2').deleteOne({_id : new ObjectId(요청.body)}) //db에 document 삭제
    
        console.log('삭제결과:' + result)
        응답.status(200).json('삭제 완료')
        }
        else{
            return 응답.status(500).json('유저정보 불일치')
        }
    }

}