import { connectDB } from "@/util/database";
import Link from "next/link";
import DetailLink from "./DetailLink";
import ListItem from "./Listitem";
 

//npm run build시 dynamic랜더링으로 되어야할 페이지가 static으로 선언되었기 때문에
//업데이트가 바로 적용이 안됨, 이 문제를 해결하기 위해서 list페이지를 dynamic렌더링으로 바꿔줘야함 
//npm run build할때 페이지가 static인지 dynamic인지 반드시 확인하고 그에 맞는 렌더링 방식을 선택해줘야함
//O표시는 static이고 ㅅ모양의 람다는 dynamic임
//static렌더링은 딱히 업데이트했을때 바로 적용을 안시켜도 되는 페이지에 사용하고
//dynamic렌더링은 게시판페이지 같은 즉시 변동사항을 적용해야하는 페이지에 사용함

export const dynamic = 'force-dynmic' //다이나믹렌더링으로 적용
//export const dynamic = 'force-static' //스태틱렌더링으로 적용


export default async function List() {

    const client = await connectDB; //DB입출력 코드는 서버컴포넌트에만 작성할것, 클라이언트 컴포넌트는 유저에게 전송되기 때문
    const db = client.db("forum2")
    let result = await db.collection('post2').find().toArray() //특정컬렉션에 있는 모든 데이터를 뽑아라

    console.log(result);
    return (
        <div className="list-bg">
            <ListItem result={result}/> {/* 클라이언트 컴포넌트로 db정보 프롭스로 보내기 */}
        </div>
    )
}