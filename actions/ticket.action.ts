"use server";

import { prisma } from "@/lib/prisma";
import { TicketType } from "@/lib/types";

export const createTicketDb = async (data: TicketType) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (!user?.id) {
    return {
      success: false,
      message: "User not found",
    };
  }

  try {
    const ticket = await prisma.ticket.create({
      data: {
        email: data.email,
        message: data.message,
        ticketType: data.ticketType,
        userId: user.id,
      },
    });

    return {
      success: true,
      message: "Ticket created successfully",
      ticket,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error creating ticket",
      error,
    };
  }
};
