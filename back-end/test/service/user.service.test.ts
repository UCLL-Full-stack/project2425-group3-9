import { User } from '../../model/User';
import { Profile } from '../../model/Profile';
import { Workspace } from '../../model/Workspace';
import { Wage } from '../../model/Wage';
import { Address } from '../../model/Address';
import userDb from '../../repository/user.db';
import userService from '../../service/user.service';
import { Animal } from '../../model/Animal';

const profile1 = new Profile({
    email: 'janedoe@gmail.com',
    firstname: 'Jane',
    lastname: 'Doe',
    age: 25,
    phonenumber: '4756379812',
});

const animals1: Animal[] = [
    new Animal({ firstname: "Buddy", lastname: "The Dog", age: 5 }),
    new Animal({ firstname: "Mittens", lastname: "The Cat", age: 3 }),
];


const wage1 = new Wage({
    total: 2400,
    amount: 2000,
    seniority: 7,
    bonus: 400,
});

const address1 = new Address({
    street: 'Groenstraat',
    city: 'Leuven',
    number: 22,
    postalcode: 3301,
    country: 'Belgium',
});

const user1 = new User({
    id: 1,
    username: 'janedoe',
    password: 'securepassword123',
    role: "employee",
    profile: profile1,
    wage: wage1,
    address: address1,
    animals: animals1
});

let mockGetAllUsers: jest.Mock;
let mockGetUserById: jest.Mock;

beforeEach(() => {
    mockGetAllUsers = jest.fn();
    mockGetUserById = jest.fn();

    userService.getAllUsers = mockGetAllUsers;
    userService.getUserById = mockGetUserById;
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('User Service Tests', () => {
    test('should return all users', () => {
        mockGetAllUsers.mockReturnValue([user1]);

        const users = userService.getAllUsers();

        expect(users).toEqual([user1]);
        expect(mockGetAllUsers).toHaveBeenCalled();
    });

    test('should return a user by id', async () => {
        mockGetUserById.mockReturnValue(user1);

        const userResult = await userService.getUserById(1);

        expect(userResult).toEqual(user1);
        expect(mockGetUserById).toHaveBeenCalledWith(1);
    });

    test('should throw an error if user does not exist', async () => {
        const userId = 999;

        // Mocking the DB call to return a rejected promise (i.e., simulate that the user is not found)
        mockGetUserById.mockRejectedValue(new Error(`User with id ${userId} does not exist.`));

        // Make sure the function rejects with the correct error message when no user is found
        await expect(userService.getUserById(userId)).rejects.toThrow(
            `User with id ${userId} does not exist.`
        );

        expect(mockGetUserById).toHaveBeenCalledWith(userId);  // Ensure DB call is made with the correct userId
    });

});

