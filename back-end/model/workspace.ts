import {
    Workspace as workspacePrisma,
    Profile as profilePrisma
} from "@prisma/client"
import { Profile } from "./Profile";

export class Workspace {
    private name: string;
    private profiles: Profile[]

    constructor(workspace: { name: string, profiles: Profile[] }) {
        this.name = this.validateName(workspace.name);
        this.profiles = workspace.profiles;
    }

    getName(): string {
        return this.name;
    }

    validateName(name: string): string {
        if (name.trim() === "") {
            throw new Error("Name cannot be empty!")
        }
        if (name === null) {
            throw new Error("Name cannot be null!")
        }
        return name;
    }

    static from({ name, profiles }: workspacePrisma & {profiles: profilePrisma[]}) {
        return new Workspace({
            name,
            profiles: profiles.map((profile) => Profile.from(profile)),

        });
    }
}