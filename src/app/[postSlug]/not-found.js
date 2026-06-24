import Link from 'next/link';
import styles from './postSlug.module.css';

export default function NotFound() {
  return (
    <div className={styles.notFoundPage}>
      <h2>404 Not Found</h2>
      <p>
        This page does not exist. Please check the URL and
        try again.
      </p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
