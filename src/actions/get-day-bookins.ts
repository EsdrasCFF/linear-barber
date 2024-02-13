"use server"

import { database } from "@/lib/prisma"
import { endOfDay, startOfDay } from "date-fns"

export async function getDayBookings(date: Date) {
  
  if(!date) {
    return
  }

  const bookings = await database.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date)
      }
    }
  })

  return bookings

}