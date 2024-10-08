import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { generateSlug } from '../../utils/generate-slug'

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

    const slug = generateSlug(title)

    const verifySlugExists = await prisma.event.findUnique({
        where: {
            slug,
        },
    })

    if (verifySlugExists) {
        return reply.status(409).send({ message: 'Event already exists' })
    }

    const event = await prisma.event.create({
        data: {
            title,
            details,
            slug,
            maximumAttendees,
        },
    })

    return reply.status(201).send({
        event: {
            id: event.id,
        },
    })
}
