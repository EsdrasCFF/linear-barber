import { Header } from "@/components/Header";
import { Search } from "../(home)/components/Search";
import { database } from "@/lib/prisma";
import { BarbershopItem } from "../(home)/components/BarbershopItem";

interface BarbershopPageProps {
  searchParams: {
    search?: string;
  }
}

export default async function BarbershopPage({searchParams}: BarbershopPageProps) {
  const barbershops = await database.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: 'insensitive'
      }
    }
  })
  
  
  return (
    <>
      <Header/>
      
      <div  className="px-5 py-6">
        <Search/>

        {barbershops.length < 1 ? (
          <p className="text-sm text-white p-3">Nenhuma barbearia encontrada!</p>
        ):(
          <>
            <h2 className="text-xs text-gray3 font-bold pt-6" > RESULTADOS PARA: {`"${searchParams.search}"`} </h2>
            
            <div className="grid grid-cols-2 pt-3 gap-2" >
              {barbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))}
            </div>
          </>
        )}
      
      </div>
    </>    
  )
}