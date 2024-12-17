import {
    Workspace as workspacePrisma,
} from "@prisma/client"

export class workspace {
    private name: string;

    constructor(workspace: { name: string }) {
        this.name = workspace.name;
    }

    getName(): string {
        return this.name;
    }

    static from({ name }: workspacePrisma) {
        return new workspace({
            name
        });
    }
}