import { connectDB } from "@/util/database";
import { MongoClient } from "mongodb";


export default async function Home() {

  const client = await connectDB; //DB입출력 코드는 서버컴포넌트에만 작성할것, 클라이언트 컴포넌트는 유저에게 전송되기 때문
  const db = client.db("forum2")
  let result = await db.collection('post2').find().toArray() //특정컬렉션에 있는 모든 데이터를 뽑아라
  console.log(result);
  
  return (
    <div>
      hi
    </div>
  );
}
