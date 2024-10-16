import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type State = {
  open: boolean;
  record?: Record<string, unknown>;
  setOpen: (value: boolean, record?: Record<string, unknown>) => void;
  reset: () => void;
};

export const useAlertStore = create(
  devtools(
    immer<State>((set) => ({
      open: false,
      record: undefined,
      setOpen: (value, record) =>
        set((state) => {
          state.open = value;
          state.record = value ? record : undefined;
        }),

      reset: () =>
        set((state) => {
          state.open = false;
          state.record = undefined;
        }),
    })),
    { name: 'alert' },
  ),
);
