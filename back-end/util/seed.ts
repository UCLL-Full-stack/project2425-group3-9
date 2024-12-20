import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  
  await prisma.profile.deleteMany();
  await prisma.wage.deleteMany();
  await prisma.animal.deleteMany();
  await prisma.address.deleteMany();
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

    const hashedPassword1 = await bcrypt.hash("John123", 12);

  const user1 = await prisma.user.create({
    data: {
      username: 'john_doe',
      password: hashedPassword1,
      role: "admin",
      address: {
        connect: { id: address1.id }
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
  const hashedPassword2 = await bcrypt.hash("Jane123", 12);

  const user2 = await prisma.user.create({
    data: {
      username: 'jane_doe',
      password: hashedPassword2,
      role: "employee",
      address: {
        connect: { id: address2.id }
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
