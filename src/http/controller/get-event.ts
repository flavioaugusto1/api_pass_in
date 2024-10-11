import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaEventRepository } from '../../repositories/prisma/prisma-event-repository'

export async function getEvent(request: FastifyRequest, reply: FastifyReply) {
    const requestBodySchema = z.object({
        eventId: z.string().uuid(),
    })

    const { eventId } = requestBodySchema.parse(request.params)

    const prismaEventRepository = new PrismaEventRepository()

    const event = await prismaEventRepository.findById(eventId)

    if (!event) {
        throw new Error('Evento não encontrado.')
    }

    return reply.status(200).send({
        event: {
            id: event.id,
            title: event.title,
            details: event.details,
            slug: event.slug,
            maxAttendees: event.maximumAttendees,
            amoutAttendees: event._count.attendees,
        },
    })
}
