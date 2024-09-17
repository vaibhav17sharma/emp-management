import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a team
  const team = await prisma.team.create({
    data: {
      name: 'Engineering',
    },
  });

  // Create a user
  const user = await prisma.user.create({
    data: {
      name: 'Vaibhav Sharma',
      email: 'john.doe@example.com',
      password: 'securepassword', // Remember to hash passwords in a real application
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
      phoneNumber: '7618616236',
      teamId: team.id,
      userId: user.id,
    },
  });

  // Create an equipment item
  const equipment = await prisma.equipment.create({
    data: {
      name: 'Laptop',
      serialNumber: 'SN123456789',
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

  // Create a session
  await prisma.session.create({
    data: {
      sessionToken: 'unique-session-token',
      userId: user.id,
      expires: new Date(Date.now() + 3600 * 1000), // 1 hour expiry
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
