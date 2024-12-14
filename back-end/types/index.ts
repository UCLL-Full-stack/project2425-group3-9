type AddressInput = {
    street: string;
    city: string;
    state: string;
    postalCode: number;
    country: string;
};

type WageInput = {
    amount: number;
    seniority: number;
    bonus: number;
};

type ProfileInput = {
    email: string;
    firstname: string;
    lastname: string;
    age: number;
    phonenumber: string;
};

type UserInput = {
    id?: number;
    username: string;
    password: string;
    admin: boolean;
    profile: ProfileInput;
    workspace: WorkspaceInput;
    wage: WageInput;
    address: AddressInput;
};

type AnimalInput = {
    firstname: string;
    lastname: string;
    age: number;
};

type WorkspaceInput = {
    name: string;
};

export { AddressInput, WageInput, ProfileInput, UserInput, WorkspaceInput, AnimalInput };
