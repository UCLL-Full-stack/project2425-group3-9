import { User } from '../model/User';
import { Wage } from '../model/Wage';
import userDb from '../repository/user.db';
import { UserInput, WageInput, AuthenticationResponse, Role } from '../types';
import bcrypt from "bcrypt";
import database from '../util/database';
import { generateJwtToken } from '../util/jwt';

const getAllUsers = async (username: string, role: Role): Promise<User[]> => {
    if (role === "admin" || role === "caretaker" || role === "employee") {
    const users = await userDb.getAllUsers();
    return users;
    }
    else {
        throw new Error("You don't have acces to the users")
    }
};

const getUserById = async (id: number, usernmae: string, role: Role): Promise<User> => {
    if (role === "admin" || role === "caretaker" || role === "employee") {
    const user = await userDb.getUserById(id);
    if (!user) throw new Error(`User with id ${id} does not exist.`);
    return user;
    }
    else {
        throw new Error("You don't have acces to the users")
    }
};


export const updateWage = async (
    id: number,
    newWage: WageInput,
     usernmae: string, role: Role
): Promise<Wage> => {
    if (role === "admin") {
        const userWithWage = await database.user.findUnique({
            where: { id },
            include: { wage: true },
        });

        if (!userWithWage || !userWithWage.wage) {
            throw new Error("User has no wage assigned to update!");
        }

        const wage = Wage.from(userWithWage.wage);

        wage.setAmount(newWage.amount);
        wage.setSeniority(newWage.seniority);
        wage.setBonus(newWage.bonus);
        wage.countAndSetTotal();

        const updatedWage = await database.wage.update({
            where: { id: userWithWage.wage.id },
            data: {
                amount: wage.getAmount(),
                seniority: wage.getSeniority(),
                bonus: wage.getBonus(),
                total: wage.getTotal(),
            },
        });
        return Wage.from(updatedWage);

    }
    else {
        throw new Error("You can only update a users wage when you have admin rights!")
    }
};


const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await userDb.getUserByUsername({username});

    const isValidPassword = await bcrypt.compare(password, user.getPassword());

    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }
    return {
        token: generateJwtToken({ username, role: user.getRole() }),
        username: username,
    };
};

const createUser = async ({
    username,
    password,
    role,
}: UserInput): Promise<User> => {
    const existingUser = await userDb.existsUser({username});
    if (existingUser) {
        throw new Error(`User with username ${username} is already registered.`);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User ({username, password: hashedPassword, role, profile: null, wage: null, address: null, animals: []});
    return await userDb.createUser(user);
};


export default { 
    getAllUsers, 
    getUserById, 
    updateWage, 
    authenticate,
    createUser,
};

