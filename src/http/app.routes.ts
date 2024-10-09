import { FastifyInstance } from 'fastify'
import { createEvent } from './controller/create_event'
import { registerAttendeeForEvent } from './controller/register-attendee-for-event'

export async function appRoutes(app: FastifyInstance) {
    app.post('/event', createEvent)
    app.post('/event/:eventId/attendees', registerAttendeeForEvent)
}
