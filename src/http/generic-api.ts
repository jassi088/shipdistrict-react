import { AxiosInstance, AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import instance from './api/instance';
import { ServerDataModel, ServerPageInput, ServerPageModel, IGetParams } from './contracts';

export const createGenericApi = <TModel, RModel>(key: string, axiosInstance: AxiosInstance = instance) => {
  const buildUrl = (input?: { id?: string; path?: string }): string => {
    let url = `${key}`;
    if (input) {
      if (input.path) url = `${url}/${input.path}`;
      if (input.id) url = `${url}/${input.id}`;
    }
    return url;
  };

  const getQueryParams = (input: ServerPageInput | null = null): any => {
    const params: any = {};
    if (input) {
      Object.keys(input).forEach((key) => {
        const value = (input as any)[key];
        if (key === 'query' && value) {
          Object.keys(value).forEach((queryKey) => {
            const queryValue = value[queryKey];
            if (queryValue) {
              params[queryKey] = queryValue;
            }
          });
        } else if (value) {
          params[key] = value;
        }
      });
    }
    return params;
  };

  const handleResponse = (response: AxiosResponse<any>): any => {
    if (!response.data.isSuccess) {
      throw new Error(response.data.error || response.data.message || response.data.code || 'failed');
    }
    if (response.data?.message) {
      toast.success(response.data?.message);
    }
    if (response.data?.items) {
      return response.data;
    }
    return response.data.data;
  };

  const handleError = (error: any): Promise<any> => {
    toast.error(error?.response?.data?.message || error?.response?.statusText || 'An unknown error occurred');
    if (error.response && error.response.status) {
      return Promise.reject<string>(error.response.statusText || 'Unknown error');
    }
    return Promise.reject<string>(error.message || 'Unknown error');
  };

  const create = async (model: TModel, path?: string): Promise<RModel> => {
    try {
      const url = buildUrl({ path });
      const response: AxiosResponse<ServerDataModel<RModel>> = await axiosInstance.post(url, model);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  };

  const simplePost = async (model: TModel): Promise<RModel> => {
    try {
      const url = buildUrl();
      const response: AxiosResponse<ServerDataModel<RModel>> = await axiosInstance.post(url, model);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  };

  const get = async (id: string): Promise<RModel> => {
    try {
      const url = buildUrl({ id });
      const response: AxiosResponse<ServerDataModel<RModel>> = await axiosInstance.get(url);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  };

  const simpleGet = async (input?: IGetParams): Promise<RModel> => {
    try {
      const url = buildUrl(input);
      const response: AxiosResponse<ServerDataModel<RModel>> = await axiosInstance.get(url, {
        params: getQueryParams(input?.serverPageInput),
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  };

  const search = async (input: ServerPageInput, path?: string): Promise<ServerPageModel<RModel>> => {
    try {
      const url = buildUrl({ path });
      const response: AxiosResponse<ServerPageModel<RModel>> = await axiosInstance.get(url, {
        params: getQueryParams(input),
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  };

  const update = async (id: string, model: TModel, path?: string): Promise<RModel> => {
    try {
      const url = buildUrl({ id, path });
      const response: AxiosResponse<ServerDataModel<RModel>> = await axiosInstance.put(url, model);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  };

  const remove = async (id: string): Promise<RModel> => {
    try {
      const url = buildUrl({ id });
      const response: AxiosResponse<ServerDataModel<RModel>> = await axiosInstance.delete(url);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  };

  const uploadImages = async (model: TModel, path?: string): Promise<RModel> => {
    try {
      const url = buildUrl({ path });
      const response: AxiosResponse<ServerDataModel<RModel>> = await axiosInstance.post(url, model, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  };

  const exportFile = async (path?: string, reportName: string = 'downloaded_file'): Promise<void> => {
    try {
      const url = buildUrl({ path });
      const response = await axiosInstance.get(url, {
        responseType: 'blob',
      });
      const blob = response.data;
      const objectUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = reportName;
      a.click();
      window.URL.revokeObjectURL(objectUrl);
    } catch (error) {
      return handleError(error);
    }
  };

  return {
    create,
    simplePost,
    get,
    simpleGet,
    search,
    update,
    remove,
    uploadImages,
    exportFile,
  };
};
