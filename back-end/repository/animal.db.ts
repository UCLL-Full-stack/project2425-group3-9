import { animal } from "../model/animal"
import { AnimalInput } from "../types"
import userDb from "./user.db"
import database from "../util/database"


const addAnimal = async (newAnimal: AnimalInput): Promise<animal> => {
    const addedAnimal = await database.animal.create({
        data: {
            firstname: newAnimal.firstname,
            lastname: newAnimal.lastname,
            age: newAnimal.age,
        },
    });
    return new animal(addedAnimal);
};


const getAllAnimals = async (): Promise<animal[]> => {
    const animals = await database.animal.findMany({
        include: {
            user: true,  
        },
    });
    return animals;
};


const getAnimalByName = async (name: string): Promise<animal | undefined> => {
    const animalData = await database.animal.findFirst({
        where: {
            OR: [
                { firstname: { equals: name, mode: 'insensitive' } },
                { lastname: { equals: name, mode: 'insensitive' } }
            ]
        },
        include: {
            user: true,  
        },
    });
    return animalData ? new animal(animalData) : undefined;
};


const deleteAnimal = async (deletedAnimal: animal): Promise<animal | null> => {
    const animalToDelete = await database.animal.findUnique({
        where: {
            firstName: deletedAnimal.getFirstname(), 
            lastName: deletedAnimal.getLastname(), 
            age: deletedAnimal.getAge(), 
        },
        include: {
            user: true,  
        },
    });

    if (!animalToDelete) {
        return null;
    }

    await database.animal.delete({
        where: { id: animalToDelete.id },
    });

    return new animal(animalToDelete);
};

export default {
    getAllAnimals,
    getAnimalByName,
    addAnimal,
    deleteAnimal,
};
