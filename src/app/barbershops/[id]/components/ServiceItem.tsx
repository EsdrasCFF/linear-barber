"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { priceFormatter } from "@/lib/formatter"
import { Service } from "@prisma/client"
import { signIn } from "next-auth/react"
import Image from "next/image"

interface ServiceItemProps {
  service: Service
  isAthenticated: boolean
}

export function ServiceItem({service, isAthenticated}: ServiceItemProps) {
  
  function handleBookingClick() {
    if(!isAthenticated) {
      return signIn('google')
    }

    //TODO redirecionar para pagina de Reservas
  }
  
  return (
    <Card className="p-0" >
      <CardContent className="p-3">
        <div className="flex gap-3">
          <div className="min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px] relative" >
            <Image src={service.imageUrl} alt={service.name} fill style={{objectFit: 'contain'}} className="rounded-lg" />
          </div>

          <div className="flex flex-col w-full justify-center" >
            <h2 className="text-sm font-bold mt-1" >{service.name}</h2>
            <p className="text-sm text-gray-400" >{service.description}</p>
            <div className="flex justify-between items-center" >
              <span className="text-primaryPurple font-bold text-sm" > {priceFormatter.format(Number(service.price))} </span>
              <Button variant='secondary' onClick={handleBookingClick}>Reservar</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}