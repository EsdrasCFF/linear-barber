import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ptBR } from "date-fns/locale";

export function BookingItem() {
  return (
    <Card>
      <CardContent className="p-5 flex justify-between items-center py-0" >
        <div className="flex flex-col gap-2 py-5">
          <Badge className="bg-darkPurple text-primaryPurple hover:bg-darkPurple w-fit" >Confirmado</Badge>
          <h2 className="font-bold text-base">Corte de Cabelo</h2>

          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6" >
              <AvatarImage src="https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png" />
              <AvatarFallback> AC </AvatarFallback>
            </Avatar>
            
            <span className="text-sm">Vintage Barber</span>
          </div>
        
        </div>

        <div className="flex flex-col items-center justify-center border-l border-solid pl-5">
          <p className="text-sm capitalize">{format(new Date(), 'MMMM', {locale: ptBR})}</p>
          <p className="text-2xl">{format(new Date(), 'dd', {locale: ptBR})}</p>
          <p className="text-sm" >{format(new Date(), "hh':'mm", {locale: ptBR})}</p>
        </div>
      </CardContent>
    </Card>
  )
}