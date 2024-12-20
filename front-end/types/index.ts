
export type address = {
    street: string;
    city: string;
    state: string;
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
    id?: number;
    username?: string;
    password?: string;
    role?: string;
    profile?: profile;
    address?: address;
    wage?: wage;
    animals?: animal[];
};

export type StatusMessage = {
    message: string;
    type: "error" | "success";
};

export type LogInMessage = {
    message: string;
};
