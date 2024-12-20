import AnimalAdminPost from "@components/animals/AnimalAdminPost";
import AnimalsOverviewTable from "@components/animals/AnimalsOverviewTable";
import OwnerInfo from "@components/animals/OwnerInfo";
import Header from "@components/header";
import UserInfo from "@components/users/UserInfo";
import UserOverviewTable from "@components/users/UserOverviewTable";
import AnimalService from "@services/AnimalService";
import UserService from "@services/UserService";
import { animal, StatusMessage, user } from "@types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Animals: React.FC = () => {

  const [animals, setAnimals] = useState<Array<animal>>();
  const [users, setUsers] = useState<Array<user>>();
  const [statusMessage, setStatusMessages] = useState<StatusMessage[]>([]);
  const [isAdmin, setAdmin] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<animal | null>(null);
  

  const getAnimals = async () => {
      const response = await AnimalService.getAllAnimals();
      const animals = await response.json();
      setAnimals(animals);
  }

  const getUsers = async () => {
    const response = await UserService.getAllUsers();
    const users = await response.json();
    setUsers(users);
    
  }


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
      const user = JSON.parse(loggedInUser);
      if (user.role === "admin") {
        setAdmin(true)
      }
      getAnimals();
      getUsers();
    }
  }, []);

  const selectAnimal = (animal: animal) => {
    setSelectedAnimal(animal);
  };


  return (
    <>
      <Head>
        <title>Animals</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Animals</h1>
        <section>
          {statusMessage && (
                  <div className="row">
                    <ul className="list-none mb-3 mx-auto ">
                      {statusMessage.map(({ message, type }, index) => (
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

        {statusMessage.length === 0 && (
          <>

          {isAdmin && (
            <h2>Click on an animal to see additional information about its owner!</h2>
          )}
        <section>
            { animals && (
                <div>
                  
                  <AnimalsOverviewTable animals= {animals} selectAnimal={selectAnimal}/>
                </div>
                
            )}       
        </section>
        <section>
            {selectedAnimal && users && isAdmin &&(
                <OwnerInfo animal={selectedAnimal} users={users}/>
            )}
        </section>
        {/* <section>
        {isAdmin && animals && (
            
          )}
        </section> */}
        <section>
        {isAdmin && animals &&(
            <AnimalAdminPost/>
          )}
        </section>
        </>
      )}
      </main>
    </>
  );
};

export default Animals;


