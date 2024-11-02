import Header from "@components/header";
import UserInfo from "@components/users/UserInfo";
// import CourseOverviewTable from "@components/courses/CourseOverviewTable";
import UserOverviewTable from "@components/users/UserOverviewTable";
import UserService from "@services/UserService";
import { user } from "@types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Users: React.FC = () => {
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
        <title>CoWorkers</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>CoWorkers</h1>
        <section>
            { users && (
                <UserOverviewTable users= {users} selectUser={selectUser}/>
            )}       
        </section>
        <section>
            {selectedUser && (
                <section><h2>Extra information about {selectedUser.profile.firstname + " " + selectedUser.profile.lastname}</h2>
                <UserInfo user={selectedUser} /></section>
            )}
        </section>
      </main>
    </>
  );
};

export default Users;


