import {Animal } from '../model/Animal';
import animalDb from '../repository/animal.db';
import userDb from '../repository/user.db';
import { AnimalInput, Role } from '../types';
import userService from './user.service';



const getAllAnimals = async (username: string, role: Role): Promise<Animal[]> => {
    if (role === "admin") {
    const animals = await animalDb.getAllAnimals();
    return animals;
    }
    if (role === "employee" || role === "caretaker") {
        const user = await userDb.getUserByUsername({username})
        const animals = user.getAnimals();
        if(!animals) {
            throw new Error(`User with username ${username} has no animals!`)
        }
        return animals;
    }
    else {
        throw new Error("Animals list couldn't get retrieved because of no authorization")
    }
};

const getAnimalByName = async (name: string): Promise<Animal> => {
    const animal = await animalDb.getAnimalByName(name);
    return animal;
};

const addAnimal = async ({firstname, lastname, age} : AnimalInput, userid : number, username: string, role: Role): Promise<Animal> => {
    if (role === "admin") {
    
    const userExists = await userService.getUserById(userid, username, role);
    if (!userExists) {
          throw new Error(`User with id ${userid} does not exist.`);
        }
    const animal = new Animal({firstname, lastname, age})
    // const alreadyExistingAnimal = await getAnimalByName(animal.getFirstname());

    // if (alreadyExistingAnimal) {
    //     throw new Error(`Animal with name ${animal.getFirstname()} already exists!`);
    // }
    const addedAnimal = await animalDb.addAnimal(animal, userid);
    return addedAnimal;
    }
    else {
        throw new Error(`Couldn't create animal because user with username ${username} has no admin rights`)
    }
};

const getUserIdOfAnimalName = async (animalname: string) : Promise<number> => {
    const id = await animalDb.getUserIdOfAnimalName(animalname);
    if (id === null) {
        throw new Error(`Couldn't find id of animal because animal with name ${animalname} doesn't exist!`)
    }
    return id;
}

const deleteAnimal = async (animalname: string, username: string, role: Role) : Promise<Animal | null> => {
    if (role === "admin") {
    const animal = await getAnimalByName(animalname);
    if (!animal) {
        throw new Error(`No Animal found with name ${animalname}`);
    }
    const id = await getUserIdOfAnimalName(animalname);
    return animalDb.deleteAnimal(animal, id);
    }
    else {
        throw new Error(`Couldn't delete animal because user with username ${username} has no admin rights`)
    }
}

export default { getAllAnimals, getAnimalByName, addAnimal, deleteAnimal};
