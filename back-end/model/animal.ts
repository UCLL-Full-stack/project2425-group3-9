import {  
    Animal as animalPrisma,
} from "@prisma/client"

export class Animal {
    private firstname: string;
    private lastname: string;
    private age: number;

    constructor(Animal: { firstname: string; lastname: string; age: number }) {
        this.firstname = this.validateFirstName(Animal.firstname);
        this.lastname = this.validateLastName(Animal.lastname);
        this.age = this.validateAge(Animal.age);
    }
    

    getFirstname(): string {
        return this.firstname;
    }

    getLastname(): string {
        return this.lastname;
    }

    getAge(): number {
        return this.age;
    }

    validateFirstName(name: string): string {
        if (name.trim() === "") {
            throw new Error("Firstname cannot be empty!")
        }
        if (name === null) {
            throw new Error("Firstname cannot be null!")
        }
        return name;
    }

    validateLastName(name: string): string {
        if (name.trim() === "") {
            throw new Error("Lastname cannot be empty!")
        }
        if (name === null) {
            throw new Error("Lastname cannot be null!")
        }
        return name;
    }

    validateAge (age: number) : number {
        if (age <= 0) {
            throw new Error("Age cannot be negative!")
        }
        return age;
    }


    static from({ firstname, lastname, age }: animalPrisma) {
        return new Animal({
            firstname,
            lastname,
            age
        });
    }
}
