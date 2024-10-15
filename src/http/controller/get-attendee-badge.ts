import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
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

    const baseURL = `${request.protocol}://${request.hostname}`

    const checkInURL = new URL(`/attendees/${attendeeId}/check-in`, baseURL)

    return reply.status(200).send({
        badge: {
            name: attendee?.name,
            email: attendee?.email,
            eventTitle: attendee?.event.title,
            checkInURL: checkInURL.toString(),
        },
    })
}
