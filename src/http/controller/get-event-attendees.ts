import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'

export async function getAttendeesEvent(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const requestParamsSchema = z.object({
        eventId: z.string().uuid(),
    })

    const requestQueryParamsSchema = z.object({
        query: z.string().nullable(),
        pageIndex: z.string().nullable().default('0').transform(Number),
    })

    const { pageIndex, query } = requestQueryParamsSchema.parse(request.query)

    const { eventId } = requestParamsSchema.parse(request.params)

    const attendees = await prisma.attendee.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            checkIn: {
                select: {
                    createdAt: true,
                },
            },
        },
        where: query
            ? {
                  event_id: eventId,
                  name: {
                      contains: query,
                  },
              }
            : {
                  event_id: eventId,
              },
        take: 10,
        skip: pageIndex * 10,
        orderBy: {
            createdAt: 'desc',
        },
    })

    return reply.send({
        attendees: attendees.map((attendee) => {
            return {
                id: attendee.id,
                name: attendee.name,
                email: attendee.email,
                createdAt: attendee.createdAt,
                checkedInAt: attendee.checkIn?.createdAt,
            }
        }),
    })
}
