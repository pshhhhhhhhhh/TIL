//삭제 기능을 위한 클라이언트 컴포넌트로 리스트 페이지 나누기
//app/list/Listitem.js 추가

'use client' //이렇게 쓰면 클라이언트 컴포넌트로 바뀜
import Link from "next/link"

export default function ListItem(props) { //부모컴포넌트(서버컴포넌트)에서 db정보 받아온 props

    // useEffect(()=>{ //클라이언트 컴포넌트에서 db가져오기(검색 노출이 안됨, 추천안함)
    //                 //html부터 유저에게 보여주고 데이터를 가져오기 때문
    //                 //검색엔진 봇들이 페이지에 접속하면 텅 빈 html만 나오기 때문에 노출이 안됨
    //     //아무튼 useEffect를 사용하면 쓸 수 있긴 함       
    // },[])

    return (
        <div className="list-bg">
            {
                props.result.map((a, i) => { //맵을 사용해서 몽고db 뽑아내기
                    return (
                        <div className="list-item" key={i}>

                            <Link href={'/detail/' + props.result[i]._id}> {/*디테일 뒤에 게시글 id를 박아서 링크이동하기*/}
                                <h4>{props.result[i].title}</h4>
                            </Link>
                            <Link href={'/edit/' + props.result[i]._id}>글 수정하기</Link> {/**글 id를 따서 수정페이지로 이동 */}
                            <span onClick={() => {
                                fetch('/api/post/delete', { //fetch를 사용한 삭제 기능 요청하기
                                    method: 'DELETE', //여기에 메서드를 적어서 지정가능
                                    body: props.result[i]._id //게시글 아이디 삭제 서버로 보내기
                                    //body: JSON.stringify([1,2,3]) //바디를 통해서 array나 JSON도 전송 가능
                                })
                                    .then((r) => { //fetch에서의 에러는 2가지 상황임 서버에러, 인터넷에러를 처리하기 위한 로직
                                        if (r.status == 200) {
                                            return r.json()
                                        } else {
                                            //서버가 에러코드전송시 실행할코드
                                        }
                                    })
                                    .then((result) => {
                                        //성공시 실행할코드
                                    }).catch((error) => {
                                        //인터넷문제 등으로 실패시 실행할코드
                                        console.log(error)
                                    })
                            }}
                            >글 삭제</span>
                            {/* <DetailLink></DetailLink> */}
                            <p>{props.result[i].content}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}