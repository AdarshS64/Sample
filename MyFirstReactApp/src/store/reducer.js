const actionTypes = {
  ADD_EMPLOYEES: "ADD_EMPLOYEES",
  DELETE_EMPLOYEES: "DELETE_EMPLOYEES",
  EDIT_EMPLOYEES: "EDIT_EMPLOYEES",
  FILTER_EMPLOYEES: "FILTER_EMPLOYEES",
};

const reducer = (state, action) => {
  console.log(state, action.payload, "reducer");
  switch (action.type) {
    case actionTypes.ADD_EMPLOYEES:
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };
    case actionTypes.DELETE_EMPLOYEES:
      return {
        ...state,
        employees: state.employees.filter(
          (employees) => employees.id !== action.payload
        ),
      };
    case actionTypes.EDIT_EMPLOYEES:
      return {
        ...state,
        employees: state.employees.map((employee) =>
          employee.id == action.payload.id
            ? (employee = action.payload)
            : (employee = employee)
        ),
      };
    case actionTypes.FILTER_EMPLOYEES:
      console.log(state.employees, action.payload);
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
export { actionTypes };
