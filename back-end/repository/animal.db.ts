import { animal } from "../model/animal"
import { AnimalInput } from "../types"
import userDb from "./user.db"


const animal1 = new animal({
    firstname: "Shadow",
    lastname: "Breeze",
    age: 2
})

const animal2 = new animal({
    firstname: "Stormy",
    lastname: "Blaze",
    age: 3
})

const animal3 = new animal({
    firstname: "Silver",
    lastname: "Moon",
    age: 5
})

const animals = [
    animal1,
    animal2,
    animal3
]

const addAnimal = (newAnimal: AnimalInput) : animal => {
    const addedAnimal = new animal({
        firstname: newAnimal.firstname,
        lastname: newAnimal.lastname,
        age: newAnimal.age,
    })
    animals.push(addedAnimal);
    return addedAnimal;

    
}

const getAllAnimals = (): animal[] => {
    return animals;
};

const getAnimalByName = (name: string): animal | undefined => {
    return animals.find(
        (animal) =>
            animal.getFirstname().toLowerCase() === name.toLowerCase() ||
            animal.getLastname().toLowerCase() === name.toLowerCase()
    );
};

const deleteAnimal = (deletedAnimal: animal): animal | null => {
    const index = animals.findIndex(
        (animal) =>
            animal.getFirstname() === deletedAnimal.getFirstname() &&
            animal.getLastname() === deletedAnimal.getLastname() &&
            animal.getAge() === deletedAnimal.getAge()
    );
    if (index === -1) {
        return null;
    }

    const [removedAnimal] = animals.splice(index, 1);
    return removedAnimal;
};


const user1 = userDb.getUserById(1);
const user2 = userDb.getUserById(2);

user1?.addAnimal(animal1);
user1?.addAnimal(animal2);
user2?.addAnimal(animal3);



export default {
    getAllAnimals,
    getAnimalByName,
    addAnimal,
    deleteAnimal,

}
