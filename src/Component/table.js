import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { Visibility } from "@mui/icons-material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TableDetails(props) {
  let { headers, rows, isDelete, isEdit, isView } = props;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            {headers?.map((item, index) => {
              return <StyledTableCell key={"h-"+index}>{item}</StyledTableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, index) => (
            <StyledTableRow key={index} >
              <StyledTableCell component="th" scope="row">
                {row.title}
              </StyledTableCell>
              <StyledTableCell>{row.priority}</StyledTableCell>
              <StyledTableCell>{row.activity}</StyledTableCell>
              <StyledTableCell>{row.assignedTo}</StyledTableCell>
              <StyledTableCell>
                {row.timeline
                  ? new Date(row.timeline).toLocaleDateString()
                  : "-"}
              </StyledTableCell>
              <StyledTableCell>{row.taskStatus || "-"}</StyledTableCell>

              <StyledTableCell className="gap-10">
                {isView && (
                  <Visibility
                    className={`pr-1 pl-0.5 cursor-pointer `}
                    onClick={() => {
                      props.setSelectedTask(row);
                      props.edit();
                      props.setView(true);
                    }}
                  />
                )}
                {isEdit && (
                  <EditIcon
                    className={`pr-0.5 pl-0.5 ${
                      row.status ? "cursor-pointer" : "cursor-default"
                    } `}
                    onClick={() => {
                      if (row.status) {
                        props.setSelectedTask(row);
                        props.edit();
                        props.setIsEdit(true);
                      }
                    }}
                  />
                )}
                {isDelete &&
                  (row.status ? (
                    <DeleteIcon
                      className="pr-0.5 pl-1 cursor-pointer"
                      onClick={() => {
                        props.setOpenDialog(true);
                        props.setSelectedTask(row);
                      }}
                    />
                  ) : (
                    <RestoreFromTrashIcon
                      className="pr-0.5 pl-1 cursor-pointer"
                      onClick={() => {
                        props.setOpenDialog(true);
                        props.setSelectedTask(row);
                      }}
                    />
                  ))}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
