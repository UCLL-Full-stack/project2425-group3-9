import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.wage.deleteMany();
    await prisma.workspace.deleteMany();
    await prisma.address.deleteMany();
    await prisma.animal.deleteMany();
    await prisma.user.deleteMany();
    

    // Maak de gebruiker met alle gerelateerde data
    const user1 = await prisma.user.create({
        data: {
            username: 'john_doe',
            password: 'hashed_password_1',
            profile: {
                create: {
                    email: 'john@example.com',
                    firstname: 'John',
                    lastname: 'Doe',
                    age: 30,
                    phonenumber: '123-456-7890',
                    workspaces: {
                        create: [
                            {
                                name: 'Workspace A', // Dit is een individueel werkruimte-object
                            },
                        ],
                    },
                },
            },
            address: {
                create: {
                    street: '123 Main St',
                    city: 'New York',
                    number: 2,
                    postalcode: 10001,
                    country: 'USA',
                },
            },
            wage: {
                create: {
                    total: 1000,
                    amount: 800,
                    seniority: 2,
                    bonus: 200,
                },
            },
            animals: {
                create: [
                    {
                        firstname: 'Buddy',
                        lastname: 'The Dog',
                        age: 5,
                    },
                ],
            },
        },
    });

    const user2 = await prisma.user.create({
        data: {
            username: 'jane_doe',
            password: 'hashed_password_2',
            profile: {
                create: {
                    email: 'jane@example.com',
                    firstname: 'Jane',
                    lastname: 'Doe',
                    age: 28,
                    phonenumber: '987-654-3210',
                    workspaces: {
                        create: [
                            {
                                name: 'Workspace B', // Dit is een individueel werkruimte-object
                            },
                        ],
                    },
                },
            },
            address: {
                create: {
                    street: '456 Elm St',
                    city: 'San Francisco',
                    number: 134,
                    postalcode: 94105,
                    country: 'USA',
                },
            },
            wage: {
                create: {
                    total: 1200,
                    amount: 1000,
                    seniority: 5,
                    bonus: 200,
                },
            },
            animals: {
                create: [
                    {
                        firstname: 'Mittens',
                        lastname: 'The Cat',
                        age: 3,
                    },
                ],
            },
        },
    });

    console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
