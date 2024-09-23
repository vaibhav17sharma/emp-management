"use server";
import db from "@/db";
import { cache } from "./Cache";

export async function getTeamsDropdown() {
  const allTeams = await db.team.findMany({
    orderBy: {
      id: "desc",
    },
    select: {
      id: true,
      name: true,
    },
  });
  return allTeams;
}

export async function getAllTeams() {
  const cachedValue = await cache.get("getAllTeams", []);
  if (cachedValue) {
    return cachedValue;
  }

  const allTeams = await db.team.findMany({
    orderBy: {
      id: "desc",
    },
    select: {
      id: true,
      name: true,
      employees: true,
    },
  });
  await cache.set("getAllTeams", [], allTeams);

  return allTeams;
}
