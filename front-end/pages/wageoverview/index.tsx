import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import { useEffect, useState } from 'react';
import { user } from '@types';
import UserService from '@services/UserService';
import WageOverviewTable from '@components/wageoverview/WageOverviewTable';
import UpdateWage from '@components/wageoverview/UpdateWage';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';

const Wage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<user | null>(null);

  const getUsers = async () => {
    const response = await UserService.getAllUsers();
    const users = await response.json();
    return users;
  };

  const { data: users, isLoading, error } = useSWR('users', getUsers);

  useInterval(() => {
    mutate('users');
  }, 5000);

  const selectUser = (user: user) => {
    setSelectedUser(user);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users.</div>;

  return (
    <>
      <Head>
        <title>WageOverview</title>
        <meta name="description" content="WagePage app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <h2>Click on an employee to change data!</h2>
        <section>
          {users && (
            <WageOverviewTable users={users} selectUser={selectUser} />
          )}
        </section>
        <section>
          {selectedUser && <UpdateWage user={selectedUser} />}
        </section>
      </main>
    </>
  );
};

export default Wage;
