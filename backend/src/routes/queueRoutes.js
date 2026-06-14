import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/getAllQueues", async (req, res) => {
  try {
    const queues = await prisma.queue.findMany({
      orderBy: {
        name: "asc",
      },
    });

    res.json(queues);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch queues, exception in queueRoutes.js",
    });
  }
});

router.get("/getQueuesForUser/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const queues = await prisma.queue.findMany({
      where: {
        queueMemberships: {
          some: {
            userId: parseInt(userId),
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    res.json(queues);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch queues for user, exception in queueRoutes.js",
    });
  }
}); 

export default router;