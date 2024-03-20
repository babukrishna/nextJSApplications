import Link from "next/link";
import Styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={Styles.home}>
      <h1 className={Styles.title}>Project List</h1>
      <nav className={Styles.navItem}>
        <div>
          <Link href={"/guess-the-word"} className="btn primary">
            Guess Word - Game
          </Link>
          <sub>
            Guess the word in the given time
          </sub>
        </div>
      </nav>
    </main>
  );
}
