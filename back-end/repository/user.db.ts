import { Address, Animal, Profile, Workspace } from "@prisma/client";
import { User } from "../model/User";
import database from "../util/database";
import { Wage } from "../model/Wage";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { UserInput } from "../types";
import { parseISOWithOptions } from "date-fns/fp";
import { error } from "console";

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

const getUserByUsername = async ({username}: {username: string}) : Promise<User> => {
    const userPrisma = await database.user.findUnique({
        where: { username },
        include: {
            profile: true,
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


const createUser = async (user: User): Promise<User> => {
    try {
        const UserPrisma = await database.user.create({
            data: {
                username: user.getUsername(),
                password: user.getPassword(),
                role: user.getRole(),
            },
            include: {
                profile: true, 
                address: true,
                wage: true, 
                animals: true, 
            },
        });
        return User.from(UserPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllUsers,
    getUserById,
    getUserByUsername,
    createUser,
};
