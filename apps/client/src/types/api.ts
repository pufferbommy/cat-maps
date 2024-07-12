interface BaseResponse<T = void> {
  message?: string;
  data?: T;
}
