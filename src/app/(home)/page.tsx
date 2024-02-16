import { Header } from '@/components/Header'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Search } from './components/Search'
import { BookingItem } from '@/components/booking-item'
import { database } from '@/lib/prisma'
import { BarbershopItem } from './components/BarbershopItem'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function Home() {
  const session = await getServerSession(authOptions)

  const [barbershops, recommendedBarbershops, bookings] = await Promise.all([
    database.barbershop.findMany({}),
    database.barbershop.findMany({
      orderBy: {
        id: 'asc'
      }
    }),
    session?.user ? await database.booking.findMany({
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
    }) : []
  ])


  return (
    <div>
      <Header/>

      <div className='px-5 pt-5' >
        <h2 className='text-xl font-bold' >
          {session?.user ? `Olá, ${session.user.name.split(' ')[0]}` : "Olá, Faça login e agende seu atendimento!"}
        </h2>
        
        <p className='capitalize' >
          {format(new Date(), "EEEE',' dd 'de' MMMM", {locale: ptBR})}
        </p>
      </div>

      <div className='px-5 mt-6' >
        <Search/>
      </div>

      <div className='mt-6 px-5'>
        <h2 className='font-bold text-gray3 mt-9 mb-3 uppercase'>Agendamentos</h2>

        <div className='flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden' >
          {bookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>

      <div className='mt-6'>
        <h2 className='px-5 font-bold text-gray3 mt-9 mb-3 uppercase'>recomendados</h2>
        
        <div className='flex px-4 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden' >
          {recommendedBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <div className='mt-6'>
        <h2 className='px-5 font-bold text-gray3 mt-9 mb-3 uppercase'>POPULARES</h2>
        
        <div className='flex px-4 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden' >
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}
