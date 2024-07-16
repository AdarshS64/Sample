import { createAction, createReducer } from "@reduxjs/toolkit";
import EmpDetails from "../assets/constants";

const addEmployee = createAction("ADD_EMPLOYEES");
const filterEmployee = createAction("FILTER_EMPLOYEES");
const deleteEmployee = createAction("DELETE_EMPLOYEES");

const employeeReducer = createReducer(
  { employees: EmpDetails.details, status: "All" },
  (builder) => {
    builder.addCase(addEmployee, (state, action) => {
      console.log(action.payload);
      state.employees.push(action.payload);
    });

    builder.addCase(filterEmployee, (state, action) => {
      state.status = action.payload;
    });

    builder.addCase(deleteEmployee, (state, action) => {
      console.log(action.payload);
      state.employees = state.employees.filter(
        (employee) => employee.id !== action.payload
      );
    });
  }
);

export {
  employeeReducer as default,
  addEmployee,
  filterEmployee,
  deleteEmployee,
};
