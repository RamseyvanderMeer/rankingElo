import Image from "next/image"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-6xl font-bold">Elo LLM Ranking</h1>
      <p className="text-xl text-center">Vote on the better response to:</p>
        
      <div className="flex justify-center space-x-8">
        <div className="bg-gray-200 p-4">
          <h2 className="text-xl font-bold">Card 1</h2>
          <p>Content for Card 1</p>
        </div>
        <div className="bg-gray-200 p-4">
          <h2 className="text-xl font-bold">Card 2</h2>
          <p>Content for Card 2</p>
        </div>
      </div>
    </main>
  )
}
