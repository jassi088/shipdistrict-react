import { create } from 'zustand';
import { Draft } from 'immer';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { ServerPageModel } from '@/http/contracts';
import { PaginationProps } from '@/features/shared/pagination';

type GenericState<T> = {
  entities: T[];
  pageNo: number;
  pageSize: number;
  totalRecords: number;
  filters: Record<string, any>;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
  setEntities: (response: ServerPageModel<T>) => void;
  setFilters: (filters: Record<string, any>) => void;
  setPageNumber: (page: number) => void;
  setPageSize: (size: number) => void;
  pagination: () => PaginationProps;
  reset: () => void;
};

export const createEntityStore = <T>(entityName: string) =>
  create(
    devtools(
      immer<GenericState<T>>((set, get) => ({
        entities: [],
        pageNo: 1,
        pageSize: 10,
        totalRecords: 0,
        filters: {},
        isPrevDisabled: true,
        isNextDisabled: true,

        setEntities: (response) =>
          set((state) => {
            state.pageNo = response.pageNo;
            state.pageSize = response.pageSize;
            state.entities = response.items as Draft<T>[];
            state.totalRecords = response.total;
            state.isPrevDisabled = state.pageNo <= 1;
            state.isNextDisabled = state.pageNo >= Math.ceil(response.total / state.pageSize);
          }),

        setPageNumber: (page) =>
          set((state) => {
            const maxPages = Math.ceil(state.totalRecords / state.pageSize);
            if (page >= 1 && page <= maxPages) {
              state.pageNo = page;
              state.isPrevDisabled = page <= 1;
              state.isNextDisabled = page >= maxPages;
            }
          }),

        setPageSize: (size) =>
          set((state) => {
            state.pageSize = size;
            state.pageNo = 1;
            const maxPages = Math.ceil(state.totalRecords / state.pageSize);
            state.isPrevDisabled = state.pageNo <= 1;
            state.isNextDisabled = state.pageSize >= maxPages;
          }),

        setFilters: (filters) =>
          set((state) => {
            state.filters = filters;
          }),

        pagination: () => ({
          pageNo: get().pageNo,
          pageSize: get().pageSize,
          setPageNumber: get().setPageNumber,
          setPageSize: get().setPageSize,
          totalRecords: get().totalRecords,
          isNextDisabled: get().isNextDisabled,
          isPrevDisabled: get().isPrevDisabled,
        }),

        reset: () => {
          set({
            entities: [],
            pageNo: 1,
            pageSize: 10,
            totalRecords: 0,
            filters: {},
            isPrevDisabled: true,
            isNextDisabled: true,
          });
        },
      })),
      { name: entityName },
    ),
  );
