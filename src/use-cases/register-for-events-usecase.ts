import { prisma } from '../lib/prisma'
import { EventRepository } from '../repositories/event-repository'
import { RegisterAttendeeRepository } from '../repositories/register-attendee-repository'

interface RegisterAttendeeForEventInterface {
    name: string
    email: string
    eventId: string
}

export class RegisterAttendeeForEventUseCase {
    constructor(
        private registerAttendeeRepository: RegisterAttendeeRepository,
        private eventRepository: EventRepository,
    ) {}

    async execute({ name, email, eventId }: RegisterAttendeeForEventInterface) {
        const event = await this.eventRepository.findById(eventId)

        if (!event) {
            throw new Error('O evento que está tentando cadastrar não existe.')
        }

        const [attendee, amountOfAttendeesForEvent] = await Promise.all([
            this.registerAttendeeRepository.find(email, eventId),

            await this.registerAttendeeRepository.countRegisteredAttendeesOnEvent(
                eventId,
            ),
        ])

        if (attendee) {
            throw new Error('O participante já está nesse evento')
        }

        if (
            event.maximumAttendees &&
            amountOfAttendeesForEvent >= event.maximumAttendees
        ) {
            throw new Error('O evento atingiu o máximo de participantes.')
        }

        const attendeeCreated = await this.registerAttendeeRepository.create({
            name,
            email,
            event: {
                connect: event,
            },
        })

        return attendeeCreated
    }
}
