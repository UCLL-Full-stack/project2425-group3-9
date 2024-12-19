import { Address, Animal, Profile, Workspace } from "@prisma/client";
import { User } from "../model/User";
import database from "../util/database";
import { Wage } from "../model/Wage";
// import bcrypt from "bcrypt";

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

// const getUserByUsername = async (username: string) : Promise<User> => {
//     const userPrisma = await database.user.findUnique({
//         where: { username },
//         include: {
//             profile: true,
//             workspace: true,
//             wage: true,
//             address: true,
//             animals: true,
//         },
//     });
//     if (userPrisma === null) {
//         throw new Error(`No user found with username ${username}`);
//     }
//     return User.from(userPrisma);
// };

// const generateJwtToken = ({ username }): string => {
//     const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'courses_app' };

//     try {
//         return jwt.sign({ username }, process.env.JWT_SECRET, options);
//     } catch (error) {
//         console.log(error);
//         throw new Error('Error generating JWT token, see server log for details.');
//     }
// };

export default {
    getAllUsers,
    getUserById,
    // getUserByUsername,
    // generateJwtToken,
};
