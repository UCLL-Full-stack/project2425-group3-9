import { Address } from '../../model/Address'; // Update with the actual path

const testAddress = new Address({
    street: '123 Main St',
    city: 'Anytown',
    number: 125,
    postalcode: 12345,
    country: 'USA',
});

test('should create an address with the provided properties', () => {
    expect(testAddress.getStreet()).toBe('123 Main St');
    expect(testAddress.getCity()).toBe('Anytown');
    expect(testAddress.getNumber()).toBe(125);
    expect(testAddress.getPostalcode()).toBe(12345);
    expect(testAddress.getCountry()).toBe('USA');
});

test('should return the correct street', () => {
    expect(testAddress.getStreet()).toBe('123 Main St');
});

test('should return the correct city', () => {
    expect(testAddress.getCity()).toBe('Anytown');
});

test('should return the correct state', () => {
    expect(testAddress.getNumber()).toBe(125);
});

test('should return the correct postal code', () => {
    expect(testAddress.getPostalcode()).toBe(12345);
});

test('should return the correct country', () => {
    expect(testAddress.getCountry()).toBe('USA');
});
