-- DropForeignKey
ALTER TABLE "attendee" DROP CONSTRAINT "attendee_event_id_fkey";

-- DropForeignKey
ALTER TABLE "check_ins" DROP CONSTRAINT "check_ins_attendee_id_fkey";

-- AddForeignKey
ALTER TABLE "attendee" ADD CONSTRAINT "attendee_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_attendee_id_fkey" FOREIGN KEY ("attendee_id") REFERENCES "attendee"("number_participation") ON DELETE CASCADE ON UPDATE CASCADE;
