import { generateSlug } from '../utils/generate-slug'
import { prisma } from '../lib/prisma'
import { EventRepository } from '../repositories/event-repository'

interface RequestCreateEventInterface {
    title: string
    details: string | null
    maximumAttendees: number | null
}

export class CreateEventUseCase {
    constructor(private eventRepository: EventRepository) {}

    async execute({
        title,
        details,
        maximumAttendees,
    }: RequestCreateEventInterface) {
        const slug = generateSlug(title)

        const verifySlugExists = await this.eventRepository.find(slug)

        if (verifySlugExists) {
            throw new Error('Event already exists')
        }

        const event = await this.eventRepository.create({
            title,
            details,
            slug,
            maximumAttendees,
        })

        return event
    }
}
