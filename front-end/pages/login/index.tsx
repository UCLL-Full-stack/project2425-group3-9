import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import Link from 'next/link';
import styles from '@styles/home.module.css';
import UserLoginForm from '@components/users/UserLoginForm';


const Login: React.FC = () => {
    return (
      <>
        <Head>
          <title>Login</title>
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
              <UserLoginForm/>
          </div>
        </main>
      </>
    );
  };
  
  export default Login;