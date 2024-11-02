import { address } from './address';
import { animal } from './animal';
import { profile } from './profile';
import { wage } from './wage';
import { workspace } from './workspace';

export class user {
    private id?: number;
    private username: string;
    private password: string;
    private admin: boolean;
    private profile: profile;
    private address: address;
    private workspace: workspace;
    private wage: wage;
    private animals: animal[];

    constructor(user: {
        id?: number;
        username: string;
        password: string;
        admin: boolean;
        profile: profile;
        workspace: workspace;
        wage: wage;
        address: address;
    }) {
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.admin = user.admin;
        this.profile = user.profile;
        this.workspace = user.workspace;
        this.wage = user.wage;
        this.address = user.address;
        this.animals = [];
    }

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getPassword(): string {
        return this.password;
    }

    isAdmin(): boolean {
        return this.admin;
    }

    getProfile(): profile {
        return this.profile;
    }

    getWorkspace(): workspace {
        return this.workspace;
    }

    getWage(): wage {
        return this.wage;
    }

    getAddress(): address {
        return this.address;
    }

    getAnimals(): animal[] {
        return this.animals;
    }

    addAnimal(addedAnimal: animal): animal {
        this.animals.push(addedAnimal);
        return addedAnimal;
    }
}
