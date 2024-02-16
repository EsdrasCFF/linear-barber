"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Barbershop } from "@prisma/client"
import { StarIcon } from "lucide-react"
import Image from 'next/image'
import { useRouter } from "next/navigation"
interface BarbershopProps {
  barbershop: Barbershop
}


export function BarbershopItem({barbershop}: BarbershopProps) {

  const router = useRouter()

  function handleBookingClick(id: string) {

    router.push(`/barbershops/${id}`)
  }

  return (
    <Card className="w-full rounded-2xl">
      <CardContent className="p-1 relative">
        <Badge className="absolute  w-54 h-25 top-3 left-3"> <StarIcon size={12}/> <span className="text-xs" >5,0</span> </Badge>

        <Image 
          src={barbershop.imageUrl} 
          alt={barbershop.name} 
          height={0} 
          width={0} 
          sizes="100vw" 
          className="h-[159px] w-full rounded-2xl object-cover"
        />

        <div className="p-2">
          <h2 className="mt-1 text-base font-bold overflow-hidden text-ellipsis text-nowrap" >{barbershop.name}</h2>
          <p className="mt-2 text-xs text-gray-400 overflow-hidden text-ellipsis text-nowrap" >{barbershop.address}</p>
          <Button className="w-full mt-3" variant="secondary" onClick={() => handleBookingClick(barbershop.id)} >Reservar</Button>
        </div>


      </CardContent>
    </Card>
  )
}