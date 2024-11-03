import { user } from '../../model/user';
import { profile } from '../../model/profile';
import { workspace } from '../../model/workspace';
import { wage } from '../../model/wage';
import { address } from '../../model/address';
import { animal } from '../../model/animal';

const testProfile = new profile({
    email: 'test@example.com',
    firstname: 'John',
    lastname: 'Doe',
    age: 30,
    phonenumber: '123-456-7890',
});

const testWorkspace = new workspace({
    name: 'Apenresort',
});

const testWage = new wage({
    total: 23000,
    amount: 2000,
    seniority: 5,
    bonus: 500,
});

const testAddress = new address({
    street: '456 Elm St',
    city: 'Othertown',
    state: 'NY',
    postalcode: 54321,
    country: 'USA',
});

const testUser = new user({
    id: 1,
    username: 'testuser',
    password: 'password123',
    admin: false,
    profile: testProfile,
    workspace: testWorkspace,
    wage: testWage,
    address: testAddress,
});

test('should create a user with the provided properties', () => {
    expect(testUser.getId()).toBe(1);
    expect(testUser.getUsername()).toBe('testuser');
    expect(testUser.getPassword()).toBe('password123');
    expect(testUser.isAdmin()).toBe(false);
    expect(testUser.getProfile()).toBe(testProfile);
    expect(testUser.getWorkspace()).toBe(testWorkspace);
    expect(testUser.getWage()).toBe(testWage);
    expect(testUser.getAddress()).toBe(testAddress);
});

test('should return undefined for id if not set', () => {
    const userWithoutId = new user({
        username: 'userWithoutId',
        password: 'password123',
        admin: false,
        profile: testProfile,
        workspace: testWorkspace,
        wage: testWage,
        address: testAddress,
    });
    expect(userWithoutId.getId()).toBeUndefined();
});

test('should indicate if a user is an admin', () => {
    const adminUser = new user({
        id: 2,
        username: 'adminuser',
        password: 'adminpass',
        admin: true,
        profile: testProfile,
        workspace: testWorkspace,
        wage: testWage,
        address: testAddress,
    });
    expect(adminUser.isAdmin()).toBe(true);
});

test('should not be an admin by default', () => {
    const regularUser = new user({
        username: 'regularuser',
        password: 'userpass',
        admin: false,
        profile: testProfile,
        workspace: testWorkspace,
        wage: testWage,
        address: testAddress,
    });
    expect(regularUser.isAdmin()).toBe(false);
});

test('should return the correct profile', () => {
    expect(testUser.getProfile()).toEqual(testProfile);
    expect(testUser.getProfile().getEmail()).toBe('test@example.com');
    expect(testUser.getProfile().getFirstname()).toBe('John');
    expect(testUser.getProfile().getLastname()).toBe('Doe');
    expect(testUser.getProfile().getAge()).toBe(30);
    expect(testUser.getProfile().getPhonenumber()).toBe('123-456-7890');
});

test('should return the correct workspace', () => {
    expect(testUser.getWorkspace()).toEqual(testWorkspace);
    expect(testUser.getWorkspace().getName()).toBe('Apenresort');
});

test('should return the correct wage', () => {
    expect(testUser.getWage()).toEqual(testWage);
    expect(testUser.getWage().getTotal()).toBe(23000);
    expect(testUser.getWage().getAmount()).toBe(2000);
    expect(testUser.getWage().getSeniority()).toBe(5);
    expect(testUser.getWage().getBonus()).toBe(500);
});

test('should return the correct address', () => {
    expect(testUser.getAddress()).toEqual(testAddress);
    expect(testUser.getAddress().getStreet()).toBe('456 Elm St');
    expect(testUser.getAddress().getCity()).toBe('Othertown');
    expect(testUser.getAddress().getState()).toBe('NY');
    expect(testUser.getAddress().getPostalcode()).toBe(54321);
    expect(testUser.getAddress().getCountry()).toBe('USA');
});

test('should add an animal and return it', () => {
    const addedAnimal = new animal({
        firstname: 'Buddy',
        lastname: 'Smith',
        age: 4,
    });

    const returnedAnimal = testUser.addAnimal(addedAnimal);

    expect(returnedAnimal).toBe(addedAnimal);
    expect(testUser.getAnimals()).toContain(addedAnimal);
    expect(testUser.getAnimals().length).toBe(1);
});

test('should add multiple animals', () => {
    const animal1 = new animal({
        firstname: 'Buddy',
        lastname: 'Smith',
        age: 4,
    });

    const animal2 = new animal({
        firstname: 'Max',
        lastname: 'Johnson',
        age: 2,
    });

    testUser.addAnimal(animal1);
    testUser.addAnimal(animal2);

    expect(testUser.getAnimals()).toContain(animal1);
    expect(testUser.getAnimals()).toContain(animal2);
    expect(testUser.getAnimals().length).toBe(2);
});
