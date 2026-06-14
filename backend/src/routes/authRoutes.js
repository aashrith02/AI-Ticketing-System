import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/register", async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);

		const existingUser = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (existingUser) {
			return res.status(400).json({
				message: "User already exists",
			});
		}

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		});

		res.status(201).json({
			message: "User registered successfully",
			user,
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			message: "Server error",
		});
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			return res.status(400).json({
				message: "Invalid email or password",
			});
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			return res.status(400).json({
				message: "Invalid email or password",
			});
		}

		const token = jwt.sign(
			{
				userId: user.id,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: "1d",
			},
		);

		res.status(200).json({
			message: "Login successful",
			token,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				queues: user.queueMemberships.map((membership) => ({
					id: membership.queue.id,
					name: membership.queue.name,
				})),
			},
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			message: "Server error",
		});
	}
});

export default router;
