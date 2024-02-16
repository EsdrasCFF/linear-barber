import { Separator } from "@/components/ui/separator"
import { database } from "@/lib/prisma"
import { BarbershopInfo } from "./components/BarbershopInfo"
import { ServiceItem } from "./components/ServiceItem"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Metadata, ResolvedMetadata } from "next"

interface BarbershopDetailsProps {
  params: {
    id: string
  }
}

export async function generateMetada({params}: BarbershopDetailsProps, parent: ResolvedMetadata): Promise<Metadata> {
  const id = params.id

  const barbershops = await database.barbershop.findUnique({
    where: {
      id
    }
  })

  const previousImage = (await parent).openGraph?.images || []

  return {
    title: barbershops?.name,
    description: barbershops?.address,
    openGraph: {
      images: [`${barbershops?.imageUrl}`, ...previousImage]
    }
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
          <ServiceItem 
            key={service.id} 
            service={service} 
            barbershopName={barbershop.name} 
            isAthenticated={!!session?.user} 
            barbershopId={service.barbershopId}
          />
        ))}
      </div>

    </div>
  )
}