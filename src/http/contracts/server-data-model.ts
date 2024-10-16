export class ServerDataModel<TModel> {
  isSuccess: boolean = false;
  code: string = '';
  message: string = '';
  data: TModel | any = null;
}
