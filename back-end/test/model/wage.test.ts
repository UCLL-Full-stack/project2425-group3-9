import { wage } from '../../model/wage';

const testWage = new wage({
    total: 5000,
    amount: 3000,
    seniority: 5,
    bonus: 200,
});

test('should create a wage with the provided properties', () => {
    expect(testWage.getTotal()).toBe(5000);
    expect(testWage.getAmount()).toBe(3000);
    expect(testWage.getSeniority()).toBe(5);
    expect(testWage.getBonus()).toBe(200);
});

test('should return the correct total', () => {
    expect(testWage.getTotal()).toBe(5000);
});

test('should return the correct amount', () => {
    expect(testWage.getAmount()).toBe(3000);
});

test('should return the correct seniority', () => {
    expect(testWage.getSeniority()).toBe(5);
});

test('should return the correct bonus', () => {
    expect(testWage.getBonus()).toBe(200);
});
