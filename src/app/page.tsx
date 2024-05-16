import { Card, SearchBar } from "./components";
import styles from "./page.module.css";

export default function Home() {
  const cardsArray = new Array(10).fill({
    title: "Hello",
    content: "Content goes here boyyy",
  });

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1>Sanctuary</h1>
        <SearchBar />
      </div>
      <div className={styles.content}>
        <h2>Notes</h2>
        <div className={styles.list}>
          {cardsArray.map((card, i) => (
            <Card key={`card-${i}`} title={card.title} content={card.content} />
          ))}
        </div>
      </div>
    </main>
  );
}
