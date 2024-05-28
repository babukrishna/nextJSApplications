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
        <div>
          <Link href={"/guess-the-image"} className="btn primary">
            Guess image - Game
          </Link>
          <sub>
            Guess the image in the given time
          </sub>
        </div>
        <div>
          <Link href={"/option-questions"} className="btn primary">
            Objective / Option - Game
          </Link>
          <sub>
            Option Questions
          </sub>
        </div>
        <div>
          <Link href={"/youtube-tag-generator"} className="btn primary">
            Youtube Tag Generator
          </Link>
          <sub>
            Generate youtube tag
          </sub>
        </div>
      </nav>
    </main>
  );
}
