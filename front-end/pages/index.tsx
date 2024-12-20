import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import styles from '@styles/home.module.css';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>WagePage</title>
        <meta name="description" content="WagePage app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main className={styles.main}>
        <span>
          <h1>Welcome!</h1>
        </span>

        <div className={styles.description}>
          <p>
            Welcome to the WagePage wabApplication. This site is made for employee's to see their coworkers information, their wage and animals if they own some. As administrators, this site is made for managing employee's their wages.
            The administrators can also delete or add animals for users.
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
