import axios from "@lib/axios";
import toast from "react-hot-toast";
import { User } from "types/User";
import create from "zustand";

type UserStore = {
  user: User;
  setProfile: (user: User) => void;
  getProfile: () => void;
};

export const userStore = create<UserStore>((set) => ({
  user: {} as User,

  setProfile: async (user) => {
    set({ user });
  },

  getProfile: async () => {
    const token = localStorage.getItem("token")!;

    if (!token) {
      return;
    }

    try {
      const { user }: { user: User } = await axios.get("/user/profile");

      set({ user });
    } catch ({ error }: any) {
      localStorage.removeItem("token");

      toast.error(error as string);
    }
  },
}));
