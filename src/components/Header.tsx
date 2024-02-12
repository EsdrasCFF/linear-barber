"use client"

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
  
  return (
    <Card>
      <CardContent className="p-5 flex justify-between items-center" >
        <Image src="/logo.png" width={105} height={20} alt="logo"/>
        <Button variant="outline" size="icon" className="w-8 h-8"> <MenuIcon size={18} /> </Button>

      </CardContent>
    </Card>
  )
}