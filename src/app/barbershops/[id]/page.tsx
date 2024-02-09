import { database } from "@/lib/prisma"

interface BarbershopDetailsProps {
  params: {
    id: string
  }
}

export default async function BarbershopDetailsPage({params}: BarbershopDetailsProps) {
  const barber = await database.barbershop.findUnique({
    where: {
      id: params.id
    }
  })

  if(!barber) {
    //TODO redirecionar para home
    return null
  }
  
  return (
    <div>
      {barber.name}
    </div>
  )
}