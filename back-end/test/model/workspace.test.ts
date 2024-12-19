import { Profile } from '../../model/Profile';
import { Workspace } from '../../model/Workspace';

const profile1 = new Profile({
    email: 'test@example.com',
    firstname: 'John',
    lastname: 'Doe',
    age: 30,
    phonenumber: '123-456-7890',
});

const testWorkspace = new Workspace({
    name: 'Test Workspace',
    profiles: [profile1],  
});

test('should create a workspace with the provided name', () => {
    expect(testWorkspace.getName()).toBe('Test Workspace');
});

test('should return the correct name', () => {
    expect(testWorkspace.getName()).toBe('Test Workspace');
});
