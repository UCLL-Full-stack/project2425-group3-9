import { User } from '../model/User';
import { Wage } from '../model/Wage';
import userDb from '../repository/user.db';
import { UserInput, WageInput } from '../types';
import bcrypt from "bcrypt";

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
interface AuthenticationResponse {
    token: string;
    username: string;
}
const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await userDb.getUserByUsername(username);

    const isValidPassword = await bcrypt.compare(password, user.getPassword());

    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }
    return {
        token: userDb.generateJwtToken({ username }),
        username: username,
    };
};

// const createUser = async ({
//     username,
//     password,
//     admin,
// }: UserInput): Promise<User> => {
//     const existingUser = await userDb.getUserByUsername(username);
//     if (existingUser) {
//         throw new Error(`User with username {{username) is already registered.`);
//     }
//     const hashedPassword = await bcrypt.hash(password, 12);
//     const user = new User ({username, password: hashedPassword, admin, profile: undefined, workspace: undefined, wage: undefined, address: undefined, animals: []});
//     return await userDb.createUser(user);
// };

// const createUser = async ({ username, password, role }: UserInput): Promise<User> => {
//     const existingUser = await userDb.getUserByUsername( username );

//     if (existingUser) {
//         throw new Error(`User with username ${username} is already registered.`);
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);
//     const user = new User({ username, password: hashedPassword, role });

//     const createdUser = await userDb.createUser(user);

//     console.log('Created User:', createdUser);

//     if (!createdUser.getId()) {
//         throw new Error('User creation failed, ID is missing.');
//     }

//     if (user.getRole() === 'caretaker') {
//         const caretaker = new Caretaker({
//             user,
//             name: username.replace(//g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
//             });
//         await userDb.createCaretaker(caretaker, createdUser);
//     } else if (user.getRole() === 'manager') {
//         const manager = new Manager({
//             user,
//             name: username.replace(//g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
//         });
//         await userDb.createManager(manager, createdUser);
//     } else {
//         throw new Error('Can only add user with role: "Caretaker" or "Manager"!');
//     }

//     return createdUser;
// };


export default { 
    getAllUsers, 
    getUserById, 
    updateWage, 
    authenticate,
    //createUser,
};

