import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { database } from "@/lib/prisma"
import { BarbershopInfo } from "./components/BarbershopInfo"
import { ServiceItem } from "./components/ServiceItem"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

interface BarbershopDetailsProps {
  params: {
    id: string
  }
}

export default async function BarbershopDetailsPage({params}: BarbershopDetailsProps) {
  const session = await getServerSession(authOptions)

  const barbershop = await database.barbershop.findUnique({
    where: {
      id: params.id
    },
    include: {
      services: true
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

      <div className="flex flex-col gap-3 px-5" >
        {barbershop.services.map((service) => (
          <ServiceItem key={service.id} service={service} isAthenticated={!!session?.user} />
        ))}
      </div>

    </div>
  )
}