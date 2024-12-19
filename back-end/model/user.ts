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
        private profile?: Profile | null;
        private address?: Address | null;
        private workspace?: Workspace | null;
        private wage?: Wage | null;
        private animals: Animal[];
    
        constructor(user: {
            id?: number;
            username: string;
            password: string;
            admin: boolean;
            profile?: Profile | null;
            workspace?: Workspace | null;
            wage?: Wage | null;
            address?: Address | null;
            animals: Animal[];
        }) {
            this.id = user.id;
            this.username = this.validateUserName(user.username);
            this.password = user.password;
            this.admin = user.admin;
            this.profile = user.profile ?? null;
            this.workspace = user.workspace ?? null;
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

        isAdmin(): boolean {
            return this.admin;
        }

        getProfile(): Profile | undefined | null  {
            return this.profile;
        }

        getWorkspace(): Workspace | undefined | null   {
            return this.workspace;
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
            admin,
            profile,
            workspace,
            wage,
            address,
            animals
        }: usersPrisma & {
            profile: profilePrisma | null;
            workspace: workspacePrisma | null; 
            address: addressPrisma | null;
            wage: wagePrisma | null;
            animals: animalsPrisma[];
        }) {
            return new User({
                id,
                username,
                password,
                admin,
                profile: profile ? Profile.from(profile) : null,  
                workspace: workspace ? Workspace.from(workspace) : null, 
                wage: wage ? Wage.from(wage) : null,  
                address: address ? Address.from(address) : null, 
                animals: animals.map((animal) => Animal.from(animal)),
            });
        }
        

        
        
    }
