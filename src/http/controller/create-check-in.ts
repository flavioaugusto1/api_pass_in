import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'

export async function checkIn(request: FastifyRequest, reply: FastifyReply) {
    const requestParamSchema = z.object({
        attendeeId: z.coerce.number().int(),
    })

    const { attendeeId } = requestParamSchema.parse(request.params)

    const attendeeCheckin = await prisma.checkIn.findUnique({
        where: {
            attendeeId,
        },
    })

    if (!attendeeCheckin) {
        throw new Error('O participante já fez check-in.')
    }

    await prisma.checkIn.create({
        data: {
            attendeeId,
        },
    })

    return reply.status(201).send({})
}
