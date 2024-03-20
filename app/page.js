import Link from "next/link";

export default function Home() {
  return (
    <main>
    <h1 style={{padding: '20px 20px 0'}}>Project List</h1>
      <nav style={{padding: '20px'}}>
        <div><Link href={'/guess-the-word'} className="btn primary">Guess Word - Game</Link><sub style={{paddingLeft: '20px'}}>Guess the word in the given time</sub></div>
      </nav>
    </main>
  );
}
