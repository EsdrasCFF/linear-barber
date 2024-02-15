import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ptBR } from "date-fns/locale";
import { Prisma } from "@prisma/client";

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
  return (
    <Card>
      <CardContent className="p-5 flex justify-between items-center py-0" >
        <div className="flex flex-col gap-2 py-5">
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

        <div className="flex flex-col items-center justify-center border-l border-solid pl-5 w-28">
          <p className="text-sm capitalize">{format(booking.date, 'MMMM', {locale: ptBR})}</p>
          <p className="text-2xl">{format(booking.date, 'dd', {locale: ptBR})}</p>
          <p className="text-sm" >{format(booking.date, "hh':'mm", {locale: ptBR})}</p>
        </div>
      </CardContent>
    </Card>
  )
}