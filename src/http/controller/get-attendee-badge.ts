import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { RegisterAttendeeForEventRepository } from '../../repositories/prisma/prisma-register-attendee-for-event-repository'

export async function getAttendeeBadge(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const requestBodySchema = z.object({
        attendeeId: z.coerce.number(),
    })

    const { attendeeId } = requestBodySchema.parse(request.params)

    const prismaRegisterAttendeeForEvent =
        new RegisterAttendeeForEventRepository()

    const attendee = await prismaRegisterAttendeeForEvent.findById(attendeeId)

    return reply.status(200).send({ attendee })
}
