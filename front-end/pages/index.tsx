import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import {useTranslation} from "next-i18next";
import { serverSideTranslations} from "next-i18next/serverSideTranslations"
import styles from '@styles/home.module.css';

const Home: React.FC = () => {

  const {t} = useTranslation();

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
          <h1>t("app.welcome")</h1>
        </span>

        <div className={styles.description}>
        </div>
      </main>
    </>
  );
};


export const getServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default Home;
