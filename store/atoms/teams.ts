import { getTeamsDropdown } from "@/db/team";
import { atom, selector } from "recoil";

export type Team = {
  id: string;
  name: string;
};

const teamsSelector = selector({
  key: "teamsSelector",
  get: async () => {
    const response = await getTeamsDropdown();
    return response as Team[];
  },
});

export const teamsAtom = atom<Team[]>({
  key: "teamsAtom",
  default: teamsSelector,
});
