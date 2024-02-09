import { Header } from '@/components/Header'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Search } from './components/Search'
import { BookingItem } from '@/components/booking-item'
import { database } from '@/lib/prisma'
import { BarbershopItem } from './components/BarbershopItem'

export default async function Home() {

  const barbershops = await database.barbershop.findMany({})

  return (
    <div>
      <Header/>

      <div className='px-5 pt-5' >
        <h2 className='text-xl font-bold' >Olá, Esdras</h2>
        
        <p className='capitalize' >
          {format(new Date(), "EEEE',' dd 'de' MMMM", {locale: ptBR})}
        </p>
      </div>

      <div className='px-5 mt-6' >
        <Search/>
      </div>

      <div className='mt-6 px-5'>
        <h2 className='font-bold text-gray3 mt-9 mb-3 uppercase'>Agendamentos</h2>

        <BookingItem/>
      </div>

      <div className='mt-6'>
        <h2 className='px-5 font-bold text-gray3 mt-9 mb-3 uppercase'>recomendados</h2>
        
        <div className='flex px-4 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden' >
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}
