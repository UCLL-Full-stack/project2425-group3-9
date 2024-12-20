import { Wage } from "../model/Wage";
import database from "../util/database";

const getAllWages = async (): Promise<Wage[]> => {
    try {
        const WagePrisma = await database.wage.findMany({
            
        });
        return WagePrisma.map((wage) => Wage.from(wage));
    } catch (error) {
        throw new Error('Database error trying to find all wages.');
    }
};

export default{
    getAllWages,
}
