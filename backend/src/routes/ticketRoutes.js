import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/createTicket", async (req, res) => {
    try {
        const { title, description, status, priority, assignedTo, userId } = req.body;

        const ticket = await prisma.ticket.create({
            data: {
                title,
                description,
                status,
                priority,
                assignedTo,
                userId
            }
        });

        res.status(201).json(ticket);
    } catch (error) {
        console.error("Error creating ticket:", error);
        res.status(500).json({ error: "Failed to create ticket" });
    }
});