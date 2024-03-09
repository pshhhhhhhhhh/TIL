//dynamic route -> 폴더안에 폴더를 만드는데 []를 넣어서 만듬 detail\[작명] 
//즉 []부분에 어떤것을 입력하든 detall안에 있는 pagejs를 보여줌
//props를 사용하여 콘솔에 찍어보면 []안에 있는 값이 나옴 이것을 활용 ex) props.params.id
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";


export default async function Detail(props) {

    const client = await connectDB; //DB입출력 코드는 서버컴포넌트에만 작성할것, 클라이언트 컴포넌트는 유저에게 전송되기 때문
    const db = client.db("forum2")
    let result = await db.collection('post2').findOne({_id: new ObjectId(props.params.id)}) //해당하는 것 하나만 찾기, 프롭스사용하기
    
    console.log(result);
    
    return (
        <div>
            <h4>상세 페이지</h4>
            <h4>{result.title}</h4>
            <p>{result.content}</p>
        </div>
    )
}