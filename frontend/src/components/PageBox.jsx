import PageButton from "./PageButton";
import styles from "./pageBox.module.css";

export default function PageBox() {
  return (
    <div className={styles.pageBox}>
      <PageButton />
    </div>
  );
}
