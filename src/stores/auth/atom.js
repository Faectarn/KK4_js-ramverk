import { atom } from "recoil";

export const authState = atom({
  key: "authState",
  default: {
      token: null,
      userId: null,
  }
});

export const userState = atom({
    key: "userState",
    default: [],
});