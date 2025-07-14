import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    getCourses: builder.query<{ courses: { id: number; name: string }[] }, void>({
      query: () => 'courses',
    }),
    uploadFile: builder.mutation<{ message: string }, FormData>({
      query: (formData) => ({
        url: 'upload',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useGetCoursesQuery, useUploadFileMutation } = apiSlice;
