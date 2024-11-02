import { animal } from '../../model/animal';
const testAnimal = new animal({
    firstname: 'Bella',
    lastname: 'Smith',
    age: 5,
});

test('should create an animal with the provided properties', () => {
    expect(testAnimal.getFirstname()).toBe('Bella');
    expect(testAnimal.getLastname()).toBe('Smith');
    expect(testAnimal.getAge()).toBe(5);
});

test('should return the correct firstname', () => {
    expect(testAnimal.getFirstname()).toBe('Bella');
});

test('should return the correct lastname', () => {
    expect(testAnimal.getLastname()).toBe('Smith');
});

test('should return the correct age', () => {
    expect(testAnimal.getAge()).toBe(5);
});
