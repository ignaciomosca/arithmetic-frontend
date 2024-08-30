import { AxiosError } from 'axios';
import type { ApiErrorResponse } from '@/types/ApiErrors';

export function isAxiosError(error: unknown): error is AxiosError<ApiErrorResponse> {
  return (error as AxiosError).isAxiosError === true;
}

export function getErrorDetail(error: AxiosError<ApiErrorResponse>): string | undefined {
  return error.response?.data.detail;
}