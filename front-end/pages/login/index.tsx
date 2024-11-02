import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import Link from 'next/link';
import styles from '@styles/home.module.css';


const Login: React.FC = () => {
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
            <h1></h1>
          </span>
  
          <div className={styles.description}>
            <p>
                bezig aan login pagina
              {/* Courses lets you see as a lecturer all the courses you are teaching
              and as a student all the courses you are enrolled in. <br />
              You can also see when the courses are scheduled and the students
              enrolled in each course. */}
            </p>
          </div>
        </main>
      </>
    );
  };
  
  export default Login;