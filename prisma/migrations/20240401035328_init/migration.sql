-- CreateTable
CREATE TABLE "LLM" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "name" STRING NOT NULL,
    "rating" INT4 NOT NULL DEFAULT 1500,

    CONSTRAINT "LLM_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "content" STRING NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Response" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "content" STRING NOT NULL,
    "questionId" INT4 NOT NULL,
    "llmId" INT4 NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "responseAId" INT4 NOT NULL,
    "responseBId" INT4 NOT NULL,
    "winnerId" INT4,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_llmId_fkey" FOREIGN KEY ("llmId") REFERENCES "LLM"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_responseAId_fkey" FOREIGN KEY ("responseAId") REFERENCES "Response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_responseBId_fkey" FOREIGN KEY ("responseBId") REFERENCES "Response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "Response"("id") ON DELETE SET NULL ON UPDATE CASCADE;
