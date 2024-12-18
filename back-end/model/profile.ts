import { Profile as profilePrisma, 
    Address as addressPrisma,
    Workspace as workspacePrisma,
    Wage as wagePrisma,
    Animal as animalsPrisma,
    User as usersPrisma
} from "@prisma/client"

export class profile {
    private email: string;
    private firstname: string;
    private lastname: string;
    private age: number;
    private phonenumber: string;

    constructor(profile: {
        email: string;
        firstname: string;
        lastname: string;
        age: number;
        phonenumber: string;
    }) {
        this.email = profile.email;
        this.firstname = profile.firstname;
        this.lastname = profile.lastname;
        this.age = profile.age;
        this.phonenumber = profile.phonenumber;
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
        return new profile({
            email,
            firstname,
            lastname,
            age, 
            phonenumber,
        });
    }
}