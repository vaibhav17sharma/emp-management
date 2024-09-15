import db from "../db";
import bcrypt from "bcrypt";

async function seedUsers() {
  try {
    await db.user.upsert({
      where: {
        id: "1",
      },
      create: {
        id: "1",
        email: "vaibhav@yopmail.com",
        name: "Vaibhav Sharma",
        password: await bcrypt.hash("Staging123$", 10),
      },
      update: {},
    });

  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedDatabase() {
    try {
      await seedUsers();
    } catch (error) {
      console.error('Error seeding database:', error);
      throw error;
    } finally {
      await db.$disconnect();
    }
  }
  
  seedDatabase().catch((error) => {
    console.error('An unexpected error occurred during seeding:', error);
    process.exit(1);
  });
