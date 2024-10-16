import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type State = {
  expanded: boolean;
  expandedMenus: Record<number, boolean>;
  setExpanded: (value: boolean) => void;
  toggleExpanded: () => void;
  setExpandedMenus: (index: number) => void;
  reset: () => void;
};

export const useSidebarStore = create(
  devtools(
    immer<State>((set) => ({
      expanded: true,
      setExpanded: (value) =>
        set((state) => {
          state.expanded = value;
        }),
      toggleExpanded: () =>
        set((state) => {
          state.expanded = !state.expanded;
        }),

      expandedMenus: {},
      setExpandedMenus: (index) =>
        set((state) => {
          state.expandedMenus[index] = !state.expandedMenus[index];
        }),

      reset: () => {
        set({
          expanded: true,
          expandedMenus: {},
        });
      },
    })),
    { name: 'sidebar' },
  ),
);
