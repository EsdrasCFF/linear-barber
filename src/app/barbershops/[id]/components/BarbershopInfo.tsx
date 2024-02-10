"use client"

import { Button } from "@/components/ui/button";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from 'next/image'
import { useRouter } from "next/navigation";

interface BarbershopPros {
  barbershop: Barbershop
}

export function BarbershopInfo({barbershop}: BarbershopPros) {
  const router = useRouter()

  function handleBackClick() {

    router.back()
  }
  
  return (
    <div>
      <div className="relative h-[250px] w-full" >
        <Button className="absolute z-50 top-4 left-4" variant='outline' size='icon' onClick={handleBackClick} > 
          <ChevronLeftIcon/> 
        </Button>
        
        <Button className="absolute z-50 top-4 right-4" variant='outline' size='icon' > 
          <MenuIcon/> 
        </Button>
        
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          style={{objectFit: 'cover'}}
          className="opacity-75"
        />
      </div>

      <h2 className="text-xl font-bold px-5 py-3" >{barbershop.name}</h2>
      
      <div className="flex flex-col px-5 gap-2" >
        <div className="flex items-center text-sm gap-2">
          <MapPinIcon size={16} className="text-primaryPurple"/> 
          <p>{barbershop.address}</p>
        </div>
        
        <div className="flex items-center text-sm gap-2">
          <StarIcon size={16} className="text-primaryPurple"/> 
          <p>5,0 (800 avaliações)</p>
        </div>
      </div>
    </div>
  )
}