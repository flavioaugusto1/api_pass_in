import { Attendee, Prisma } from '@prisma/client'

export interface RegisterAttendeeRepository {
    create(data: Prisma.AttendeeCreateInput): Promise<Attendee | null>
    find(email: string): Promise<Attendee | null>
}
