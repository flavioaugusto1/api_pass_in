import { Prisma, Event } from '@prisma/client'

export interface EventRepository {
    create(data: Prisma.EventCreateInput): Promise<Event>
    find(slug: string): Promise<Event | null>
}
