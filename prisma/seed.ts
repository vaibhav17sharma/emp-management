import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a team
  const team = await prisma.team.create({
    data: {
      name: 'Novoinvent',
    },
  });

  // Create a user
  const user = await prisma.user.create({
    data: {
      name: 'Vaibhav Sharma',
      email: 'vaibhav@yopmail.com',
      password: '$2a$10$0nBVGOQB4kaCH/F9VMqfeuwih5A4gQKJic8xD3mkTCHiTxdw1J0J6',
      role: UserRole.EMPLOYEE,
    },
  });

  // Create an employee profile
  const employeeProfile = await prisma.employeeProfile.create({
    data: {
      firstName: 'Vaibhav',
      lastName: 'Sharma',
      dateOfBirth: new Date('2000-10-17'),
      address: '123 Main St',
      phoneNumber: 'xxxxxxxxxx',
      teams: {
        connect: {
          id: team.id,
        },
      },
      userId: user.id,
    },
  });

  // Create an equipment item
  const equipment = await prisma.equipment.create({
    data: {
      name: 'Latitude 3420',
      serviceTag: 'xxxxxxx',
      expressServiceCode: 'xxxxxxxxxxxx',
      manufacturer: 'Dell',
      configuration: 'i7 11th Gen, 16GB RAM, 500GB SSD, Windows 10',
      warrantyTill: new Date('2026-05-19'),
      price: 1000,
      issuedTo: {
        connect: {
          id: employeeProfile.id,
        },
      },
      issuedAt: new Date(),
    },
  });

  // Create an attendance record
  await prisma.attendance.create({
    data: {
      userId: user.id,
      date: new Date(),
      timeIn: new Date(),
    },
  });

  console.log('Seed data created');
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
