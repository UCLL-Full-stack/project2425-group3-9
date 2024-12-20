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
                name: 'Innovation Hub',
              },
              {
                name: 'Tech Lab',
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
          {
            firstname: 'Fluffy',
            lastname: 'The Rabbit',
            age: 2,
          },
          {
            firstname: 'Tweety',
            lastname: 'The Bird',
            age: 1,
          },
          {
            firstname: 'Nibbles',
            lastname: 'The Hamster',
            age: 1,
          },
          {
            firstname: 'Shelly',
            lastname: 'The Turtle',
            age: 3,
          },
          {
            firstname: 'Charlie',
            lastname: 'The Parrot',
            age: 2,
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
                name: 'Creative Studio', 
              },
              {
                name: 'Marketing Office', 
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
          {
            firstname: 'Goldie',
            lastname: 'The Fish',
            age: 1,
          },
          {
            firstname: 'Rocky',
            lastname: 'The Guinea Pig',
            age: 2,
          },
          {
            firstname: 'Bubbles_Jane',  
            lastname: 'The Fish',
            age: 1,
          },
          {
            firstname: 'Max_Jane',  
            lastname: 'The Dog',
            age: 4,
          },
          {
            firstname: 'Oscar_Jane',  
            lastname: 'The Frog',
            age: 1,
          },
        ],
      },
    },
  });

  const user3 = await prisma.user.create({
    data: {
      username: 'Niels_Winant',
      password: hashedPassword2,
      role: "caretaker",
      address: {
        connect: { id: address2.id }
      },
      profile: {
        create: {
          email: 'niels@example.com',
          firstname: 'Niels',
          lastname: 'Winant',
          age: 18,
          phonenumber: '0456084335',
          workspaces: {
            create: [
              {
                name: 'Sales', 
              },
              {
                name: 'Dolphin aquarium',
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
            firstname: 'Rico',
            lastname: 'The Cat',
            age: 3,
          },
          {
            firstname: 'Spirou',
            lastname: 'The Dolphin',
            age: 1,
          },
          {
            firstname: 'Cisco',
            lastname: 'The Penguin',
            age: 2,
          },
          {
            firstname: 'Bubbles_Niels',  
            lastname: 'The Dolphin',
            age: 1,
          },
          {
            firstname: 'Max_Niels',  
            lastname: 'The Dolphin',
            age: 4,
          },
          {
            firstname: 'Oscar_Niels',  
            lastname: 'The Dolphin',
            age: 1,
          },
        ],
      },
    },
  });

  const user4 = await prisma.user.create({
    data: {
      username: 'Maarten_Geykens',
      password: hashedPassword2,
      role: "admin",
      address: {
        connect: { id: address2.id }
      },
      profile: {
        create: {
          email: 'Maarten_Geykens@example.com',
          firstname: 'Maarten',
          lastname: 'Geykens',
          age: 24,
          phonenumber: '0456084235',
          workspaces: {
            create: [
              {
                name: 'Marketing', 
              },
              {
                name: 'Shark aquarium',
              },
            ],
          },
        },
      },
      wage: {
        create: {
          total: 1100,
          amount: 800,
          seniority: 2,
          bonus: 300,
        },
      },
      animals: {
        create: [
          {
            firstname: 'Mishko',
            lastname: 'The Cat',
            age: 3,
          },
          {
            firstname: 'Martijn',
            lastname: 'The Shark',
            age: 1,
          },
          {
            firstname: 'Pieter',
            lastname: 'The Shark',
            age: 2,
          },
          {
            firstname: 'Bert',
            lastname: 'The Shark',
            age: 1,
          },
          {
            firstname: 'Maxim',
            lastname: 'The Shark',
            age: 4,
          },
          {
            firstname: 'Christian',
            lastname: 'The Shark',
            age: 1,
          },
        ],
      },
    },
  });

  const user5 = await prisma.user.create({
    data: {
      username: 'Julia_Roberts',
      password: hashedPassword2,
      role: "caretaker",
      address: {
        connect: { id: address2.id }
      },
      profile: {
        create: {
          email: 'Julia_Roberts@example.com',
          firstname: 'Julia',
          lastname: 'Roberts',
          age: 43,
          phonenumber: '0409084235',
          workspaces: {
            create: [
              {
                name: 'HR', 
              },
            ],
          },
        },
      },
      wage: {
        create: {
          total: 1400,
          amount: 1000,
          seniority: 6,
          bonus: 400,
        },
      },
      animals: {
        create: [
          {
            firstname: 'Miauwkes',
            lastname: 'The Cat',
            age: 3,
          },
          {
            firstname: 'Maarte',
            lastname: 'The Hond',
            age: 1,
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
