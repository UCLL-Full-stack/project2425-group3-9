import {Animal } from '../model/Animal';
import animalDb from '../repository/animal.db';
import { AnimalInput } from '../types';



const getAllAnimals = (): Promise<Animal[]> => {
    return animalDb.getAllAnimals();
};

const getAnimalByName = async (name: string): Promise<Animal> => {
    const animal = await animalDb.getAnimalByName(name);
    return animal;
};

const addAnimal = async ({firstname, lastname, age} : AnimalInput, userid : number): Promise<Animal> => {
    const animal = new Animal({firstname, lastname, age})
    const alreadyExistingAnimal = await getAnimalByName(animal.getFirstname());

    if (alreadyExistingAnimal) {
        throw new Error(`Animal with name ${animal.getFirstname()} already exists!`);
    }
    const addedAnimal = await animalDb.addAnimal(animal, userid);
    return addedAnimal;
};

const getUserIdOfAnimalName = async (animalname: string) : Promise<number> => {
    const id = await animalDb.getUserIdOfAnimalName(animalname);
    if (id === null) {
        throw new Error(`Couldn't find id of animal because animal with name ${animalname} doesn't exist!`)
    }
    return id;
}

const deleteAnimal = async (animalname: string) : Promise<Animal | null> => {
    const animal = await getAnimalByName(animalname);
    if (!animal) {
        throw new Error(`No Animal found with name ${animalname}`);
    }
    const id = await getUserIdOfAnimalName(animalname);
    return animalDb.deleteAnimal(animal, id);


}

export default { getAllAnimals, getAnimalByName, addAnimal, deleteAnimal};
