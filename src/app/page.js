"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [response1, setResponse1] = useState({});
  const [response2, setResponse2] = useState({});
  const [dataReady, setDataReady] = useState(false);

  const getResponses = async () => {
    // don't cache the response
    const res = await fetch("/api/randomResponses", { cache: "no-store" });
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    setQuestion(data.randomQuestion.content);
    setResponse1(
      data.randomQuestion.responses.find((r) => r.id === data.responses[0]),
    );
    setResponse2(
      data.randomQuestion.responses.find((r) => r.id === data.responses[1]),
    );
  };

  useEffect(() => {
    getResponses();
    setDataReady(true);
  }, []);

  const handleVote = async (winnerResponseId, loserResponseId) => {
    // get new responses
    getResponses();
    const res = await fetch("/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ winnerResponseId, loserResponseId }),
    });
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    console.log("Voted successfully");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <button className="absolute right-6 top-6 h-10 w-10 hover:cursor-pointer">
        <a href="/standings" className="text-4xl">
          👑
        </a>
      </button>
      <h1 className="m-8 text-6xl font-bold">
        {Math.floor(Math.random() * 10)}
      </h1>
      {dataReady ? (
        <div>
          <p className="m-16 text-center text-3xl">{question}</p>
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
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </main>
  );
}
