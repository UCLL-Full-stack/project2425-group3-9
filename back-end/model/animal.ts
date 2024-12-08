export class animal {
    private firstname: string;
    private lastname: string;
    private age: number;

    constructor(animal: { firstname: string; lastname: string; age: number }) {
        this.firstname = animal.firstname;
        this.lastname = animal.lastname;
        this.age = animal.age;
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
}
