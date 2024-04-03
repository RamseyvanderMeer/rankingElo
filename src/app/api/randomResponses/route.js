// pages/api/randomResponses.js
import prisma from "../lib/prismaClient";

export const revalidate = 0;

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Get a random question
    const totalQuestions = await prisma.question.count();
    const randomQuestionIndex = Math.floor(Math.random() * totalQuestions);
    const randomQuestion = await prisma.question.findFirst({
      skip: randomQuestionIndex,
      include: {
        responses: true, // Include responses to fetch their IDs
      },
    });

    if (!randomQuestion || randomQuestion.responses.length < 2) {
      return Response.json({
        message: "Not enough responses found for the random question.",
      });
    }

    // Shuffle the responses array to then pick the first two items
    const shuffledResponses = randomQuestion.responses.sort(
      () => 0.5 - Math.random(),
    );
    const selectedResponses = shuffledResponses.slice(0, 2);

    // Return the selected question and its two random responses
    return Response.json({
      randomQuestion,
      responses: selectedResponses.map((r) => r.id),
    });
  } catch (error) {
    console.error("Failed to fetch random responses:", error);
    return Response.json({ message: "Internal Server Error" });
  }
}
