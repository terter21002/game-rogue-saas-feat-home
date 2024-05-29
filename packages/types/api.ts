import { z } from 'zod';

export const ZApiResponse = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.any().optional(),
});

export const ZApiResponsePaginated = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.array(z.any()).optional(),
  metadata: z.object({
    total: z.number(),
    page: z.number(),
    pageSize: z.number(),
    totalPages: z.number(),
  }),
});

export const ZApiRequestPaginated = z.object({
  page: z.number().optional(),
  pageSize: z.number().optional(),
});

export type TApiResponse<T> = Omit<z.infer<typeof ZApiResponse>, 'data'> & {
  data: T;
};

export type TApiResponsePaginated<T> = Omit<z.infer<typeof ZApiResponsePaginated>, 'data'> & {
  data: T[] | undefined;
};

export type TApiRequestPaginated = z.infer<typeof ZApiRequestPaginated>;
