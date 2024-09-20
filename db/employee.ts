import db from "@/db";
import { cache } from "@/db/Cache";
import { EmployeeProfileResponse } from "@/types";
import { EmployeeProfile } from "@prisma/client";


export async function addEmployeeProfile(employeeProfile: any): Promise<EmployeeProfile> {
  const newEmployeeProfile = await db.employeeProfile.create({
    data: employeeProfile,
  });

  return newEmployeeProfile;
}

export async function updateEmployeeProfile(id: string, employeeProfile: any): Promise<EmployeeProfile> {
  const updatedEmployeeProfile = await db.employeeProfile.update({
    where: {
      id: id,
    },
    data: employeeProfile,
  });

  return updatedEmployeeProfile;
}

export async function deleteEmployeeProfile(id: string) : Promise<EmployeeProfile> {
  const deletedEmployeeProfile = await db.employeeProfile.delete({
    where: {
      id: id,
    },
  });

  return deletedEmployeeProfile;
}

export async function getAllEmployeeProfiles({ noCache = false } = {}) {
  if (noCache) {
    const employeeProfiles = await db.employeeProfile.findMany({
      orderBy: {
        id: "desc",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        team: true,
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
      team: true,
      user: true,
      Equipment: true,
    },
  });
  await cache.set("getAllEmployeeProfiles", [], employeeProfiles);

  return employeeProfiles;
}

export async function getEmployeeProfileById(id: string): Promise<EmployeeProfile> {
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

export async function getEmployeeProfileByUserId(userId: string): Promise<EmployeeProfileResponse> {
  const employeeProfile = await db.employeeProfile.findFirst({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      team: true,
      Equipment: true,
    },
  });
  if (!employeeProfile) {
    throw new Error("Employee profile not found");
  }
  return employeeProfile;
}
