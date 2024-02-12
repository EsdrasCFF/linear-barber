"use client"

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon, UserCircle2Icon, UserCircleIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

export function Header() {
  const {data, status} = useSession()

  function handleLogoutClick() {
    signOut()
  }

  function handleLoginClick() {
    signIn('google')
  }

  return (
    <Card>
      <CardContent className="p-5 flex justify-between items-center" >
        <Image src="/logo.png" width={105} height={20} alt="logo"/>
        
        <Sheet>
          <SheetTrigger asChild >
            <Button variant="outline" size="icon" className="w-8 h-8"> <MenuIcon size={18} /> </Button>
          </SheetTrigger>

          <SheetContent className="p-0">
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
          </SheetContent>
        
        </Sheet>
        

      </CardContent>
    </Card>
  )
}