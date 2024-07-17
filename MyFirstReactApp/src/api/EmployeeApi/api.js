import apiWithTag from "../employeeApi";

export const EmployeeApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeList: builder.query({
      query: () => ({
        url: "/employees",
        method: "GET",
      }),
      providesTags: ["EMPLOYEE_LIST"],
    }),
    getEmployeeDetails: builder.query({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "GET",
      }),
    }),
    addEmployeeList: builder.mutation({
      query: (body) => ({
        url: "/employees",
        method: "POST",
        body,
      }),
    }),
    deleteEmployeeList: builder.mutation({
      query: ({ id }) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EMPLOYEE_LIST"],
    }),

    editEmployeeList: builder.mutation({
      query: ({ id, body }) => ({
        url: `/employees/${id}`,
        method: "PUT",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetEmployeeListQuery,
  useAddEmployeeListMutation,
  useGetEmployeeDetailsQuery,
  useDeleteEmployeeListMutation,
  useEditEmployeeListMutation,
} = EmployeeApi;
