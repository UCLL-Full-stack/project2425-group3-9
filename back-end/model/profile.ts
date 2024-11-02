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
}
