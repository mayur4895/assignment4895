'use client'
import React from 'react'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
  } from "@/components/ui/menubar"
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';
import { useModal } from '@/hooks/use-modal-store';
  
const Navbar = () => {
  const {onOpen,type} = useModal();
  return (
    <div>
      <Menubar className='px-10  h-12 justify-between flex items-center'>
  <MenubarMenu>
    <MenubarTrigger>MSS</MenubarTrigger> 
  </MenubarMenu>
  <div className=' flex items-center space-x-4'>
  <MenubarMenu>
    <MenubarTrigger className=' cursor-pointer hover:text-red-400'>my posts</MenubarTrigger> 
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger className=' cursor-pointer hover:text-red-400'>my favourates</MenubarTrigger> 
  </MenubarMenu> 
  <MenubarMenu>
    <MenubarTrigger className=' cursor-pointer hover:text-red-400' onClick={()=>{onOpen("createPost")}}>Create post</MenubarTrigger> 
  </MenubarMenu> 
  <MenubarMenu> 
   <Button
                          type="submit" 
                          className=" font-normal"
                          onClick={() => {
                            signOut();
                          }}>
                          Logout
                        </Button> 
   
  </MenubarMenu>
 
  </div>

</Menubar>

    </div>
  )
}

export default Navbar
