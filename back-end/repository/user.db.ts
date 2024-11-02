import { profile } from '../model/profile';
import { user } from '../model/user';
import { wage } from '../model/wage';
import { workspace } from '../model/workspace';
import { address } from '../model/address';

const profile1 = new profile({
    email: 'johndoe@gmail.com',
    firstname: 'John',
    lastname: 'Doe',
    age: 30,
    phonenumber: '4758746990',
});

const profile2 = new profile({
    email: 'janedoe@gmail.com',
    firstname: 'Jane',
    lastname: 'Doe',
    age: 25,
    phonenumber: '4756379812',
});

const wage1 = new wage({
    total: 2300,
    amount: 2000,
    seniority: 5,
    bonus: 300,
});

const wage2 = new wage({
    total: 2400,
    amount: 2000,
    seniority: 7,
    bonus: 400,
});

const workspace1 = new workspace({
    name: 'Aperesort',
});

const workspace2 = new workspace({
    name: 'LionResort',
});

const address1 = new address({
    street: 'Geldenaaksevest 14',
    city: 'Leuven',
    state: 'Vlaams-Brabant',
    postalcode: 3301,
    country: 'Belgium',
});

const address2 = new address({
    street: 'groenstraat 20',
    city: 'Leuven',
    state: 'Vlaams-Brabant',
    postalcode: 3301,
    country: 'Belgium',
});

const users = [
    new user({
        id: 1,
        username: 'johndoe',
        password: 'securepassword123',
        admin: false,
        profile: profile1,
        workspace: workspace1,
        wage: wage1,
        address: address1,
    }),
    new user({
        id: 2,
        username: 'janedoe',
        password: 'wachtwoord123',
        admin: true,
        profile: profile2,
        workspace: workspace2,
        wage: wage2,
        address: address2,
    }),
];

const getAllUsers = (): user[] => {
    return users;
};

const getUserById = (id: number): user | undefined => {
    return users.find((user) => user.getId() === id);
};

export default {
    getAllUsers,
    getUserById,
};
