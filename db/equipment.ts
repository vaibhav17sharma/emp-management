import db from "@/db";
import { cache } from "./Cache";

export async function addEquipment(equipment: any) {
  const newEquipment = await db.equipment.create({
    data: equipment,
  });

  return newEquipment;
}

export async function updateEquipment(id: string, equipment: any) {
  const updatedEquipment = await db.equipment.update({
    where: {
      id: id,
    },
    data: equipment,
  });

  return updatedEquipment;
}

export async function deleteEquipment(id: string) {
  const deletedEquipment = await db.equipment.delete({
    where: {
      id: id,
    },
  });

  return deletedEquipment;
}

export async function getAllEquipments(noCache = false) {
  if (noCache) {
    const allEquipments = await db.equipment.findMany({
      orderBy: {
        id: "desc",
      },
    });
    await cache.set("getAllEquipments", [], allEquipments);
    return allEquipments;
  }

  const cachedValue = await cache.get("getAllEquipments", []);
  if (cachedValue) {
    return cachedValue;
  }

  const allEquipments = await db.employeeProfile.findMany({
    orderBy: {
      id: "desc",
    },
  });
  await cache.set("getAllEquipments", [], allEquipments);

  return allEquipments;
}

export async function getUnallotedEquipments(noCache = false) {
  if (noCache) {
    const unallocatedEquipments = await db.equipment.findMany({
      where: {
        employeeId: null,
      },
      orderBy: {
        id: "desc",
      },
    });
    await cache.set("getUnallotedEquipments", [], unallocatedEquipments);
    return unallocatedEquipments;
  }

  const cachedValue = await cache.get("getUnallotedEquipments", []);
  if (cachedValue) {
    return cachedValue;
  }

  const unallocatedEquipments = await db.employeeProfile.findMany({
    orderBy: {
      id: "desc",
    },
  });
  await cache.set("getUnallotedEquipments", [], unallocatedEquipments);

  return unallocatedEquipments;
}
