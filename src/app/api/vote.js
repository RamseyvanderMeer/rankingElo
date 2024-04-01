// pages/api/vote.js

import prisma from "./lib/prismaClient"

// Function to calculate the new Elo ratings
const calculateNewRatings = (winnerRating, loserRating) => {
  const K = 32 // K-factor, determines the sensitivity of the rating adjustments
  const expectedScoreWinner =
    1 / (1 + 10 ** ((loserRating - winnerRating) / 400))
  const expectedScoreLoser = 1 - expectedScoreWinner // Since the sum of expected scores is 1

  // Adjusting ratings
  const newWinnerRating = Math.round(
    winnerRating + K * (1 - expectedScoreWinner)
  )
  const newLoserRating = Math.round(loserRating + K * (0 - expectedScoreLoser))

  return { newWinnerRating, newLoserRating }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" })
  }

  const { winnerResponseId, loserResponseId } = req.body

  if (!winnerResponseId || !loserResponseId) {
    return res
      .status(400)
      .json({
        message: "Missing winnerResponseId or loserResponseId in request body.",
      })
  }

  try {
    // Start a transaction to ensure data consistency
    const result = await prisma.$transaction(async (prisma) => {
      // Create a new Match entry
      const newMatch = await prisma.match.create({
        data: {
          winningResponse: { connect: { id: winnerResponseId } },
          LossingResponse: { connect: { id: loserResponseId } },
        },
      })

      // Fetch current ratings of LLMs associated with the winning and losing responses
      const [winnerLLM, loserLLM] = await Promise.all([
        prisma.lLM.findUnique({
          where: {
            id: (
              await prisma.response.findUnique({
                where: { id: winnerResponseId },
              })
            ).llmId,
          },
        }),
        prisma.lLM.findUnique({
          where: {
            id: (
              await prisma.response.findUnique({
                where: { id: loserResponseId },
              })
            ).llmId,
          },
        }),
      ])

      // Calculate new ratings
      const { newWinnerRating, newLoserRating } = calculateNewRatings(
        winnerLLM.rating,
        loserLLM.rating
      )

      // Update the LLM ratings
      const [updatedWinnerLLM, updatedLoserLLM] = await Promise.all([
        prisma.lLM.update({
          where: { id: winnerLLM.id },
          data: { rating: newWinnerRating },
        }),
        prisma.lLM.update({
          where: { id: loserLLM.id },
          data: { rating: newLoserRating },
        }),
      ])

      return { newMatch, updatedWinnerLLM, updatedLoserLLM }
    })

    res
      .status(200)
      .json({ message: "Vote and match recorded successfully.", result })
  } catch (error) {
    console.error("Failed to record vote and create match:", error)
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message })
  }
}
