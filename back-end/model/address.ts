import {  
    Address as addressPrisma,
} from "@prisma/client"

export class Address {
    private street: string;
    private city: string;
    private state: string;
    private postalcode: number;
    private country: string;

    constructor(Address: {
        street: string;
        city: string;
        state: string;
        postalcode: number;
        country: string;
    }) {
        this.street = Address.street;
        this.city = Address.city;
        this.state = Address.state;
        this.postalcode = Address.postalcode;
        this.country = Address.country;
    }

    getStreet(): string {
        return this.street;
    }

    getCity(): string {
        return this.city;
    }

    getState(): string {
        return this.state;
    }

    getPostalcode(): number {
        return this.postalcode;
    }

    getCountry(): string {
        return this.country;
    }
    static from({ street, city, state, postalcode, country }: addressPrisma) {
        return new Address({
            street,
            city,
            state,
            postalcode, 
            country,
        });
    }
}
