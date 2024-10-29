import styles from "./pageBox.module.css";

export default function PageBox({ currentPage, setCurrentPage, totalPages }) {
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  return (
    <div className={styles.pageBox}>
      <button
        className={styles.button}
        onClick={prevPage}
        disabled={currentPage === 1}
      >
        Zurück
      </button>
      <span className={styles.span}>
        {currentPage} / {totalPages}
      </span>
      <button
        className={styles.button}
        onClick={nextPage}
        disabled={currentPage === totalPages}
      >
        Weiter
      </button>
    </div>
  );
}
