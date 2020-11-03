import recordService from "../services/record";

const recordReducer = (state = [], action) => {
  console.log(action.data);
  switch (action.type) {
    case "GET_ALL":
      console.log("GetAll");
      return action.data;
    case "GET_BY_ID":
      console.log("get by id");
      return [action.data];
    case "INIT_RECORDS":
        console.log("inside ");
        console.log(action.data)
      return action.data;
    default:
      return state;
  }
};

export const getAll = () => {
  return async (dispatch) => {
    const fetchRecords = await recordService.getAll();
    return dispatch({
      type: "GET_ALL",
      data: fetchRecords,
    });
  };
};

export const fetchSingleRecord = (id) => {
  return async (dispatch) => {
    const res = await recordService.fetchById(id);
    return dispatch({
      type: "GET_BY_ID",
      data: res,
    });
  };
};

export const initializeRecords = (records) => {
  return {
    type: "INIT_RECORDS",
    data: records,
  };
};

export default recordReducer;
