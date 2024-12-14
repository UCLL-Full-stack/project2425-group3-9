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

    countAndSetTotal(): number {
        const total = this.amount + this.bonus;
        this.total = total;
        return this.total;
    }

    setAmount(amount: number) {
        if (amount < 0) throw new Error("Amount cannot be negative!");
        this.amount = amount;
    }
    
    setSeniority(seniority: number) {
        if (seniority < 0) throw new Error("Seniority cannot be negative!");
        this.seniority = seniority;
    }
    
    setBonus(bonus: number) {
        if (bonus < 0) throw new Error("Bonus cannot be negative!");
        this.bonus = bonus;
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
