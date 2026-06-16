import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function isUserInTicketQueue(ticketQueueId, userId) {
    const userQueueMemeberships = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            queueMemberships: {
                select: {
                    queueId: true,
                },
            },
        },
    });

    if (userQueueMemeberships) {
        const queueIds = userQueueMemeberships.queueMemberships.map(membership => membership.queueId);
        return queueIds.includes(ticketQueueId);
    }
    return false;
}