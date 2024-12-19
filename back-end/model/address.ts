import {  
    Address as addressPrisma,
} from "@prisma/client"

export class Address {
    private street: string;
    private city: string;
    private number: number;
    private postalcode: number;
    private country: string;

    constructor(Address: {
        street: string;
        city: string;
        number: number;
        postalcode: number;
        country: string;
    }) {
        this.street = this.validateStreet(Address.street);
        this.city = this.validateCity(Address.city);
        this.number = this.validateNumber(Address.number);
        this.postalcode = this.validatePostalCode(Address.postalcode);
        this.country = this.validateCountry(Address.country);
    }
    

    getStreet(): string {
        return this.street;
    }

    getCity(): string {
        return this.city;
    }

    getNumber(): number {
        return this.number;
    }

    getPostalcode(): number {
        return this.postalcode;
    }

    getCountry(): string {
        return this.country;
    }

    validateStreet(name: string): string {
        if (name.trim() === "") {
            throw new Error("Street cannot be empty!")
        }
        if (name === null) {
            throw new Error("Street cannot be null!")
        }
        return name;
    }

    validateCity(name: string): string {
        if (name.trim() === "") {
            throw new Error("City cannot be empty!")
        }
        if (name === null) {
            throw new Error("City cannot be null!")
        }
        return name;
    }

    validateCountry(name: string): string {
        if (name.trim() === "") {
            throw new Error("Country cannot be empty!")
        }
        if (name === null) {
            throw new Error("Country cannot be null!")
        }
        return name;
    }

    validateNumber (number: number) : number {
        if (number <= 0) {
            throw new Error("Number cannot be negative!")
        }
        return number;
    }

    validatePostalCode (postalCode: number) : number {
        if (postalCode <= 0) {
            throw new Error("PostalCode cannot be negative!")
        }
        return postalCode;
    }

    static from({ street, city, number, postalcode, country }: addressPrisma) {
        return new Address({
            street,
            city,
            number,
            postalcode, 
            country,
        });
    }
}
