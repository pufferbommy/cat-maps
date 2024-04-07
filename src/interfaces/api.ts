interface BaseResponse<T = void> {
  success: boolean;
  message: string;
  data?: T;
}
