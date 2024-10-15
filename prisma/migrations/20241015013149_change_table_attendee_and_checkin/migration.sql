/*
  Warnings:

  - A unique constraint covering the columns `[number_participation]` on the table `attendee` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `attendee_id` on the `check_ins` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "check_ins" DROP CONSTRAINT "check_ins_attendee_id_fkey";

-- AlterTable
ALTER TABLE "check_ins" DROP COLUMN "attendee_id",
ADD COLUMN     "attendee_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "attendee_number_participation_key" ON "attendee"("number_participation");

-- CreateIndex
CREATE UNIQUE INDEX "check_ins_attendee_id_key" ON "check_ins"("attendee_id");

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_attendee_id_fkey" FOREIGN KEY ("attendee_id") REFERENCES "attendee"("number_participation") ON DELETE RESTRICT ON UPDATE CASCADE;
