import { Delete, Get, Patch, Post } from "../axios";
let BASE_URL_TASK = "task";

const TaskConfigAPI = {
  //Create Task
  createTask: async (payload) => {
    try {
      const res = await Post(`${BASE_URL_TASK}/`, payload);
      return res;
    } catch (error) {
      throw error;
    }
  },

  //Update Task
  updateTask: async (payload) => {
    try {
      const res = await Patch(`${BASE_URL_TASK}/?id=${payload._id}`, payload);
      return res;
    } catch (error) {
      throw error;
    }
  },

  //Get Task List
  getTaskList: async (payload) => {
    try {
      const res = await Get(
        `${BASE_URL_TASK}/?skip=${payload.skip}&limit=${payload.limit}`
      );
      return res;
    } catch (error) {
      throw error;
    }
  },

  //Delete Task
  deleteTask: async (payload) => {
    try {
      const res = await Delete(`${BASE_URL_TASK}/?id=${payload.id}&status=${payload.status}`);
      return res;
    } catch (error) {
      throw error;
    }
  },
};

export default TaskConfigAPI;
