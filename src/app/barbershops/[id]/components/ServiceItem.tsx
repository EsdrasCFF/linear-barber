"use client"

import { saveBooking } from "@/actions/save-booking"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { priceFormatter } from "@/utils/formatter"
import { generateDayTimeList } from "@/utils/hours"
import { Service } from "@prisma/client"
import { time } from "console"
import { format, setHours, setMinutes } from "date-fns"
import { ptBR } from "date-fns/locale"
import { signIn, useSession } from "next-auth/react"
import Image from "next/image"
import { useMemo, useState } from "react"
import { Loader2 } from "lucide-react"

interface ServiceItemProps {
  service: Service;
  isAthenticated: boolean;
  barbershopName: string;
  barbershopId: string
}

export function ServiceItem({service, isAthenticated, barbershopName, barbershopId}: ServiceItemProps) {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [hour, setHour] = useState<String | undefined>()

  const [submitIsLoading, setSubmitIsLoading] = useState(false)

  const { data } = useSession()
  const userId =  data && data.user.id

  const timeList = useMemo(() => {
    return date ? generateDayTimeList(date):[]
  }, [date])

  function handleHourClick(time: string) {
    setHour(time)
  }

  function handleBookingClick() {
    if(!isAthenticated) {
      return signIn('google')
    }

    //TODO redirecionar para pagina de Reservas
  }
  
  function handleDateClick(date: Date | undefined) {
    setDate(date)
    setHour(undefined)
  }

  async function handleBookingSubmit() {
    setSubmitIsLoading(true)

    try {
      if(!hour || !date || !userId ) {
        return null;
      }
      
      const hourWithMinutes = hour.split(':') // = "09:00" 
      
      const dateHour =  Number(hourWithMinutes[0])
      const dateMinutes = Number(hourWithMinutes[1])
      
      const newDate = setMinutes(setHours(date, dateHour), dateMinutes) 

      const booked = await saveBooking({
        userId,
        barbershopId,
        date: newDate,
        serviceId: service.id
      })

    } catch(e) {
      console.log(e)
    } finally {
      setSubmitIsLoading(false)
    }
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
              
              <Sheet>
                <SheetTrigger asChild>
                 <Button variant='secondary' onClick={handleBookingClick}>Reservar</Button>
                </SheetTrigger>

                <SheetContent className="p-0">
                  <SheetHeader className="px-5 py-6 border-b border-secondary border-solid"> 
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  <Calendar
                    locale={ptBR}
                    mode="single"
                    selected={date}
                    onSelect={handleDateClick}
                    fromDate={new Date()}
                    className="mt-6"
                    styles={{
                      head_cell: {
                        width: '100%',
                        textTransform: 'capitalize'
                      },
                      cell: {
                        width: '100%'
                      },
                      button: {
                        width: '100%'
                      },
                      nav_button_previous: {
                        width: '32px', height: '32px'
                      },
                      nav_button_next: {
                        width: '32px', height: '32px'
                      },
                      caption: {
                        textTransform: 'capitalize'
                      }
                    }}
                  />


                  {date && (
                    <div className="flex py-6 border-y gap-2 text-sm overflow-x-auto [&::-webkit-scrollbar]:hidden" >
                      {timeList.map((time) => (
                        <Button 
                          key={time} 
                          variant={hour == time ? 'default' : 'outline'} 
                          className="rounded-full" 
                          onClick={() => handleHourClick(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="py-6 px-5">
                    <Card>
                      <CardContent className="p-3 flex flex-col gap-3">
                        <div className="flex justify-between" >
                          <h2 className="text-base font-bold" >{service.name}</h2>
                          <p>{priceFormatter.format(Number(service.price))}</p>
                        </div>

                        {date && (
                          <div className="flex justify-between text-sm text-gray-400" >
                            <p>Data</p>
                            <p>{format(date, "dd 'de' MMMM", {locale: ptBR})}</p>
                          </div>
                        )}
                        
                        {hour && (
                          <div className="flex justify-between text-sm text-gray-400" >
                            <p>Horário</p>
                            <p>{hour}</p>
                          </div>
                        )}

                        <div className="flex justify-between text-sm" >
                          <p className="text-gray-400" >Barbearia</p>
                          <p className="text-white" >{barbershopName}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <SheetFooter className="px-5" >
                    <Button disabled={(!date || !hour) || submitIsLoading} onClick={handleBookingSubmit}> 
                      {submitIsLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" /> }
                      Confirmar Reserva
                    </Button>
                  </SheetFooter>
                </SheetContent>

              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}