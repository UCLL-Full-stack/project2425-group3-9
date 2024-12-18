import { user } from '../model/User';
import { wage } from '../model/Wage';
import userDb from '../repository/user.db';
import { WageInput } from '../types';

// const getAllUsers = async (): Promise<user[]> => userDb.getAllUsers();

const getAllUsers = (): user[] => {
    return userDb.getAllUsers();
};

const getUserById = async (id: number): Promise<user> => {
    const user = userDb.getUserById(id);
    if (!user) throw new Error(`User with id &{id} does not exist.`);
    return user;
};

const updateWage = async (id: number, newWage: WageInput ): Promise<wage> => {
    try {
        const user =  await getUserById(id);
        const updatedWage = user.updateWage(newWage);
        return updatedWage; 
    } catch (error) {
        throw new Error("Error while updating wage of user");
    }
}

export default { getAllUsers, getUserById, updateWage };
