import React from "react";

import { MenuItem, Pagination, Select } from "@mui/material";

function PagePagination(props) {
  const paginationTabCount = Math.ceil(props.totalPageCount / props.limit);

  return (
    <React.Fragment>
      <div className="flex justify-between pt-5">
        <Select
          id="department"
          size="small"
          placeholder="Department"
          value={props.limit}
          onChange={(e) => {
            props.setPage(1);
            props.setLimit(parseInt(e.target.value));
          }}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
        <Pagination
          value={props.page}
          count={paginationTabCount}
          variant="outlined"
          shape="rounded"
          onChange={(_, val) => {
            props.setPage(val);
          }}
        />
      </div>
    </React.Fragment>
  );
}

export default PagePagination;
