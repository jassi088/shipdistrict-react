import { ServerPageInput } from './page-input';
import { ServerPageModel } from './server-page-model';
import { IGetParams } from './get-params.interface';

export interface IApi<TModel, RModel> {
  create(model: TModel, path?: string, api?: string): Promise<RModel>;
  simplePost(model: TModel): Promise<RModel>;
  get(id: string): Promise<RModel>;
  simpleGet(input?: IGetParams): Promise<RModel>;
  search(input: ServerPageInput, apiPath?: string): Promise<ServerPageModel<RModel>>;
  update(id: any, model: TModel, path?: string, api?: string): Promise<RModel>;
  remove(id: string): Promise<RModel>;
  export(path?: string | undefined, reportName?: string | undefined): Promise<void>;
}
