import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.animal.deleteMany();
    await prisma.user.deleteMany();
  
  const workspace1 = await prisma.workspace.create({
    data: {
      name: 'Workspace A',
    },
  });

  const workspace2 = await prisma.workspace.create({
    data: {
      name: 'Workspace B',
    },
  });

  
  const wage1 = await prisma.wage.create({
    data: {
      total: 1000,
      amount: 800,
      seniority: 2,
      bonus: 200,
    },
  });

  const wage2 = await prisma.wage.create({
    data: {
      total: 1200,
      amount: 1000,
      seniority: 5,
      bonus: 200,
    },
  });

  
  const user1 = await prisma.user.create({
    data: {
      username: 'john_doe',
      password: 'hashed_password_1', 
      admin: true,
      profile: {
        create: {
          email: 'john@example.com',
          firstname: 'John',
          lastname: 'Doe',
          age: 30,
          phonenumber: '123-456-7890',
        },
      },
      address: {
        create: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          postalcode: 10001,
          country: 'USA',
        },
      },
      workspace: {
        connect: {
          id: workspace1.id, 
        },
      },
      wage: {
        connect: {
          id: wage1.id, 
        },
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'jane_doe',
      password: 'hashed_password_2', 
      admin: false,
      profile: {
        create: {
          email: 'jane@example.com',
          firstname: 'Jane',
          lastname: 'Doe',
          age: 28,
          phonenumber: '987-654-3210',
        },
      },
      address: {
        create: {
          street: '456 Elm St',
          city: 'San Francisco',
          state: 'CA',
          postalcode: 94105,
          country: 'USA',
        },
      },
      workspace: {
        connect: {
          id: workspace2.id, 
        },
      },
      wage: {
        connect: {
          id: wage2.id, 
        },
      },
    },
  });

  
  const animal1 = await prisma.animal.create({
    data: {
      firstname: 'Buddy',
      lastname: 'The Dog',
      age: 5,
      ownerId: user1.id, 
    },
  });

  const animal2 = await prisma.animal.create({
    data: {
      firstname: 'Mittens',
      lastname: 'The Cat',
      age: 3,
      ownerId: user2.id, 
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

