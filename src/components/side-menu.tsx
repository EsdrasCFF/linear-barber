"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { SheetHeader } from "./ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, UserCircleIcon } from "lucide-react"
import Link from "next/link"

export function SideMenu() {

  const {data} = useSession()
  
  function handleLogoutClick() {
    signOut()
  }

  function handleLoginClick() {
    signIn('google')
  }

  return (
    <>
      <SheetHeader className="text-left border-b border-solid border-secondary p-5" >Menu</SheetHeader>    
      
      {data?.user ? (
        <div className="flex justify-between items-center py-6 px-5" >
          <div className="flex items-center gap-2 " >
            <Avatar>
              <AvatarImage src={data.user.image!} />
              <AvatarFallback>{data.user.name?.slice(0,2)}</AvatarFallback>
            </Avatar>

            <h2 className="text-base font-bold" >{data.user.name}</h2>
          </div>

          <Button variant="secondary" size="icon" onClick={handleLogoutClick} ><LogOutIcon/></Button>
        </div>

      ) : (
        <div className="flex flex-col py-6 px-5 gap-3" >
          <div className="flex gap-2 items-center" >
            <UserCircleIcon size={32}/>
            <h2>Olá, Faça seu Login!</h2>
          </div>

          <Button variant="secondary" size="icon" className="w-full" onClick={handleLoginClick} >
            <LogInIcon size={16} className="mr-2"/>
            Fazer Login
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-3 px-5" >
        <Button variant="outline" className="justify-start" asChild>
          <Link href="/" >
            <HomeIcon size={16} className="mr-2"/> Início
          </Link>
        </Button>

        {data?.user && (
          <Button variant="outline" className="justify-start" asChild>
            <Link href="">
              <CalendarIcon size={16} className="mr-2"/> Agendamentos
            </Link>
          </Button>
        )}
      </div>
    </>
  )
}