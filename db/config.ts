import { column, defineDb, defineTable } from 'astro:db'

const EbookRequest = defineTable({
    columns: {
        id: column.text({ primaryKey: true }),
        name: column.text({ optional: true }),
        email: column.text(),
        createdAt: column.date(),
    },
})

const Appointment = defineTable({
    columns: {
        id: column.text({ primaryKey: true }),
        firstName: column.text(),
        lastName: column.text(),
        email: column.text(),
        age: column.number({ optional: true }),
        gender: column.text({ optional: true }),
        goal: column.text({ optional: true }),
        experience: column.text({ optional: true }),
        createdAt: column.date(),
        plan: column.text({ optional: true }),
        pack: column.text({ optional: true }),
        message: column.text({ optional: true }),
    },
})

// https://astro.build/db/config
export default defineDb({
    tables: { EbookRequest, Appointment },
})
