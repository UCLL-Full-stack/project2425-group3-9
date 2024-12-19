import { Animal } from "../model/Animal"
import { AnimalInput } from "../types"
import userDb from "./user.db"
import database from "../util/database"


const addAnimal = async (animal: Animal, userid : number): Promise<Animal> => {
    const addedAnimal = await database.animal.create({
        data: {
            firstname: animal.getFirstname(),
            lastname: animal.getLastname(),
            age: animal.getAge(),
            userId: userid,
        },
    });
    return Animal.from(addedAnimal);
};


const getAllAnimals = async (): Promise<Animal[]> => {
    const animals = await database.animal.findMany({
        include: {
            user: true,  
        },
    });
    return animals.map((animal) => Animal.from(animal));
};


const getAnimalByName = async (name: string): Promise<Animal> => {
    const animalData = await database.animal.findFirst({
        where: {
            firstname: name
        },
        include: {
            user: true,  
        },
    });
    if (!animalData) {
        throw new Error(`Animal with name ${name} does not exist.`);
    }

    return Animal.from(animalData);
};

const getUserIdOfAnimalName = async (animalname : string) : Promise<number | null> => {
    const animalData = await database.animal.findFirst({
        where: {
            firstname: animalname
        },
        include: {
            user: true,  
        },
    });
    if (!animalData) {
        return null
    }
    return animalData.userId;
}


const deleteAnimal = async (animal: Animal, userId: number): Promise<Animal | null> => {
    
    await database.animal.delete({
        where: { firstname: animal.getFirstname(), lastname: animal.getLastname(), age : animal.getAge(), userId : userId },
    });

    return animal;
};

export default {
    getAllAnimals,
    getAnimalByName,
    addAnimal,
    deleteAnimal,
    getUserIdOfAnimalName,
};
