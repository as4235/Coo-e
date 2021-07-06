import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import styles from '../styles/homepage.module.css';
import Head from 'next/head';

export default function Home() {

  <Head>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossOrigin="anonymous"
    />
  </Head>

  const { user } = useUser();
  if (!user) {
    return (
      <>
        <img className={styles.bg} src="bg.jpg" alt="" />
        <div className={styles.center}>
          <h1>Management App</h1>
          <br />
          <button className="btn btn-light btn-lg btn-block">
            <Link href="/api/auth/login">Login</Link>
          </button>
        </div>
      </>
    )
  }
  return (
    <>
      <img className={styles.bg} src="bg.jpg" alt="" />

      <div className={styles.gridcontainer}>
        <Link href="/users"><div className={styles.griditem}>Search Users</div></Link>
        <Link href="/teeups"><div className={styles.griditem}>Search Teeups</div></Link>
      </div>
    </>
  );
}
