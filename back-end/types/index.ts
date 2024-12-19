type Role = "admin" | "caretaker" | "employee";

type AuthenticationResponse = {
    token: string;
    username: string;
}

type AddressInput = {
    street: string;
    city: string;
    number: number;
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
    role: Role;
    profile: ProfileInput;
    workspace: WorkspaceInput;
    wage: WageInput;
    address: AddressInput;
    animals: AnimalInput[];
};

type AnimalInput = {
    firstname: string;
    lastname: string;
    age: number;
};

type WorkspaceInput = {
    name: string;
};

export { AddressInput, WageInput, ProfileInput, UserInput, WorkspaceInput, AnimalInput, Role, AuthenticationResponse };
