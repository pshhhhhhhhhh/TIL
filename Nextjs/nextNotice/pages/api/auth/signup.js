//회원가입 api

import { connectDB } from "@/util/database";
import bcrypt from 'bcrypt';


export default async function handler(요청,응답){
    if(요청.method == 'POST'){
        let hash = await bcrypt.hash(요청.body.password, 10)//패스워드 해시화
        요청.body.password = hash;
        let db = (await connectDB).db('forum2');
        await db.collection('user_cred').insertOne(요청.body); //해당하는 유저 정보 저장하기
        응답.satust(200).json('가입완료');
    }
}