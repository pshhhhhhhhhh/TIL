//글작성 페이지 app/write/page.js 만들기 
//post 요청용
//일반적으로 form 사용

export default function Write(){
    return(
        <div className="p-20">
            <h4>글 작성</h4>
            <form action="/api/post/new" method="POST">
                <input name="title" placeholder="글 제목"/>
                <input name="content" placeholder="글 내용"/>
                <button type="submit">post요청</button>
            </form>
        </div>
    )
}