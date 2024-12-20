import { UnauthorizedError } from "express-jwt";
import { Wage } from "../model/Wage";
import wageDb from '../repository/wage.db';
import userDb from "../repository/user.db";
import { Role } from "../types";



const getAllWages = async (username: string, role: Role): Promise<Wage[] | Wage> => {
    if (role == 'admin') {
        return wageDb.getAllWages();
    } else if (role == "employee") {
        const user = await userDb.getUserByUsername({username});
        
        if (!user) {
            throw new Error("User not found");
        }

        const wage = user.getWage();
        if (!wage) {
            throw new Error("You don't have a wage");
        }
        return wage;
    } else {
        throw new UnauthorizedError("credentials_required", 
            {message : "You are not authorized to acces this resource"}
        )
    };
};

export default{
    getAllWages,
}