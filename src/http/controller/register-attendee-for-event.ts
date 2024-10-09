import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterAttendeeForEventUseCase } from '../../use-cases/register-for-events-usecase'
import { RegisterAttendeeForEventRepository } from '../../repositories/prisma/prisma-register-attendee-for-event-repository'
import { PrismaEventRepository } from '../../repositories/prisma/prisma-event-repository'

export async function registerAttendeeForEvent(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const requestParamsSchema = z.object({
        eventId: z.string().uuid(),
    })

    const requestBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
    })

    const { eventId } = requestParamsSchema.parse(request.params)
    const { name, email } = requestBodySchema.parse(request.body)

    const prismaRegisterAttendeeForEvent =
        new RegisterAttendeeForEventRepository()
    const prismaEventRepository = new PrismaEventRepository()

    const registerForEvent = new RegisterAttendeeForEventUseCase(
        prismaRegisterAttendeeForEvent,
        prismaEventRepository,
    )

    await registerForEvent.execute({ name, email, eventId })

    return
}
