'use client'
import { usePathname, useRouter } from "next/navigation" //크라이언트 컴포넌트에서만 사용가능
//유즈라우터를 사용하는 이유?
//기능이 많음
//router.forward()
//router.back() 
//router.refresh() 등
//router.prefetch(링크) 해당 링크에 필요한 파일을 미리 로드해서 속도가 향상됨


export default function DetailLink(){
    let router = useRouter()
    let a = usePathname() //현재 URL출력
    return(
        <button onClick={()=>{
            router.push('/list') //페이지이동
        }}>버튼</button>
    )
}