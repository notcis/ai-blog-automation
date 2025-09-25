"use server";

import { prisma } from "@/lib/prisma";
import { TicketType } from "@/lib/types";
import { revalidatePath } from "next/cache";

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

export const adminGetAllTicketsDb = async (page: number, limit: number) => {
  const [tickets, totalCount, openCount, closedCount] = await Promise.all([
    prisma.ticket.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: { name: true },
        },
      },
    }),
    prisma.ticket.count(),
    prisma.ticket.count({
      where: {
        status: "open",
      },
    }),
    prisma.ticket.count({
      where: {
        status: "closed",
      },
    }),
  ]);

  return {
    tickets: tickets.map((ticket) => ({
      ...ticket,
      user: ticket.user.name ? { name: ticket.user.name } : undefined,
    })),
    totalCount,
    openCount,
    closedCount,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    },
  };
};

export const toggleTicketStatusDb = async (ticketId: string) => {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  });
  if (!ticket) {
    return {
      success: false,
      message: "Ticket not found",
    };
  }
  const newStatus = ticket.status === "open" ? "closed" : "open";
  try {
    const updatedTicket = await prisma.ticket.update({
      where: { id: ticketId },
      data: { status: newStatus },
    });
    revalidatePath("/admin/tickets");
    return {
      success: true,
      message: ` Ticket status updated to ${newStatus}`,
      ticket: updatedTicket,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error updating ticket status",
      error,
    };
  }
};
