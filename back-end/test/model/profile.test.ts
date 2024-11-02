import { profile } from '../../model/profile';

const testProfile = new profile({
    email: 'test@example.com',
    firstname: 'John',
    lastname: 'Doe',
    age: 30,
    phonenumber: '123-456-7890',
});

test('should create a profile with the provided properties', () => {
    expect(testProfile.getEmail()).toBe('test@example.com');
    expect(testProfile.getFirstname()).toBe('John');
    expect(testProfile.getLastname()).toBe('Doe');
    expect(testProfile.getAge()).toBe(30);
    expect(testProfile.getPhonenumber()).toBe('123-456-7890');
});

test('should return the correct email', () => {
    expect(testProfile.getEmail()).toBe('test@example.com');
});

test('should return the correct firstname', () => {
    expect(testProfile.getFirstname()).toBe('John');
});

test('should return the correct lastname', () => {
    expect(testProfile.getLastname()).toBe('Doe');
});

test('should return the correct age', () => {
    expect(testProfile.getAge()).toBe(30);
});

test('should return the correct phonenumber', () => {
    expect(testProfile.getPhonenumber()).toBe('123-456-7890');
});
