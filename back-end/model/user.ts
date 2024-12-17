    import { add } from 'date-fns';
    import { WageInput } from '../types';
    import { address } from './address';
    import { animal } from './animal';
    import { profile } from './profile';
    import { wage } from './wage';
    import { workspace } from './workspace';
    import { Profile as profilePrisma, 
        Address as addressPrisma,
        Workspace as workspacePrisma,
        Wage as wagePrisma,
        Animal as animalsPrisma,
        User as usersPrisma
    } from "@prisma/client"


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

        updateWage(newWage : WageInput ): wage {
            if (!this.wage) {
                throw new Error("User has no wage assigned to update!");
            }
            this.wage.setAmount(newWage.amount);
            this.wage.setSeniority(newWage.seniority);
            this.wage.setBonus(newWage.bonus);
            this.wage.countAndSetTotal();
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

        static from({
            id,
            username,
            password,
            admin,
            profile: profileData,
            workspace: workspaceData,
            wage: wageData,
            address: addressData,
            animals: animalData,
        }: usersPrisma & {
            profile: profilePrisma;
            workspace: workspacePrisma;
            address: addressPrisma;
            wage: wagePrisma;
            animals: animalsPrisma[];
        }) {
            return new user({
                id,
                username,
                password,
                admin,
                profile: profile.from(profileData), 
                workspace: workspace.from(workspaceData), 
                wage: wage.from(wageData), 
                address: address.from(addressData), 
            });
        }
        
    }
