import { Attendee, Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { RegisterAttendeeRepository } from '../register-attendee-repository'

export class RegisterAttendeeForEventRepository
    implements RegisterAttendeeRepository
{
    async find(email: string): Promise<Attendee | null> {
        const attendee = await prisma.attendee.findUnique({
            where: {
                email,
            },
        })

        return attendee
    }
    async create(data: Prisma.AttendeeCreateInput) {
        const attendee = await prisma.attendee.create({
            data,
        })
        return attendee
    }
}
