export class ServerPageModel<TModel> {
  isSuccess: boolean = false;
  pageNo: number = 1;
  pageSize: number = 0;
  total: number = 0;
  items: Array<TModel> = [];
}
