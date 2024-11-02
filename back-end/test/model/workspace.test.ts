import { workspace } from '../../model/workspace';

const testWorkspace = new workspace({
    name: 'Test Workspace',
});

test('should create a workspace with the provided name', () => {
    expect(testWorkspace.getName()).toBe('Test Workspace');
});

test('should return the correct name', () => {
    expect(testWorkspace.getName()).toBe('Test Workspace');
});
