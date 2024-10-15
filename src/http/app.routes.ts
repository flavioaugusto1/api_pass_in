import { FastifyInstance } from 'fastify'
import { createEvent } from './controller/create-event'
import { registerAttendeeForEvent } from './controller/register-attendee-for-event'
import { getEvent } from './controller/get-event'
import { getAttendeeBadge } from './controller/get-attendee-badge'
import { checkIn } from './controller/create-check-in'

export async function appRoutes(app: FastifyInstance) {
    app.get('/event/:eventId', getEvent)
    app.post('/event', createEvent)

    app.post('/event/:eventId/attendees', registerAttendeeForEvent)
    app.get('/event/:eventId/attendees', registerAttendeeForEvent)

    app.get('/attendee/:attendeeId/badge', getAttendeeBadge)

    app.get('/attendees/:atteendeeId/check-in', checkIn)
}
