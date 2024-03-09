//서버 파일 만들기 프로젝트 안에 pages폴더 만들고 api폴더 만들고 그 안에 test.js
//NextJs는 자동 라우팅기능이 있기 때문에 클라이언트가 /api/파일이름에 겟 포스트 등의 요청 하면
//파일 안의 코드를 자동으로 실행해줌

import { connectDB } from "@/util/database";

export default async function handler(요청, 응답){
    const db = (await connectDB).db("forum")
    let result = await db.collection('post').find().toArray()
    응답.status(200).json(result)
  }