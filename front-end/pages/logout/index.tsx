import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import Link from 'next/link';
import styles from '@styles/home.module.css';


const Logout: React.FC = () => {
    return (
      <>
        <Head>
          <title>Logout</title>
          <meta name="description" content="WagePage app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header/>
        <main className={styles.main}>
          <span>
            <h1></h1>
          </span>
  
          <div className={styles.description}>
            <p>
                bezig aan logout pagina!
            </p>
          </div>
        </main>
      </>
    );
  };
  
  export default Logout;