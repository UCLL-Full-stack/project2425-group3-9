import {  
    Wage as wagePrisma,
} from "@prisma/client"
import { WageInput } from "../types";

export class Wage {
    private total: number;
    private amount: number;
    private seniority: number;
    private bonus: number;

    constructor(wage: { total: number; amount: number; seniority: number; bonus: number }) {
        this.total = this.validateTotal(wage.total);
        this.amount = this.validateAmount(wage.amount);
        this.seniority = this.validateSeniority(wage.seniority);
        this.bonus = this.validateBonus(wage.bonus);
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

    validateTotal (number: number) : number {
        if (number < 0) {
            throw new Error("Total cannot be negative!")
        }
        return number;
    }

    validateAmount (number: number) : number {
        if (number < 0) {
            throw new Error("Amount cannot be negative!")
        }
        return number;
    }

    validateSeniority (number: number) : number {
        if (number < 0) {
            throw new Error("Seniority cannot be negative!")
        }
        return number;
    }

    validateBonus (number: number) : number {
        if (number < 0) {
            throw new Error("Bonus cannot be negative!")
        }
        return number;
    }
    

    static from({ total, amount, seniority, bonus }: wagePrisma) {
        return new Wage({
            total,
            amount,
            seniority,
            bonus,
        });
    }
}
