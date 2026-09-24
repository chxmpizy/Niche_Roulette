import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <div className="max-w-2xl mx-auto space-y-12">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-[1.1]">
          Funiche
          <br />
          Roulette
        </h1>
        
        <div className="space-y-2 text-gray-400 text-lg md:text-xl font-medium">
          <p>Find a random market.</p>
          <p>Find a random niche.</p>
          <p>Build something from it.</p>
        </div>

        <p className="text-gray-500 text-sm max-w-sm mx-auto">
          Spin through 3 stages and discover a random product opportunity.
        </p>

        <div className="pt-8">
          <Link 
            href="/roulette"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold uppercase tracking-wider text-sm hover:bg-gray-200 transition-colors border border-transparent focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-black"
          >
            Start Roulette
          </Link>
        </div>
      </div>
    </main>
  );
}
