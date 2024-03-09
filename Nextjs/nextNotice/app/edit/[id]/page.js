//글 수정 페이지 프로젝트/edit/[id]/page.js
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";


export default async function Edit(props){

    const client = await connectDB;
    const db = client.db("forum2")
    let result = await db.collection('post2').findOne({_id: new ObjectId(props.params.id)}) //유저가 클릭한 게시글 id를 찾아라

    return (
        <div className="p-20">
            <h4>글 수정페이지</h4>
            <form action="/api/post/edit" method="POST">
                <input name="title" defaultValue={result.title}/>
                <input name="content" defaultValue={result.content}/>
                <input style={{display : 'none'}}name="_id" defaultValue={result._id.toString()}/> {/*게시글 아이디는 서버가 모르기 때문에 같이 보내줘야함*/}
                <button type="submit">수정 요청</button>
            </form>
        </div>
    )
}