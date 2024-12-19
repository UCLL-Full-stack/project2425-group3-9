import { User } from "../model/User";
import database from "../util/database";




const getUserById = async (id: number): Promise<User> => {
    const userPrisma = await database.user.findUnique({
        where: { id },
        include: {
            profile: true,
            wage: true,
            address: true,
            animals: true,
        },
    });
    if (userPrisma === null) {
        throw new Error(`No user found with id ${id}`);
    }
    return User.from(userPrisma);
};

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany({
            include: {
                profile: true,
                wage: true,
                address: true,
                animals: true
            },
        });
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        throw new Error('Database error trying to find all users.');
    }
};


export default {
    getAllUsers,
    getUserById,
};
