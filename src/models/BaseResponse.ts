export class BaseResponse<T> {
  status!: number;
  message!: string;
  data!: T;
}
