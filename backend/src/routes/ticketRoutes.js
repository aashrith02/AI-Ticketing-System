import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/createTicket", async (req, res) => {
	try {
		const { title, description, status, priority, queueId, userId } = req.body;

		const ticket = await prisma.ticket.create({
			data: {
				title,
				description,
				status,
				priority,
				queueId,
				userId,
			},
		});

		res.status(201).json(ticket);
	} catch (error) {
		console.error("Error creating ticket:", error);
		res.status(500).json({ error: "Failed to create ticket" });
	}
});

router.get("/getTicket/:id", async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const ticket = await prisma.ticket.findUnique({
			where: { id },
		});

		if (!ticket) {
			return res.status(404).json({ error: "Ticket not found" });
		}

		res.json(ticket);
	} catch (error) {
		console.error("Error fetching ticket:", error);
		res.status(500).json({ error: "Failed to fetch ticket" });
	}
});

router.put("/updateTicket/:id", async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const { title, description, status, priority, queueId } = req.body;

		const ticket = await prisma.ticket.update({
			where: { id },
			data: {
				title,
				description,
				status,
				priority,
				queueId,
			},
		});

		res.json(ticket);
	} catch (error) {
		console.error("Error updating ticket:", error);
		res.status(500).json({ error: "Failed to update ticket" });
	}
});

router.get("/myTickets", authenticate, async (req, res) => {
  try {
	const tickets = await prisma.ticket.findMany({
	where: {
		userId: req.user.id,
	},
	include: {
		queue: true,
		assignedTo: true,
	},
	});

    res.json(tickets);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch tickets",
    });
  }
});

const fetchUnassignedTicketsInQueue = async (req, res) => {
  try {
    const rawQueueIds = req.params.queueIds || "";
    const queueIds = rawQueueIds
      .split(",")
      .map((value) => Number(value.trim()))
      .filter((value) => Number.isInteger(value) && value > 0);

    const tickets = await prisma.ticket.findMany({
      where: {
        queueId: {
          in: queueIds,
        },
        assignedToId: null,
      },
      include: {
        queue: true,
        assignedTo: true,
      },
    });

    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch unassigned tickets" });
  }
};

router.get("/unassignedTicketsInQueue/:queueIds", authenticate, fetchUnassignedTicketsInQueue);
router.get("/uassignedTicketsInQueue/:queueIds", authenticate, fetchUnassignedTicketsInQueue);

export default router;
