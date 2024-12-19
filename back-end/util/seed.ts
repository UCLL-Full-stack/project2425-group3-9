import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  
  await prisma.wage.deleteMany();
  await prisma.workspace.deleteMany();
  await prisma.address.deleteMany();
  await prisma.animal.deleteMany();
  await prisma.user.deleteMany();

  
  const address1 = await prisma.address.create({
    data: {
      street: '123 Main St',
      city: 'New York',
      number: 2,
      postalcode: 10001,
      country: 'USA',
    },
  });

  
  const user1 = await prisma.user.create({
    data: {
      username: 'john_doe',
      password: 'hashed_password_1',
      role: "admin",
      address: {
        connect: { id: address1.id}
      },
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
                name: 'Workspace A', 
              },
            ],
          },
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

  const address2 = await prisma.address.create({
    data: {
      street: '123 Main St',
      city: 'NeYork',
      number: 1,
      postalcode: 98765,
      country: 'USA',
    },
  });
  
  const user2 = await prisma.user.create({
    data: {
      username: 'jane_doe',
      password: 'hashed_password_2',
      role: "admin",
      address: {
        connect: {id: address2.id}
      },
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
                name: 'Workspace B', 
              },
            ],
          },
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
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
