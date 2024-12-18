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

const addAnimal = (animalType: AnimalInput, userid : number): Promise<Animal> => {
    if (!animalType.firstname || typeof animalType.firstname !== 'string' || animalType.firstname.trim() === '') {
        throw new Error('Invalid firstname: must be a non-empty string.');
    }
    if (!animalType.lastname || typeof animalType.lastname !== 'string' || animalType.lastname.trim() === '') {
        throw new Error('Invalid lastname: must be a non-empty string.');
    }

    if (typeof animalType.age !== 'number' || animalType.age < 0) {
        throw new Error('Invalid age: must be a non-negative number.');
    }
    return animalDb.addAnimal(animalType, userid);
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
