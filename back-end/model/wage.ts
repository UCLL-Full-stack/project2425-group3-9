export class wage {
    private total: number;
    private amount: number;
    private seniority: number;
    private bonus: number;

    constructor(wage: { total: number; amount: number; seniority: number; bonus: number }) {
        this.total = wage.total;
        this.amount = wage.amount;
        this.seniority = wage.seniority;
        this.bonus = wage.bonus;
    }

    getTotal(): number {
        return this.total;
    }

    getAmount(): number {
        return this.amount;
    }

    getSeniority(): number {
        return this.seniority;
    }

    getBonus(): number {
        return this.bonus;
    }
}
