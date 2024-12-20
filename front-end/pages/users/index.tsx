import Header from "@components/header";
import UserInfo from "@components/users/UserInfo";
// import CourseOverviewTable from "@components/courses/CourseOverviewTable";
import UserOverviewTable from "@components/users/UserOverviewTable";
import UserService from "@services/UserService";
import { StatusMessage, user } from "@types";
import classNames from "classnames";
import Head from "next/head";
import { useEffect, useState } from "react";

const Users: React.FC = () => {
    const [users, setUsers] = useState<Array<user>>();
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
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
            message: `Login first to get the overview of Coworkers...`,
            type: "error",
          },
        ]);
      } else {
        getUsers();
      }
    }, []);

  const selectUser = (user: user) => {
    setSelectedUser(user);
  };

  return (
    <>
      <Head>
        <title>CoWorkers</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>CoWorkers</h1>
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
          <h2>Click on a coworker to see more information!</h2>
            <section>
              {users && (
                <UserOverviewTable users={users} selectUser={selectUser} />
              )}
            </section>
            <section>
              {selectedUser && selectedUser.profile &&(
                <section>
                  <h2>
                    Extra information about{" "}
                    {selectedUser.profile.firstname + " " + selectedUser.profile.lastname}
                  </h2>
                  <UserInfo user={selectedUser} />
                </section>
              )}
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default Users;


