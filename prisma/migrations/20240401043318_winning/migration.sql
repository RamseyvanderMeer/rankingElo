/*
  Warnings:

  - You are about to drop the column `responseAId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `responseBId` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `winnerId` on the `Match` table. All the data in the column will be lost.
  - Added the required column `LossingResponseId` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `winningResponseId` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterSequence
ALTER SEQUENCE "LLM_id_seq" MAXVALUE 9223372036854775807;

-- AlterSequence
ALTER SEQUENCE "Question_id_seq" MAXVALUE 9223372036854775807;

-- AlterSequence
ALTER SEQUENCE "Response_id_seq" MAXVALUE 9223372036854775807;

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_responseAId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_responseBId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_winnerId_fkey";

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "responseAId";
ALTER TABLE "Match" DROP COLUMN "responseBId";
ALTER TABLE "Match" DROP COLUMN "winnerId";
ALTER TABLE "Match" ADD COLUMN     "LossingResponseId" INT4 NOT NULL;
ALTER TABLE "Match" ADD COLUMN     "winningResponseId" INT4 NOT NULL;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_LossingResponseId_fkey" FOREIGN KEY ("LossingResponseId") REFERENCES "Response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_winningResponseId_fkey" FOREIGN KEY ("winningResponseId") REFERENCES "Response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
