import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import Link from 'next/link';
import styles from '@styles/home.module.css';
import { useEffect, useState } from 'react';
import { StatusMessage, user } from '@types';
import UserService from '@services/UserService';
import WageOverviewTable from '@components/wageoverview/WageOverviewTable';
import UpdateWage from '@components/wageoverview/UpdateWage';


const Wage: React.FC = () => {
    const [users, setUsers] = useState<Array<user>>();
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const [isAdmin, setAdmin] = useState(false);
    const [selectedUser, setSelectedUser] = useState<user | null>(
    null
  );

  const getUsers = async () => {
        const response = await UserService.getAllUsers();
        const users = await response.json();
        setUsers(users);
  };


  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");

    if (!loggedInUser) {
      setStatusMessages([
        {
          message: `Login first to get the overview of wage...`,
          type: "error",
        },
      ]);
    
    } else {
      const user = JSON.parse(loggedInUser);
      if (user.role === "admin") {
        setAdmin(true)
      }
      getUsers();
    }
  }, []);

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

          <h1>WageOverview</h1>

        <section>
          {statusMessages && (
                  <div className="row">
                    <ul className="list-none mb-3 mx-auto ">
                      {statusMessages.map(({ message, type }, index) => (
                        <li
                        key={index}
                        style={{ color: "red" }}
                      >
                        {message}
                      </li>
                      ))}
                    </ul>
                  </div>
                )}
        </section>

        {statusMessages.length === 0 && (
          <>
          {isAdmin && (
            <h2>Click on an employee to change data!</h2>
          )}
          
          <section>
              { users && (
                  <WageOverviewTable users= {users} selectUser={selectUser}/>
              )}       
          </section>
          <section>
            { selectedUser && isAdmin && (
              <UpdateWage user={selectedUser}/>
            )}
          </section>
          </>
        )}
        </main>
      </>
    );
  };
  
  export default Wage;