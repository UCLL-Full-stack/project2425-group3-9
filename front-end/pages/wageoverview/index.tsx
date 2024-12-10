import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import Link from 'next/link';
import styles from '@styles/home.module.css';
import { useEffect, useState } from 'react';
import { user } from '@types';
import UserService from '@services/UserService';
import WageOverviewTable from '@components/wageoverview/WageOverviewTable';
import UpdateWage from '@components/wageoverview/UpdateWage';


const Wage: React.FC = () => {
  const [users, setUsers] = useState<Array<user>>();
    const [selectedUser, setSelectedUser] = useState<user | null>(
    null
  );

    const getUsers = async () => {
        const response = await UserService.getAllUsers();
        const users = await response.json();
        setUsers(users);
    };

    useEffect(() => {
        getUsers()
        },
        []
    )

  const selectUser = (user: user) => {
    setSelectedUser(user);
  };
    return (
      <>
        <Head>
          <title>WageOverview</title>
          <meta name="description" content="WagePage app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header/>
        <main className={styles.main}>
          <h2>Click on an employee to change data!</h2>
          <section>
              { users && (
                  <WageOverviewTable users= {users} selectUser={selectUser}/>
              )}       
          </section>
          <section>
            { selectedUser && (
              <UpdateWage user={selectedUser}/>
            )}
          </section>
        </main>
      </>
    );
  };
  
  export default Wage;