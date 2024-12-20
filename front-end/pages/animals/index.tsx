import AnimalOverviewTable from "@components/animals/AnimalsOverviewTable";
import AnimalsOverviewTableAdmin from "@components/animals/AnimalsOverviewTableAdmin";
import OwnerInfo from "@components/animals/OwnerInfo";
import Header from "@components/header";
import UserService from "@services/UserService";
import AnimalService from "@services/AnimalService";
import { animal, user } from "@types";
import Head from "next/head";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const Animals: React.FC = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<animal | null>(null);

  const getAnimalsAndUsers = async () => {
    const responses = await Promise.all([
      AnimalService.getAllAnimals(),
      UserService.getAllUsers(),
    ]);
    const [animalsResponse, usersResponse] = responses;

    const animals = await animalsResponse.json();
    const users = await usersResponse.json();

    return { animals, users };
  };

  const { data, isLoading, error } = useSWR("animalsAndUsers", getAnimalsAndUsers);

  useInterval(() => {
    mutate("animalsAndUsers", getAnimalsAndUsers());
  }, 5000);

  const selectAnimal = (animal: animal) => {
    setSelectedAnimal(animal);
  };

  const deleteAnimal = async (animal: animal) => {
    try {
      await AnimalService.deleteAnimal(animal.firstname);
      mutate("animalsAndUsers");
    } catch (error) {
      console.error("Error deleting animal:", error);
      alert("Failed to delete animal. Please try again.");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <div className="text-red-800">Error: {error}</div>;

  return (
    <>
      <Head>
        <title>Animals</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Animals</h1>
        <section>
          {data && (
            <div>
              <h2>Click on an animal to see additional information about its owner!</h2>
              <AnimalsOverviewTableAdmin
                animals={data.animals}
                selectAnimal={selectAnimal}
                deleteAnimal={deleteAnimal}
              />
            </div>
          )}
        </section>
        <section>
          {selectedAnimal && data?.users && (
            <OwnerInfo animal={selectedAnimal} users={data.users} />
          )}
        </section>
      </main>
    </>
  );
};

export default Animals;
