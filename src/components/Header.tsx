"use client"

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { MenuIcon} from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { SideMenu } from "./side-menu";
import Link from "next/link";

export function Header() {

  return (
    <Card>
      <CardContent className="p-5 flex justify-between items-center" >

        <Link href='/' >
          <Image src="/logo.png" width={105} height={20} alt="logo"/>
        </Link>
        
        <Sheet>
          <SheetTrigger asChild >
            <Button variant="outline" size="icon" className="w-8 h-8"> <MenuIcon size={18} /> </Button>
          </SheetTrigger>

          <SheetContent className="p-0">
            <SideMenu/>
          </SheetContent>
        </Sheet>
        

      </CardContent>
    </Card>
  )
}