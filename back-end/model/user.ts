import { add } from 'date-fns';
import { WageInput } from '../types';
import { Profile as profilePrisma, 
    Address as addressPrisma,
    Workspace as workspacePrisma,
    Wage as wagePrisma,
    Animal as animalsPrisma,
    User as usersPrisma
} from "@prisma/client"
import { Profile } from './Profile';
import { Address } from './Address';
import { Wage } from './Wage';
import { Animal } from './Animal';
import { Role } from '../types'; 


export class User {
    readonly id?: number;
    readonly username: string;
    readonly password: string;
    readonly role: Role;
    readonly profile?: Profile | null;
    readonly address?: Address | null;
    readonly wage?: Wage | null;
    readonly animals: Animal[];

    constructor(user: {
        id?: number;
        username: string;
        password: string;
        role: Role;
        profile?: Profile | null;
        wage?: Wage | null;
        address?: Address | null;
        animals: Animal[];
    }) {
        this.id = user.id;
        this.username = this.validateUserName(user.username);
        this.password = user.password;
        this.role = user.role;
        this.profile = user.profile ?? null;
        this.wage = user.wage ?? null;
        this.address = user.address ?? null;
        this.animals = user.animals ?? [];
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

    getRole(): Role {
        return this.role;
    }

    getProfile(): Profile | undefined | null  {
        return this.profile;
    }

    getWage(): Wage | undefined | null  {
        return this.wage;
    }

    updateWage(newWage : WageInput ): Wage {
        if (!this.wage) {
            throw new Error("User has no wage assigned to update!");
        }
        this.wage.setAmount(newWage.amount);
        this.wage.setSeniority(newWage.seniority);
        this.wage.setBonus(newWage.bonus);
        this.wage.countAndSetTotal();
        return this.wage;
    }

    getAddress(): Address | undefined | null {
        return this.address;
    }

    getAnimals(): Animal[] | undefined | null {
        return this.animals;
    }

    addAnimal(addedAnimal: Animal): Animal {
        if (this.animals === undefined ) {
            throw new Error("this user class has no animal array")
        }
        this.animals.push(addedAnimal);
        return addedAnimal;
    } 

    validateUserName(name: string): string {
        if (name.trim() === "") {
            throw new Error("Username cannot be empty!")
        }
        if (name === null) {
            throw new Error("Userame cannot be null!")
        }
        return name;
    }

    static from({
        id,
        username,
        password,
        role,
        profile,
        wage,
        address,
        animals,
    }: usersPrisma & {
        profile: profilePrisma | null;
        address: addressPrisma | null;
        wage: wagePrisma | null;
        animals: animalsPrisma[];
    }): User {
        return new User({
            id,
            username,
            password,
            role: role as Role, 
            profile: profile ? Profile.from(profile) : null,
            wage: wage ? Wage.from(wage) : null,
            address: address ? Address.from(address) : null, 
            animals: Array.isArray(animals) ? animals.map(Animal.from) : [], 
        });
    }
}
