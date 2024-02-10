import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { database } from "@/lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from 'next/image'
import { BarbershopInfo } from "./components/BarbershopInfo"

interface BarbershopDetailsProps {
  params: {
    id: string
  }
}

export default async function BarbershopDetailsPage({params}: BarbershopDetailsProps) {
  const barbershop = await database.barbershop.findUnique({
    where: {
      id: params.id
    }
  })

  if(!barbershop) {
    //TODO redirecionar para home
    return null
  }
  
  return (
    <div>
      <BarbershopInfo barbershop={barbershop} />

      <Separator className="my-6" />

      <div>
        <Button>Serviços</Button>
        <Button>Serviços</Button>
      </div>

    </div>
  )
}