import { Event, Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { EventInterface, EventRepository } from '../event-repository'

export class PrismaEventRepository implements EventRepository {
    async findById(eventId: string): Promise<EventInterface | null> {
        const event = await prisma.event.findUnique({
            select: {
                id: true,
                title: true,
                details: true,
                slug: true,
                maximumAttendees: true,
                _count: {
                    select: {
                        attendees: true,
                    },
                },
            },
            where: {
                id: eventId,
            },
        })

        return event
    }

    async findBySlug(slug: string): Promise<Event | null> {
        const eventBySlug = await prisma.event.findUnique({
            where: {
                slug,
            },
        })

        return eventBySlug
    }

    async create(data: Prisma.EventCreateInput) {
        const event = await prisma.event.create({
            data,
        })

        return event
    }
}
