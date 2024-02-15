"use server"

import { database } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function cancelBooking(bookingId: string) {
  
  const canceledBooking = await database.booking.delete({
    where: {
      id: bookingId
    }
  })

  if(!canceledBooking) {
    return null
  }

  revalidatePath('/bookings')

  return canceledBooking;
}