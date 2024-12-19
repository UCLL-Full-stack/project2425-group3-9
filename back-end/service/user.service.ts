import { User } from '../model/User';
import { Wage } from '../model/Wage';
import userDb from '../repository/user.db';
import { WageInput } from '../types';

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
        const user =  await getUserById(id);
        const updatedWage = user.updateWage(newWage);
        return updatedWage; 
    } catch (error) {
        throw new Error("Error while updating wage of user");
    }
}

export default { getAllUsers, getUserById, updateWage };
