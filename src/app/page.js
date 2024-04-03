"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [response1, setResponse1] = useState({});
  const [response2, setResponse2] = useState({});

  const getResponses = async () => {
    const res = await fetch("/api/randomResponses");
    const data = await res.json();
    setQuestion(data.randomQuestion.content);
    setResponse1(
      data.randomQuestion.responses.find((r) => r.id === data.responses[0]),
    );
    setResponse2(
      data.randomQuestion.responses.find((r) => r.id === data.responses[1]),
    );
    console.log("here");
  };

  useEffect(() => {
    getResponses();
  }, []);

  const handleVote = async (winnerResponseId, loserResponseId) => {
    const res = await fetch("/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ winnerResponseId, loserResponseId }),
    });
    getResponses();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="m-8 text-6xl font-bold">Elo LLM Ranking</h1>
      <p className="m-16 text-center text-3xl">
        Vote on the better response to: {question}
      </p>
      <div className="flex justify-center space-x-8">
        <button
          className="bg-gray-200 p-4"
          onClick={() => handleVote(response1.id, response2.id)}
        >
          <h2 className="text-3xl font-bold text-indigo-400">
            {response1.content}
          </h2>
        </button>
        <button
          className="bg-gray-200 p-4"
          onClick={() => handleVote(response2.id, response1.id)}
        >
          <h2 className="text-3xl font-bold text-indigo-400">
            {response2.content}
          </h2>
        </button>
      </div>
    </main>
  );
}
