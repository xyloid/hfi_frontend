import recordService from "../services/record";

const recordReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_BY_ID":
      console.log("get by id");
      const ret = state.map((record) => {
        if (record.id == action.data.id) {
          return action.data;
        } else {
          return record;
        }
      });

      return ret.sort(function (x, y) {
        return x.timestamp - y.timestamp;
      });
    case "INIT_RECORDS":
      return action.data;
    default:
      return state;
  }
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
