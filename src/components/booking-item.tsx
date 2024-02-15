"use client"

import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ptBR } from "date-fns/locale";
import { Prisma } from "@prisma/client";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import { priceFormatter } from "@/utils/formatter";
import { Button } from "./ui/button";
import { cancelBooking } from "@/actions/cancel-booking";
import { toast } from "./ui/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true,
      barbershop: true
    }
  }>;
  variant?: 'finished';
}

export function BookingItem({booking, variant}: BookingItemProps) {

  const [deleteIsLoaging, setDeleteIsLoaging] = useState(false)
  
  async function handleCancelCLick() {
    setDeleteIsLoaging(true)
    try {
      await cancelBooking(booking.id)

      toast({title: 'Reserva cancelada com sucesso!'})
    } catch (e) {
      console.log(e)
    } finally {
      setDeleteIsLoaging(false)
    }
  }


  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="min-w-full" >
          <CardContent className="p-5 flex justify-between items-center py-0 " >
            <div className="flex flex-col gap-2 py-5 flex-[3]">
              <Badge className={
                  `bg-darkPurple text-primaryPurple hover:bg-darkPurple w-fit
                  ${variant && 'bg-gray1 text-gray3'}
              `}>
                {variant ? 'Finalizado' : 'Confirmado'}
              </Badge>
              
              <h2 className="font-bold text-base">{booking.service.name}</h2>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6" >
                  <AvatarImage src={booking.barbershop.imageUrl} />
                  <AvatarFallback> {booking.barbershop.name.slice(0,2)} </AvatarFallback>
                </Avatar>
                
                <span className="text-sm">{booking.barbershop.name}</span>
              </div>
            
            </div>

            <div className="flex flex-col items-center justify-center border-l border-solid pl-5 w-24">
              <p className="text-sm capitalize">{format(booking.date, 'MMMM', {locale: ptBR})}</p>
              <p className="text-2xl">{format(booking.date, 'dd', {locale: ptBR})}</p>
              <p className="text-sm" >{format(booking.date, "HH':'mm", {locale: ptBR})}</p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      
      <SheetContent className="px-0" >
        <SheetHeader className="border-b border-solid pb-6"> 
          Informações da Reserva 
        </SheetHeader>

        <div className="relative h-[180px] w-full mt-6" >
          <Image 
            src="/barbershop-map.png"
            alt={booking.barbershop.address}
            fill
            style={{objectFit: 'contain'}}
          />

          <Card className="absolute max-w-[80%] bottom-4 left-0 mx-10 p-0" >
            <CardContent className="px-5 py-3 gap-2 flex items-center " >
              <Avatar>
                <AvatarImage src={booking.barbershop.imageUrl} />
              </Avatar>

              <div>
                <h2 className="text-base font-bold" >{booking.barbershop.name}</h2>
                <p className="text-xs text-gray3 overflow-hidden text-nowrap text-ellipsis" >{booking.barbershop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Badge className='bg-darkPurple text-primaryPurple hover:bg-darkPurple w-fit mx-5 mt-6'>
          Confirmado
        </Badge>
        
        <div className="pt-3 px-5" >
          <Card>
            <CardContent className="p-3 flex flex-col gap-3">
              <div className="flex justify-between" >
                <h2 className="text-base font-bold" >{booking.service.name}</h2>
                <p>{priceFormatter.format(Number(booking.service.price))}</p>
              </div>

              
              <div className="flex justify-between text-sm text-gray-400" >
                <p>Data</p>
                <p>{format(booking.date, "dd 'de' MMMM", {locale: ptBR})}</p>
              </div>
              
              
              
              <div className="flex justify-between text-sm text-gray-400" >
                <p>Horário</p>
                <p>{format(booking.date, "HH:mm", {locale: ptBR})}</p>
              </div>
              

              <div className="flex justify-between text-sm" >
                <p className="text-gray-400" >Barbearia</p>
                <p className="text-white" >{booking.barbershop.name}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <SheetFooter className="flex flex-row w-full mt-6 px-5 gap-3" >
          <SheetClose  asChild>
            <Button variant='outline' className="w-full" >Voltar</Button>
          </SheetClose>
          
          <Button variant='destructive' disabled={!!variant || deleteIsLoaging} className="w-full" onClick={handleCancelCLick} >
            {deleteIsLoaging && <Loader2 className="mr-2 h-4 w-4 animate-spin" /> }
            Cancelar
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}