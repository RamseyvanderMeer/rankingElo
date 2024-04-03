// pages/api/randomResponses.js
import prisma from "../lib/prismaClient";

export async function GET() {
  try {
    // fetch all LLMs
    const llms = await prisma.lLM.findMany();
    return Response.json(llms);
  } catch (error) {
    return Response.json({ message: "Internal Server Error" });
  }
}
