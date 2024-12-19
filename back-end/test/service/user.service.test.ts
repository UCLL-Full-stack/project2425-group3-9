import { User } from '../../model/User';
import { Profile } from '../../model/Profile';
import { Workspace } from '../../model/Workspace';
import { Wage } from '../../model/Wage';
import { Address } from '../../model/Address';
import userDb from '../../repository/user.db';
import userService from '../../service/user.service';

const profile1 = new Profile({
    email: 'janedoe@gmail.com',
    firstname: 'Jane',
    lastname: 'Doe',
    age: 25,
    phonenumber: '4756379812',
});

const workspace1 = new Workspace({
    name: 'LionResort',
});

const wage1 = new Wage({
    total: 2400,
    amount: 2000,
    seniority: 7,
    bonus: 400,
});

const address1 = new Address({
    street: 'Groenstraat 20',
    city: 'Leuven',
    state: 'Vlaams-Brabant',
    postalcode: 3301,
    country: 'Belgium',
});

const user1 = new User({
    id: 1,
    username: 'janedoe',
    password: 'securepassword123',
    admin: true,
    profile: profile1,
    workspace: workspace1,
    wage: wage1,
    address: address1,
});

let mockGetAllUsers: jest.Mock;
let mockGetUserById: jest.Mock;

beforeEach(() => {
    mockGetAllUsers = jest.fn();
    mockGetUserById = jest.fn();

    userDb.getAllUsers = mockGetAllUsers;
    userDb.getUserById = mockGetUserById;
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
        mockGetUserById.mockReturnValue(undefined);

        await expect(userService.getUserById(999)).rejects.toThrow(
            'User with id &{id} does not exist.'
        );
        expect(mockGetUserById).toHaveBeenCalledWith(999);
    });
});
