import { Header } from "@/components/Header";
import { BookingItem } from "@/components/booking-item";
import { authOptions } from "@/lib/auth";
import { database } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'

export default async function BookingsPage() {

  const session = await getServerSession(authOptions)

  if(!session?.user) {
    return redirect('/')
  }

  const confirmedBookings = await database.booking.findMany({
    where: {
      userId: session.user.id,
      date: {
        gte: new Date()
      }
    },
    include: {
      service: true,
      barbershop: true
    }
  })

  const finishedBookings = await database.booking.findMany({
    where: {
      userId: session.user.id,
      date: {
        lt: new Date()
      }
    },
    include: {
      service: true,
      barbershop: true
    }
  })

  // const confirmedBookings = bookings.filter((booking) => isFuture(booking.date))
  // const finishedBookings = bookings.filter((booking) => isPast(booking.date))

  return (
    <>
      <Header/>
      
      <div className="px-5 pt-6 pb-4" >
        <h1 className="text-xl font-bold" >Agendamentos</h1>
      </div>

      <h2 className="px-5 mt-6 text-xs uppercase font-bold text-gray-400">Confirmados</h2>
      
      <div  className="flex flex-col px-5 gap-3 mt-3" >
        {confirmedBookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}

        {confirmedBookings.length < 1 && (
          <p className="text-sm text-gray3" >Você não tem nenhum agendamento! :/</p>
        )}
      </div>

      <h2 className="px-5 mt-6 text-xs uppercase font-bold text-gray-400">Finalizados</h2>
      
      <div  className="flex flex-col px-5 gap-3 mt-3" >
        {finishedBookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} variant="finished"/>
        ))}
      </div>

    </>
  )
}