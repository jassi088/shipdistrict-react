export class ServerPageInput {
  pageNo: number = 1;
  pageSize: number = 10;
  query?: { [key: string]: any } = {};
  serverPaging?: boolean = true;
}
