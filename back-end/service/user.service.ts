import { user } from '../model/user';
import userDb from '../repository/user.db';

// const getAllUsers = async (): Promise<user[]> => userDb.getAllUsers();

const getAllUsers = (): user[] => {
    return userDb.getAllUsers();
};

const getUserById = async (id: number): Promise<user> => {
    const user = userDb.getUserById(id);
    if (!user) throw new Error(`User with id &{id} does not exist.`);
    return user;
};

export default { getAllUsers, getUserById };
