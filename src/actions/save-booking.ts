"use server"

import { database } from "@/lib/prisma";

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

  return booking
}