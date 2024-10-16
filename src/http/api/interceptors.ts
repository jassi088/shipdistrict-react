import { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { resetStore, useAuthStore, useLoadingStore } from '@/stores';

const onRequest = (request: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  request.headers['x-access-Token'] = useAuthStore.getState()?.accessToken;
  useLoadingStore.getState().setRequestLoading(true);
  return request;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  useLoadingStore.getState().setRequestLoading(false);
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  useLoadingStore.getState().setRequestLoading(false);
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  useLoadingStore.getState().setRequestLoading(false);

  if (error.response!.status === 403) {
    useAuthStore.getState().logout();
    resetStore();
  }

  if ((error.response?.data as any)?.message === 'Token Expired') {
    useAuthStore.getState().logout();
    resetStore();
  }

  return Promise.reject(error);
};

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
