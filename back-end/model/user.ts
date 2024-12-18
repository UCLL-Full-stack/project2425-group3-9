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
    import { Workspace } from './Workspace';
    import { Wage } from './Wage';
    import { Animal } from './Animal';


    export class User {
        private id?: number;
        private username: string;
        private password: string;
        private admin: boolean;
        private profile: Profile;
        private address: Address;
        private workspace: Workspace;
        private wage: Wage;
        private animals: Animal[];

        constructor(user: {
            id?: number;
            username: string;
            password: string;
            admin: boolean;
            profile: Profile;
            workspace: Workspace;
            wage: Wage;
            address: Address;
            animals: Animal[]
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

        getProfile(): Profile {
            return this.profile;
        }

        getWorkspace(): Workspace {
            return this.workspace;
        }

        getWage(): Wage {
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

        getAddress(): Address {
            return this.address;
        }

        getAnimals(): Animal[] {
            return this.animals;
        }

        addAnimal(addedAnimal: Animal): Animal {
            this.animals.push(addedAnimal);
            return addedAnimal;
        } 

        static from({
            id,
            username,
            password,
            admin,
            profile,
            workspace,
            wage,
            address,
            animals
        }: usersPrisma & {
            profile: profilePrisma;
            workspace: workspacePrisma;
            address: addressPrisma;
            wage: wagePrisma;
            animals: animalsPrisma[];
        }) {
            return new User({
                id,
                username,
                password,
                admin,
                profile: Profile.from(profile), 
                workspace: Workspace.from(workspace), 
                wage: Wage.from(wage), 
                address: Address.from(address),
                animals: animals.map((animal) => Animal.from(animal)),
            });

        }
        
    }
