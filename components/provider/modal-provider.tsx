'use client'

import { useEffect, useState } from "react"
import CreatePostModal from "../modal/create-post-modal"
 
 

const ModalProvider = ()=>{

const [isMounted,setisMounted] = useState(false)


useEffect(()=>{
setisMounted(true);
},[setisMounted])

if(!isMounted){
    return null
}

    return(<>
      <CreatePostModal/>
    </>)
}

export default ModalProvider;