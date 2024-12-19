import { User } from '../model/User';
import { Wage } from '../model/Wage';
import userDb from '../repository/user.db';
import { UserInput, WageInput } from '../types';
// import bcrypt from "bcrypt";

const getAllUsers = async (): Promise<User[]> => {
    const users = await userDb.getAllUsers();
    return users;
};

const getUserById = async (id: number): Promise<User> => {
    const user = await userDb.getUserById(id);
    if (!user) throw new Error(`User with id ${id} does not exist.`);
    return user;
};

const updateWage = async (id: number, newWage: WageInput ): Promise<Wage> => {
    try {
        const wage = new Wage({
            total: newWage.amount + newWage.bonus,
            amount: newWage.amount,
            seniority: newWage.seniority,
            bonus: newWage.bonus
        })
        const user =  await getUserById(id);
        const updatedWage = user.updateWage(newWage);
        return updatedWage; 
    } catch (error) {
        throw new Error("Error while updating wage of user");
    }
}

// const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
//     const user = await userDb.getUserByUsername({ username });

//     const isValidPassword = await bcrypt.compare(password, user.getPassword());

//     if (!isValidPassword) {
//         throw new Error('Incorrect password.');
//     }
//     return {
//         token: generateJwtToken({ username }),
//         username: username,
//     };
// };

export default { 
    getAllUsers, 
    getUserById, 
    updateWage, 
    // authenticate 
};

