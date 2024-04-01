import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-6xl font-bold">Elo LLM Ranking</h1>
        <p className="text-xl text-center">
            App to rank Large Language Models based on Elo rating
        </p>
        
    </main>
  );
}
