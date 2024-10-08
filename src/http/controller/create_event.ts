import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { CreateEventUseCase } from '../../use-cases/create-event'
import { PrismaEventRepository } from '../../repositories/prisma/prisma-event-repository'

export async function createEvent(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const requestBodySchema = z.object({
        title: z.string(),
        details: z.string().nullable(),
        maximumAttendees: z.number().int().positive().nullable(),
    })

    const { title, details, maximumAttendees } = requestBodySchema.parse(
        request.body,
    )

    const prismaEventRepository = new PrismaEventRepository()
    const createEventUseCae = new CreateEventUseCase(prismaEventRepository)

    const event = await createEventUseCae.execute({
        title,
        details,
        maximumAttendees,
    })

    return reply.status(201).send({
        event: {
            id: event.id,
        },
    })
}
