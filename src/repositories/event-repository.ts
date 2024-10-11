import { Prisma, Event } from '@prisma/client'

export interface EventInterface {
    id: string
    title: string
    details: string | null
    slug: string
    maximumAttendees: number | null
    _count: {
        attendees: number
    }
}

export interface EventRepository {
    create(data: Prisma.EventCreateInput): Promise<Event>
    findBySlug(slug: string): Promise<Event | null>
    findById(eventId: string): Promise<EventInterface | null>
}
