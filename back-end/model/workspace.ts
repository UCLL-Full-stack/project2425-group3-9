export class workspace {
    private name: string;

    constructor(workspace: { name: string }) {
        this.name = workspace.name;
    }

    getName(): string {
        return this.name;
    }
}
