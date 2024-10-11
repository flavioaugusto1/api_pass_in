import { Attendee, Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import {
    AttendeeIterface,
    RegisterAttendeeRepository,
} from '../register-attendee-repository'

export class RegisterAttendeeForEventRepository
    implements RegisterAttendeeRepository
{
    async findById(attendeeId: number): Promise<AttendeeIterface | null> {
        const attendee = await prisma.attendee.findFirst({
            select: {
                name: true,
                email: true,
                event: {
                    select: {
                        title: true,
                    },
                },
            },
            where: {
                numberParticipation: attendeeId,
            },
        })

        return attendee
    }
    async find(email: string, eventId: string): Promise<Attendee | null> {
        const attendee = await prisma.attendee.findUnique({
            where: {
                event_id_email: {
                    email,
                    event_id: eventId,
                },
            },
        })

        return attendee
    }

    async countRegisteredAttendeesOnEvent(eventId: string): Promise<number> {
        const attendeeCount = await prisma.attendee.count({
            where: {
                event_id: eventId,
            },
        })

        return attendeeCount
    }

    async create(data: Prisma.AttendeeCreateInput) {
        const attendee = await prisma.attendee.create({
            data,
        })
        return attendee
    }
}
