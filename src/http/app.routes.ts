import { FastifyInstance } from 'fastify'
import { createEvent } from './controller/create_event'

export async function appRoutes(app: FastifyInstance) {
    app.post('/event', createEvent)
}
