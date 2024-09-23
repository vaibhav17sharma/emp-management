"use server";
import db from "@/db";
import { cache } from "@/db/Cache";
import { EmployeeProfileResponse } from "@/types";
import { EmployeeProfile } from "@prisma/client";
import bcrypt from "bcrypt";

export async function addEmployeeProfile(
  employeeProfile: any
): Promise<EmployeeProfile> {
  const {
    firstName,
    lastName,
    name,
    email,
    password,
    dateOfBirth,
    address,
    phoneNumber,
    teamId,
  } = employeeProfile;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const transaction = await db.$transaction(async (prisma) => {
      const newUser = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
        },
      });

      const newEmployeeProfile = await prisma.employeeProfile.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          dateOfBirth: dateOfBirth,
          address: address,
          phoneNumber: phoneNumber,
          userId: newUser.id,
          teams: {
            connect: {
              id: teamId,
            },
          },
        },
      });

      return { newUser, newEmployeeProfile };
    });
    return transaction.newEmployeeProfile;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function updateEmployeeProfile(
  id: string,
  employeeProfile: any
): Promise<EmployeeProfile> {
  const updatedEmployeeProfile = await db.employeeProfile.update({
    where: {
      id: id,
    },
    data: employeeProfile,
  });

  return updatedEmployeeProfile;
}

export async function deleteEmployeeProfile(
  id: string
): Promise<EmployeeProfile> {
  const deletedEmployeeProfile = await db.employeeProfile.delete({
    where: {
      id: id,
    },
  });

  return deletedEmployeeProfile;
}

export async function getAllEmployeeProfiles({ freshData = false } = {}) {
  if (freshData) {
    const employeeProfiles = await db.employeeProfile.findMany({
      orderBy: {
        id: "desc",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        teams: true,
        user: true,
        Equipment: true,
      },
    });
    await cache.set("getAllEmployeeProfiles", [], employeeProfiles);
    return employeeProfiles;
  }

  const cachedValue = await cache.get("getAllEmployeeProfiles", []);
  if (cachedValue) {
    return cachedValue;
  }

  const employeeProfiles = await db.employeeProfile.findMany({
    orderBy: {
      id: "desc",
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      teams: true,
      user: true,
      Equipment: true,
    },
  });
  await cache.set("getAllEmployeeProfiles", [], employeeProfiles);

  return employeeProfiles;
}

export async function getEmployeeProfileById(
  id: string
): Promise<EmployeeProfile> {
  const employeeProfile = await db.employeeProfile.findUnique({
    where: {
      id: id,
    },
  });
  if (!employeeProfile) {
    throw new Error("Employee profile not found");
  }
  return employeeProfile;
}

export async function getEmployeeProfileByUserId(
  userId: string
): Promise<EmployeeProfileResponse> {
  const employeeProfile = await db.employeeProfile.findFirst({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      teams: true,
      Equipment: true,
    },
  });
  if (!employeeProfile) {
    throw new Error("Employee profile not found");
  }
  return employeeProfile;
}
