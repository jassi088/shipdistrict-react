import { useAlertStore } from './alert';
import { useAuthStore } from './auth';
import { useDialogStore } from './dialog';
import { useLoadingStore } from './loading';
import { useSidebarStore } from './sidebar';
import { createEntityStore } from './base/factories';
import { UserModel } from '@/types/auth';

const useCustomerListStore = createEntityStore<UserModel>('customers');
const useSubAdminListStore = createEntityStore<UserModel>('sub-admins');
const useShipmentsStore = createEntityStore<UserModel>('shipments');
const useShippingRequestsStore = createEntityStore<UserModel>('shipping-requests');
const useMailboxStore = createEntityStore<UserModel>('mailbox');

const resetStore = () => {
  useAlertStore.getState().reset?.();
  useAuthStore.getState().reset?.();
  useDialogStore.getState().reset?.();
  useLoadingStore.getState().reset?.();
  useSidebarStore.getState().reset?.();
  useCustomerListStore.getState().reset?.();
  useSubAdminListStore.getState().reset?.();
  useShipmentsStore.getState()?.reset?.();
  useShippingRequestsStore.getState()?.reset?.();
  useMailboxStore.getState()?.reset?.();
};

export {
  useAlertStore,
  useAuthStore,
  useDialogStore,
  useLoadingStore,
  useSidebarStore,
  useCustomerListStore,
  useSubAdminListStore,
  useShipmentsStore,
  useShippingRequestsStore,
  useMailboxStore,
  resetStore,
};
