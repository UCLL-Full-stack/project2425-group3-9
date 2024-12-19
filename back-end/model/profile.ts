import { Profile as profilePrisma, 
} from "@prisma/client"

export class Profile {
    private email: string;
    private firstname: string;
    private lastname: string;
    private age: number;
    private phonenumber: string;

    constructor(Profile: {
        email: string;
        firstname: string;
        lastname: string;
        age: number;
        phonenumber: string;
    }) {
        this.email = this.validateEmail(Profile.email);
        this.firstname = this.validateFirstName(Profile.firstname);
        this.lastname = this.validateLastName(Profile.lastname);
        this.age = this.validateAge(Profile.age);
        this.phonenumber = this.validatePhoneNumber(Profile.phonenumber);
    }
    
    getEmail(): string {
        return this.email;
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

    getPhonenumber(): string {
        return this.phonenumber;
    }

    validateEmail(email: string): string {
        if (email.trim() === "") {
            throw new Error("Email cannot be empty!")
        }
        if (email === null) {
            throw new Error("Email cannot be null!")
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format!");
        }
        return email;
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

    validatePhoneNumber(name: string): string {
        if (name.trim() === "") {
            throw new Error("Phonenumber cannot be empty!")
        }
        if (name === null) {
            throw new Error("Phonenumber cannot be null!")
        }
        return name;
    }

    validateAge (age: number) : number {
        if (age <= 0) {
            throw new Error("Age cannot be negative!")
        }
        return age;
    }

    static from({ email, firstname, lastname, age, phonenumber }: profilePrisma)  {
        return new Profile({
            email,
            firstname,
            lastname,
            age, 
            phonenumber,
        });
    }
}