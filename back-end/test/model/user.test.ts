import { User } from '../../model/User';
import { Profile } from '../../model/Profile';
import { Workspace } from '../../model/Workspace';
import { Wage } from '../../model/Wage';
import { Address } from '../../model/Address';
import { Animal } from '../../model/Animal';

const testProfile = new Profile({
    email: 'test@example.com',
    firstname: 'John',
    lastname: 'Doe',
    age: 30,
    phonenumber: '123-456-7890',
});

const testWorkspace = new Workspace({
    name: 'Apenresort',
});

const testWage = new Wage({
    total: 23000,
    amount: 2000,
    seniority: 5,
    bonus: 500,
});

const testAddress = new Address({
    street: '456 Elm St',
    city: 'Othertown',
    number: 'NY',
    postalcode: 54321,
    country: 'USA',
});

const testUser = new User({
    id: 1,
    username: 'testuser',
    password: 'password123',
    admin: false,
    profile: testProfile,
    workspace: testWorkspace,
    wage: testWage,
    address: testAddress,
    animals: []
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
    const userWithoutId = new User({
        username: 'userWithoutId',
        password: 'password123',
        admin: false,
        profile: testProfile,
        workspace: testWorkspace,
        wage: testWage,
        address: testAddress,
        animals: []
    });
    expect(userWithoutId.getId()).toBeUndefined();
});

test('should indicate if a user is an admin', () => {
    const adminUser = new User({
        id: 2,
        username: 'adminuser',
        password: 'adminpass',
        admin: true,
        profile: testProfile,
        workspace: testWorkspace,
        wage: testWage,
        address: testAddress,
        animals: []
    });
    expect(adminUser.isAdmin()).toBe(true);
});

test('should not be an admin by default', () => {
    const regularUser = new User({
        username: 'regularuser',
        password: 'userpass',
        admin: false,
        profile: testProfile,
        workspace: testWorkspace,
        wage: testWage,
        address: testAddress,
        animals: []
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
    const addedAnimal = new Animal({
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
    const animal1 = new Animal({
        firstname: 'Buddy',
        lastname: 'Smith',
        age: 4,
    });

    const animal2 = new Animal({
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
