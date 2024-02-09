"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export function Search(){
  return(
    <div className="flex items-center gap-2">
      <Input placeholder="Busque por uma barbearia"/>

      <Button size="icon" variant="default" > <SearchIcon size={18} /> </Button>
    </div>
  )
}