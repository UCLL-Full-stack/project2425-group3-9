import {  
    Animal as animalPrisma,
} from "@prisma/client"

export class Animal {
    private firstname: string;
    private lastname: string;
    private age: number;

    constructor(Animal: {firstname: string; lastname: string; age: number }) {
        this.firstname = Animal.firstname;
        this.lastname = Animal.lastname;
        this.age = Animal.age;
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
    static from({ firstname, lastname, age }: animalPrisma) {
        return new Animal({
            firstname,
            lastname,
            age
        });
    }
}
