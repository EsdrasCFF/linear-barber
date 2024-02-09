import { Header } from '@/components/Header'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Search } from './components/Search'
import { BookingItem } from '@/components/booking-item'

export default function Home() {
  return (
    <div>
      <Header/>

      <div className='px-5 pt-5' >
        <h2 className='text-xl font-bold' >Olá, Esdras</h2>
        
        <p className='capitalize' >
          {format(new Date(), "EEEE',' dd 'de' MMMM", {locale: ptBR})}
        </p>

        <div className='mt-6' >
          <Search/>
        </div>

        <h2 className='font-bold text-gray3 mt-9 mb-3 uppercase'>Agendamentos</h2>

        <div>
          <BookingItem/>
        </div>
      </div>
    </div>
  )
}
