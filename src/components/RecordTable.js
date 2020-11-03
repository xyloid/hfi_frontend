import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { fetchSingleRecord } from "../reducers/recordReducer";
import { useSelector, useDispatch } from "react-redux";

const RecordTable = () => {
  const dispatch = useDispatch();
  const records = useSelector((state) => state);

    // for expandable table
    const columns = [
        {
          dataField: "id",
          text: "ID",
        },
        {
          dataField: "name",
          text: "Name",
        },
        {
          dataField: "gender",
          text: "Gender",
        },
        {
          dataField: "age",
          text: "Age",
        },
        {
          dataField: "caseStatus",
          text: "Case Status",
        },
        {
          dataField: "plan",
          text: "Plan",
        },
      ];
    
      const expandRow = {
        renderer: (row) => {
          if (typeof row.statusHistory !== "undefined") {
          }
    
          const cols = [
            {
              dataField: "statusCode",
              text: "Status",
            },
            {
              dataField: "timestamp",
              text: "Time",
            },
          ];
    
          return (
            <div>
              {typeof row.statusHistory === "undefined" ? (
                <div></div>
              ) : (
                <div style={{backgroundColor:'#e7e8e1'}}>  
                  <BootstrapTable
                    keyField="_id"
                    data={row.statusHistory}
                    columns={cols}
                  ></BootstrapTable>
                </div>
              )}
            </div>
          );
        },
        onExpand: (row, isExpand, rowIndex, e) => {
          if (isExpand) {
            if (typeof row.statusHistory === "undefined") {
              dispatch(fetchSingleRecord(row.id));
            }
          }
        },
      };
    

  return (
    <div style={{backgroundColor:'#e6f1f5'}}>
      <BootstrapTable 
        keyField="id"
        data={records}
        columns={columns}
        expandRow={expandRow}
      ></BootstrapTable>
    </div>
  );
};

export default RecordTable;
