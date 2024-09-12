import { EbookRequest, db, eq } from 'astro:db'
import { randomUUID } from 'crypto'

type NewEbookRequest = Omit<typeof EbookRequest.$inferInsert, 'createdAt'>

export function create(ebookRequest: NewEbookRequest) {
    return db
        .insert(EbookRequest)
        .values({
            id: randomUUID().toString(),
            createdAt: new Date(),
            ...ebookRequest,
        })
        .returning()
}

export function deleteById(id: string) {
    return db.delete(EbookRequest).where(eq(EbookRequest.id, id))
}
