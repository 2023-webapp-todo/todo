import { atom } from "recoil";

const userIdState = atom<string | null>({
  key: "userId",
  default: null,
});

export default userIdState;
