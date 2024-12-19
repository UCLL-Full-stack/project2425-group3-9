import { Address, Animal, Profile, Workspace } from "@prisma/client";
import { User } from "../model/User";
import database from "../util/database";
import { Wage } from "../model/Wage";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { UserInput } from "../types";
import { parseISOWithOptions } from "date-fns/fp";

const getUserById = async (id: number): Promise<User> => {
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
                workspace: true,
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

const getUserByUsername = async (username: string) : Promise<User> => {
    const userPrisma = await database.user.findUnique({
        where: { username },
        include: {
            profile: true,
            workspace: true,
            wage: true,
            address: true,
            animals: true,
        },
    });
    if (userPrisma === null) {
        throw new Error(`No user found with username ${username}`);
    }
    return User.from(userPrisma);
};

const generateJwtToken = ({ username }: { username: string }): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'courses_app' };
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT secret is not defined');
    }
    try {
        return jwt.sign({ username }, secret, options);
    } catch (error) {
        console.log(error);
        throw new Error('Error generating JWT token, see server log for details.');
    }
};


// const createUser = async (user: User): Promise<User> => {
//     try {
//         const userPrisma = await database.user.create({
//             data: { 
//                 username: user.getUsername(), 
//                 password: user.getPassword(), 
//                 admin: user.isAdmin(), 
//                 profile: undefined,
//                 workspace: undefined,
//                 address: undefined,
//                 wage: undefined, 
//                 animals: undefined,
//             },
//         });
//         return User.from(userPrisma);
//     } catch (error) {
//         console.error(error);
//         throw new Error("Database error. See server log for details.");
//     }
// };
// const createUser = async (user: User): Promise<User> => {
//     try {
//         const UserPrisma = await database.user.create({
//             data: {
//                 username: user.getUsername(),
//                 password: user.getPassword(),
//                 role: user.getRole(),
//             },
//         });
//         return User.from(UserPrisma);
//     } catch (error) {
//         console.error(error);
//         throw new Error('Database error. See server log for details.');
//     }
// };



export default {
    getAllUsers,
    getUserById,
    getUserByUsername,
    generateJwtToken,
    //createUser,
};
