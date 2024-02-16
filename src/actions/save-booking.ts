"use server"

import { database } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface SaveBookingProps {
  userId: string;
  serviceId: string;
  barbershopId: string;
  date: Date;
}

export async function saveBooking({userId, serviceId, barbershopId, date}:SaveBookingProps) {
  
  if(!userId || !serviceId || !barbershopId || !date) {
    return null;
  }

  const booking = await database.booking.create({
    data: {
      userId,
      serviceId,
      barbershopId,
      date
    }
  })

  revalidatePath('/')
  revalidatePath('/bookings')

  return booking
}