import {
    Workspace as workspacePrisma,
} from "@prisma/client"

export class Workspace {
    private name: string;

    constructor(workspace: { name: string }) {
        this.name = this.validateName(workspace.name);
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

    static from({ name }: workspacePrisma) {
        return new Workspace({
            name
        });
    }
}