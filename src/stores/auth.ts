import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { AuthModel, UserModel } from '@/types/auth';
import { resetStore } from './';

type State = {
  accessToken?: string;
  user?: UserModel;
  isAuthenticated: boolean;
  login: (model: AuthModel) => void;
  logout: () => void;
  update: (user: UserModel) => void;
  reset: () => void;
};

export const useAuthStore = create(
  devtools(
    persist(
      immer<State>((set) => ({
        accessToken: undefined,
        user: undefined,
        isAuthenticated: false,

        login: (model) =>
          set((state) => {
            state.accessToken = model.accessToken;
            state.user = model;
            state.isAuthenticated = true;
          }),
        logout: () =>
          set((state) => {
            state.user = undefined;
            state.accessToken = undefined;
            state.isAuthenticated = false;
            resetStore();
          }),
        update: (user) =>
          set((state) => {
            state.user = user;
          }),

        reset: () =>
          set((state) => {
            state.accessToken = undefined;
            state.user = undefined;
            state.isAuthenticated = false;
          }),
      })),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => localStorage),
      },
    ),
    { name: 'auth' },
  ),
);
