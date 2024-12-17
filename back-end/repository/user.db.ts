import { user } from "../model/user";
import database from "../util/database";


const getAllUsers = async (): Promise<user[]> => {
    const usersPrisma = await database.user.findMany({
        include: {
            profile: true,
            workspace: true,
            wage: true,
            address: true,
            animals: true,
        },
    });
    return usersPrisma.map((userPrisma) => user.from(userPrisma));
};

const getUserById = async (id: number) => {
    const userPrisma = await database.user.findUnique({
        where: { id },
        include: {
            profile: true,
            workspace: true,
            wage: true,
            address: true,
            animals: true,
        },
    });
    return userPrisma;
};

export default {
    getAllUsers,
    getUserById,
};
