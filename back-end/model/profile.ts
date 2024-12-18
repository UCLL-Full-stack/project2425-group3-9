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
        this.email = Profile.email;
        this.firstname = Profile.firstname;
        this.lastname = Profile.lastname;
        this.age = Profile.age;
        this.phonenumber = Profile.phonenumber;
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