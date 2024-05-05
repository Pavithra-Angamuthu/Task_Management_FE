import { Button, Drawer } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import AddTask from "./addTask";
import TaskConfigAPI from "../../Service/task";
import TableDetails from "../../Component/table";
import { headers } from "./const";
import PagePagination from "../../Component/pagination";
import DialogBox from "../../Component/dialog";
import SnackbarBox from "../../Component/snackbar";

function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const [taskList, setTaskList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [view, setView] = useState(false);
  const [snackbar, setSnackBar] = useState({});

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setSelectedTask({});
    setIsEdit(false);
    setView(false);
  };

  async function deleteTask() {
    await TaskConfigAPI.deleteTask({
      id: selectedTask._id,
      status: !selectedTask.status,
    })
      .then((res) => {
        setOpenDialog(false);
        getTaskList();
        setSelectedTask({});
        setSnackBar((prestate) => ({
          ...prestate,
          open: true,
          message: res.data.message,
          severity: res.data.status ? "success" : "error",
        }));
      })
      .catch((err) => {
        setOpenDialog(false);
        setSelectedTask({});
        setSnackBar((prestate) => ({
          ...prestate,
          open: true,
          message: err.response.data.message,
          severity: "error",
        }));
      });
  }

  async function getTaskList() {
    let payload = { limit: limit, skip: limit * (page - 1) };
    await TaskConfigAPI.getTaskList(payload)
      .then((res) => {
        setTaskList(res.data.data.data);
        setTotalCount(res.data.data.count);
      })
      .catch((err) => {
        setTaskList([]);
        setTotalCount(0);
      });
  }

  useEffect(() => {
    getTaskList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, limit, page]);

  return (
    <React.Fragment>
      <div className="bg-slate-50 text-left overflow-hidden gap-6">
        <div className="flex justify-between pb-5">
          <p className="text-2xl text-bold">Task</p>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              handleDrawerOpen();
            }}
          >
            <AddIcon />
            Add Task
          </Button>

          <Drawer
            sx={{
              width:
                windowWidth === 320
                  ? 320
                  : windowWidth < 320
                  ? windowWidth
                  : windowWidth < 700
                  ? 300
                  : windowWidth < 1000
                  ? 400
                  : 500,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width:
                  windowWidth === 320
                    ? 320
                    : windowWidth < 320
                    ? windowWidth
                    : windowWidth < 700
                    ? 300
                    : windowWidth < 1000
                    ? 400
                    : 500,
              },
            }}
            anchor={"right"}
            open={open}
            onClose={() => {
              handleDrawerClose();
            }}
          >
            <div className="p-5">
              <AddTask
                key="add task"
                title={isEdit ? "Edit" : view ? "View" : "Add"}
                close={handleDrawerClose}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                setSelectedTask={setSelectedTask}
                selectedTask={selectedTask}
                view={view}
                setView={setView}
                setSnackBar={setSnackBar}
              />
            </div>
          </Drawer>
        </div>
        {taskList.length > 0 ? (
          <div>
            <TableDetails
              headers={headers}
              rows={taskList}
              isEdit={true}
              isDelete={true}
              isView={true}
              edit={handleDrawerOpen}
              setSelectedTask={setSelectedTask}
              setIsEdit={setIsEdit}
              setOpenDialog={setOpenDialog}
              openDialog={openDialog}
              setView={setView}
              view={view}
            />
            <PagePagination
              totalPageCount={totalCount}
              limit={limit}
              page={page}
              setPage={setPage}
              setLimit={setLimit}
            />
          </div>
        ) : (
          <p className="flex justify-center pt-10">No Data Found</p>
        )}
      </div>
      <DialogBox
        open={openDialog}
        setOpen={setOpenDialog}
        delete={deleteTask}
        status={selectedTask.status}
      />
      {
        snackbar.open? <SnackbarBox snackbar={snackbar} setSnackBar={setSnackBar} /> :null
      }
     
    </React.Fragment>
  );
}

export default Dashboard;
