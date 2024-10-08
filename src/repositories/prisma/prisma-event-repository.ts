import { Event, Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { EventRepository } from '../event-repository'

export class PrismaEventRepository implements EventRepository {
    async find(slug: string): Promise<Event | null> {
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
