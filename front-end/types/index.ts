
export type address = {
    street: string;
    city: string;
    number: number;
    postalcode: number;
    country: string;
};


export type animal = {
    firstname: string;
    lastname: string;
    age: number;
};

export type profile = {
    email: string;
    firstname: string;
    lastname: string;
    age: number;
    phonenumber: string;
};


export type wage = {
    total: number;
    amount: number;
    seniority: number;
    bonus: number;
};


export type workspace = {
    name: string;
};

export type user = {
    id: number;
    username: string;
    password: string;
    admin: boolean;
    profile: profile;
    address: address;
    workspace: workspace;
    wage: wage;
    animals: animal[];
};
