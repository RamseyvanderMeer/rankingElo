// pages/api/randomResponses.js
import prisma from "./lib/prismaClient"

export default async function handler(req, res) {
  // Ensure this endpoint is only accessible via GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" })
  }

  try {
    // Get a random question
    const totalQuestions = await prisma.question.count()
    const randomQuestionIndex = Math.floor(Math.random() * totalQuestions)
    const randomQuestion = await prisma.question.findFirst({
      skip: randomQuestionIndex,
      include: {
        responses: true, // Include responses to fetch their IDs
      },
    })

    if (!randomQuestion || randomQuestion.responses.length < 2) {
      return res
        .status(404)
        .json({
          message: "Not enough responses found for the random question.",
        })
    }

    // Shuffle the responses array to then pick the first two items
    const shuffledResponses = randomQuestion.responses.sort(
      () => 0.5 - Math.random()
    )
    const selectedResponses = shuffledResponses.slice(0, 2)

    // Return the selected question and its two random responses
    res.status(200).json({
      question: randomQuestion.content,
      responses: selectedResponses.map((r) => ({
        id: r.id,
        content: r.content,
      })),
    })
  } catch (error) {
    console.error("Failed to fetch random responses:", error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}
