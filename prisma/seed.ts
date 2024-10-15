import { prisma } from '../src/lib/prisma'

async function seed() {
    await prisma.event.create({
        data: {
            id: '73b0e6f0-4e3f-4e78-9946-523752c50630',
            title: 'Unite Summit',
            slug: 'unite-summit',
            details: 'Um evento para devs',
            maximumAttendees: 120,
        },
    })
}

seed().then(() => {
    console.log('Database seeded!')
    prisma.$disconnect()
})
