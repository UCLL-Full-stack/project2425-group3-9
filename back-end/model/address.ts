export class address {
    private street: string;
    private city: string;
    private state: string;
    private postalcode: number;
    private country: string;

    constructor(address: {
        street: string;
        city: string;
        state: string;
        postalcode: number;
        country: string;
    }) {
        this.street = address.street;
        this.city = address.city;
        this.state = address.state;
        this.postalcode = address.postalcode;
        this.country = address.country;
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
}
