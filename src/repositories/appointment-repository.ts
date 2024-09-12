import { Appointment, db, eq } from 'astro:db';
import { randomUUID } from 'crypto';

export type NewAppointment = Omit<typeof Appointment.$inferInsert, 'createdAt'>;
export type AppointmentEntity = typeof Appointment.$inferSelect;

export function create(appointment: NewAppointment) {
    return db
        .insert(Appointment)
        .values({
            id: randomUUID().toString(),
            createdAt: new Date(),
            ...appointment,
        })
        .returning();
}

export function deleteById(id: string) {
    return db.delete(Appointment).where(eq(Appointment.id, id));
}
