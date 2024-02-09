import { Header } from '@/components/Header'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Search } from './components/Search'

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
      </div>
    </div>
  )
}
