import { Animal } from "../model/Animal"
import { AnimalInput } from "../types"
import userDb from "./user.db"
import database from "../util/database"


const addAnimal = async (newAnimal: AnimalInput, userid : number): Promise<Animal> => {
    const addedAnimal = await database.animal.create({
        data: {
            firstname: newAnimal.firstname,
            lastname: newAnimal.lastname,
            age: newAnimal.age,
            userId: userid,
        },
    });
    return new Animal(addedAnimal);
};


const getAllAnimals = async (): Promise<Animal[]> => {
    const animals = await database.animal.findMany({
        include: {
            user: true,  
        },
    });
    return animals.map((animal) => Animal.from(animal));
};


const getAnimalByName = async (name: string): Promise<Animal | undefined> => {
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
    return animalData ? new Animal(animalData) : undefined;
};


const deleteAnimal = async (animalFirstName: string): Promise<Animal | null> => {
    const animalToDelete = await database.animal.findUnique({
        where: {
            firstname: animalFirstName
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

    return new Animal(animalToDelete);
};

export default {
    getAllAnimals,
    getAnimalByName,
    addAnimal,
    deleteAnimal,
};
