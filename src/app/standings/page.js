"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [llms, setLlms] = useState([]);

  const getLlms = async () => {
    const res = await fetch("/api/fetchLLMs");
    const data = await res.json();
    setLlms(data);
  };

  useEffect(() => {
    getLlms();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <button className="absolute right-6 top-6 h-10 w-10 hover:cursor-pointer">
        <a href="/" className="text-4xl">
          🏠
        </a>
      </button>
      <h1 className="m-8 text-6xl font-bold">Elo LLM Ranking</h1>
      {llms.map((llm) => (
        <div key={llm.id} className="flex items-center space-x-4">
          <h2 className="inline-block bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-3xl font-bold text-transparent">
            {llm.name} - {llm.rating}
          </h2>
        </div>
      ))}
    </main>
  );
  s;
}
