import {Animal } from '../model/Animal';
import animalDb from '../repository/animal.db';
import { AnimalInput } from '../types';



const getAllAnimals = (): Animal[] => {
    return animalDb.getAllAnimals();
};

const getAnimalByName = async (name: string): Promise<Animal> => {
    const animal = animalDb.getAnimalByName(name);
    if (!animal) throw new Error(`Animal with name ${name} does not exist.`);
    return animal;
};

const addAnimal = (animalType: AnimalInput): Animal => {
    if (!animalType.firstname || typeof animalType.firstname !== 'string' || animalType.firstname.trim() === '') {
        throw new Error('Invalid firstname: must be a non-empty string.');
    }
    if (!animalType.lastname || typeof animalType.lastname !== 'string' || animalType.lastname.trim() === '') {
        throw new Error('Invalid lastname: must be a non-empty string.');
    }

    if (typeof animalType.age !== 'number' || animalType.age < 0) {
        throw new Error('Invalid age: must be a non-negative number.');
    }
    return animalDb.addAnimal(animalType);
};

const deleteAnimal = async (animalname: string) : Promise<Animal | null> => {
    const animal = await getAnimalByName(animalname);

    return animalDb.deleteAnimal(animal);


}

export default { getAllAnimals, getAnimalByName, addAnimal, deleteAnimal};
