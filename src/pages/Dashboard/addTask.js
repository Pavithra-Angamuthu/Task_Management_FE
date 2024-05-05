/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import {
  Button,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { activity, priority, taskStatus } from "./const";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TaskConfigAPI from "../../Service/task";
import CloseIcon from "@mui/icons-material/Close";

function AddTask(props) {
  const { title, isEdit, selectedTask, setIsEdit, view } = props;
  const [selectedDate, setSelectedDate] = useState(selectedTask?.timeline);

  const initialState = {
    title: "",
    description: "",
    priority: "",
    taskStatus: "",
    timeline: null,
    activity: "",
    createdBy: "",
    assignedTo: "",
  };

  const taskDetails = isEdit || view ? { ...selectedTask } : { ...initialState };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Task Title is required")
      .min(6, "Task Title must be at least 6 characters")
      .max(40, "Task Title cannot exceed 40 characters"),
    priority: Yup.string().required("Priority is required"),
    taskStatus: Yup.string().required("Task Status is required"),
    createdBy: Yup.string().required("Create by is required"),
    assignedTo: Yup.string().required("Assign to  is required"),
  });

  function reset() {
    props.close();
    setIsEdit(false);
    formik.setValues({ ...initialState });
    props.setSelectedTask({});
    props.setView(false);
    setSelectedDate(null);
  }

  const formik = useFormik({
    initialValues: {
      ...taskDetails,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        let response = {};
        let payload ={
            ...values,
            timeline: selectedDate,
        }
        if (isEdit) {
          response = await TaskConfigAPI.updateTask(payload);
        } else {
          response = await TaskConfigAPI.createTask(payload);
        }
        if (response.data.status) {
          props.setSnackBar((prestate) =>({
            ...prestate,
            open: true,
            message: response.data.message,
            severity: "success"
          }))
          reset();
        } else {
          props.setSnackBar((prestate) =>({
            ...prestate,
            open: true,
            message: response.data.message,
            severity: "error"
          }))
        }
      } catch (err) {
        props.setSnackBar((prestate) =>({
          ...prestate,
          open: true,
          message: err.response.data.message,
          severity:  "error"
      }))
    }
  }
  });

  const handleDateChange = (date) => {
    if(!view)
        setSelectedDate(date);
  };


  return (
    <React.Fragment>
      <div className="flex justify-between">
        <div className="font-bold">{title} Task</div>
        <CloseIcon className="cursor-pointer"
          onClick={() => {
            reset();
          }}
        />
      </div>

      <div className=" grid grid-cols-2 py-4 flex-wrap gap-6 ">
        <div className="flex flex-col justify-start">
          <p>
            Title<span className="text-red-500">*</span>
          </p>
          <TextField
            id="title"
            placeholder="Enter the Title"
            variant="outlined"
            size="small"
            value={formik?.values?.title}
            onChange={(e) => {
              formik.setFieldValue("title", e.target.value.replace(/\s+/g, ' ').trimStart());
            }}
            onBlur={formik.handleBlur}
            InputProps={{
                readOnly: view,
              }}
          />

          {formik.touched.title && formik.errors.title && (
            <p className="text-red-500 text-xs mt-1 flex justify-start text-left">
              {formik.errors.title?.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col justify-start">
          <p>
            Priority<span className="text-red-500">*</span>
          </p>
          <Select
            id="priority"
            size="small"
            placeholder="Priority"
            value={formik?.values?.priority || "select"}
            onChange={(e) => {
              formik.setFieldValue("priority", e.target.value);
            }}
            inputProps={{ readOnly: view }}
          >
            <MenuItem value="select" disabled>
              Select the Priority
            </MenuItem>
            {priority.map((data, index) => {
              return <MenuItem key={index} value={data}>{data}</MenuItem>;
            })}
          </Select>

          {formik.touched.priority && formik.errors.priority && (
            <p className="text-red-500 text-xs mt-1 flex justify-start text-left">
              {formik.errors.priority?.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col justify-start">
          <p>
            Task Status<span className="text-red-500">*</span>
          </p>
          <Select
            id="taskStatus"
            size="small"
            placeholder="Task Status"
            value={formik?.values?.taskStatus || "select"}
            onChange={(e) => {
              formik.setFieldValue("taskStatus", e.target.value);
            }}
            inputProps={{ readOnly: view }}
          >
            <MenuItem value="select" disabled>
              Select the Task Status
            </MenuItem>
            {taskStatus.map((items, index) => {
              return <MenuItem key={index} value={items}>{items}</MenuItem>;
            })}
          </Select>

          {formik.touched.taskStatus && formik.errors.taskStatus && (
            <p className="text-red-500 text-xs mt-1 flex justify-start text-left">
              {formik.errors.taskStatus?.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col justify-start">
          <p>
            Activity<span className="text-red-500">*</span>
          </p>
          <Select
            id="activity"
            size="small"
            placeholder="Activity"
            value={formik?.values?.activity || "select"}
            onChange={(e) => {
              formik.setFieldValue("activity", e.target.value);
            }}
            inputProps={{ readOnly: view }}
          >
            <MenuItem value="select" disabled>
              Select the Activity
            </MenuItem>
            {activity.map((items, index) => {
              return <MenuItem key={index} value={items}>{items}</MenuItem>;
            })}
          </Select>

          {formik.touched.activity && formik.errors.activity && (
            <p className="text-red-500 text-xs mt-1 flex justify-start text-left">
              {formik.errors.activity?.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col justify-start">
          <p>Timeline</p>

          <DatePicker
            selected={selectedDate}
            minDate={new Date()}
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy"
            placeholderText="Select the date"
            className="border h-10 rounded w-full border-gray-403 pl-3"
          />
        </div>

        <div className="flex flex-col justify-start">
          <p>Create By<span className="text-red-500">*</span></p>
          <TextField
            id="createdby"
            placeholder="Enter the Create by"
            variant="outlined"
            size="small"
            value={formik?.values?.createdBy}
            onChange={(e) => {
              formik.setFieldValue("createdBy", e.target.value.replace(/\s+/g, ' ').trimStart());
            }}
            onBlur={formik.handleBlur}
            InputProps={{
                readOnly: view,
              }}
          />

          {formik.touched.createdBy && formik.errors.createdBy && (
            <p className="text-red-500 text-xs mt-1 flex justify-start text-left">
              {formik.errors.createdBy?.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col justify-start">
          <p>Assgin To<span className="text-red-500">*</span></p>
          <TextField
            id="assignTo"
            placeholder="Enter the Assign To"
            variant="outlined"
            size="small"
            value={formik?.values?.assignedTo}
            onChange={(e) => {
              formik.setFieldValue("assignedTo", e.target.value.replace(/\s+/g, ' ').trimStart());
            }}
            onBlur={formik.handleBlur}
            InputProps={{
                readOnly: view,
              }}
          />

          {formik.touched.assignedTo && formik.errors.assignedTo && (
            <p className="text-red-500 text-xs mt-1 flex justify-start text-left">
              {formik.errors.assignedTo?.toString()}
            </p>
          )}
        </div>

        <div className="col-span-2">
          <p>Description</p>
          <TextField
            id="Description"
            placeholder="Enter the Description"
            variant="outlined"
            value={formik?.values?.description}
            multiline
            rows={4}
            className="w-full"
            onChange={(e) => {
              formik.setFieldValue("description", e.target.value.replace(/\s+/g, ' ').trimStart());
            }}
            onBlur={formik.handleBlur}
            InputProps={{
                readOnly: view,
              }}
          />

          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-xs mt-1 flex justify-start text-left">
              {formik.errors.description?.toString()}
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-5 justify-end">
        {
            !view?<Button
            variant="contained"
            className="flex bottom-0"
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            Save
          </Button>:<></>
        }
        
      </div>
    </React.Fragment>
  );
}

export default AddTask;
