import { Attendee, Prisma } from '@prisma/client'

export interface AttendeeIterface {
    name: string
    email: string
    event: {
        title: string
    }
}

export interface RegisterAttendeeRepository {
    create(data: Prisma.AttendeeCreateInput): Promise<Attendee | null>
    findById(attendeeId: number): Promise<AttendeeIterface | null>
    find(email: string, eventId: string): Promise<Attendee | null>
    countRegisteredAttendeesOnEvent(eventId: string): Promise<number>
}
