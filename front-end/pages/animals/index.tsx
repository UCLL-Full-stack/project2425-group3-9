import AnimalsOverviewTable from "@components/animals/AnimalsOverviewTable";
import OwnerInfo from "@components/animals/OwnerInfo";
import Header from "@components/header";
import UserInfo from "@components/users/UserInfo";
import UserOverviewTable from "@components/users/UserOverviewTable";
import AnimalService from "@services/AnimalService";
import UserService from "@services/UserService";
import { animal, user } from "@types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Animals: React.FC = () => {

  const [animals, setAnimals] = useState<Array<animal>>();
  const [users, setUsers] = useState<Array<user>>();
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
    getAnimals()
  }, [])

  // useEffect(() => {
  //   const loggedInUser = sessionStorage.getItem("loggedInUser");

  //   if (!loggedInUser) {
  //     setStatusMessages([
  //       {
  //         message: `Login first to get the overview of Coworkers...`,
  //         type: "error",
  //       },
  //     ]);
  //   } else {
  //     getUsers();
  //   }
  // }, []);

  const selectAnimal = (animal: animal) => {
    setSelectedAnimal(animal);
  };

  useEffect(() => {
    getUsers()
  }, [])


  return (
    <>
      <Head>
        <title>Animals</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Animals</h1>
        <section>
            { animals && (
                <div>
                  <h2>Click on an animal to see additional information about its owner!</h2>
                  <AnimalsOverviewTable animals= {animals} selectAnimal={selectAnimal}/>
                </div>
                
            )}       
        </section>
        <section>
            {selectedAnimal && users &&(
                <OwnerInfo animal={selectedAnimal} users={users}/>
            )}
        </section>
      </main>
    </>
  );
};

export default Animals;


