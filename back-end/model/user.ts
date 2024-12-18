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


    // export class User {
    //     private id?: number;
    //     private username: string;
    //     private password: string;
    //     private admin: boolean;
    //     private profile?: Profile  ;
    //     private address?: Address  ;
    //     private workspace?: Workspace ;
    //     private wage?: Wage ;
    //     private animals?: Animal[] ;

    //     constructor(user: {
    //         id?: number;
    //         username: string;
    //         password: string;
    //         admin: boolean;
    //         profile: Profile;
    //         workspace: Workspace;
    //         wage: Wage;
    //         address: Address;
    //         animals: Animal[]
    //     }) {
    //         this.id = user.id;
    //         this.username = user.username;
    //         this.password = user.password;
    //         this.admin = user.admin;
    //         this.profile = user.profile;
    //         this.workspace = user.workspace;
    //         this.wage = user.wage;
    //         this.address = user.address;
    //         this.animals = [];
    //     }

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
            profile?: Profile | null;  // Optioneel, kan null zijn
            workspace?: Workspace | null;  // Optioneel, kan null zijn
            wage?: Wage | null;  // Optioneel, kan null zijn
            address?: Address | null;  // Optioneel, kan null zijn
            animals: Animal[];
        }) {
            this.id = user.id;
            this.username = user.username;
            this.password = user.password;
            this.admin = user.admin;
            this.profile = user.profile ?? null; // Als er geen profiel is, maak het null
            this.workspace = user.workspace ?? null;
            this.wage = user.wage ?? null;
            this.address = user.address ?? null;
            this.animals = user.animals ?? []; // Zorg ervoor dat animals altijd een array is
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

        // static from({
        //     id,
        //     username,
        //     password,
        //     admin,
        //     profile,
        //     workspace,
        //     wage,
        //     address,
        //     animals
        // }: usersPrisma & {
        //     profile: profilePrisma;
        //     workspace: workspacePrisma;
        //     address: addressPrisma;
        //     wage: wagePrisma;
        //     animals: animalsPrisma[];
        // }) {
        //     return new User({
        //         id,
        //         username,
        //         password,
        //         admin,
        //         profile: Profile.from(profile), 
        //         workspace: Workspace.from(workspace), 
        //         wage: Wage.from(wage), 
        //         address: Address.from(address),
        //         animals: animals.map((animal) => Animal.from(animal)),
        //     });

        // }

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
            profile: profilePrisma | null;  // Het profiel kan null zijn
            workspace: workspacePrisma | null;  // Werkplek kan null zijn
            address: addressPrisma | null;  // Adres kan null zijn
            wage: wagePrisma | null;  // Loon kan null zijn
            animals: animalsPrisma[];
        }) {
            return new User({
                id,
                username,
                password,
                admin,
                profile: profile ? Profile.from(profile) : null,  // Profile kan null zijn
                workspace: workspace ? Workspace.from(workspace) : null,  // Werkplek kan null zijn
                wage: wage ? Wage.from(wage) : null,  // Loon kan null zijn
                address: address ? Address.from(address) : null,  // Adres kan null zijn
                animals: animals.map((animal) => Animal.from(animal)),
            });
        }
        

        
        
    }
