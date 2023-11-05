"use client";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useEffect } from "react";
import { useCreateContext } from "../context/CreateContext";
import { useTask } from "../context/TaskContext";

export default function EditTaskForm() {
  const { getTags, loading, error, tags } = useCreateContext();

  const { isEditElement } = useTask();

  const {
    editTagContent,
    editTitleContent,
    updateTitleContent,
    updateTagContent,
    updateBodyContent,
    editBodyContent,
    updateDateContent,
    editDateContent,
    sending,
    updateTask,
    handleEditTagContent,
  } = useTask();

  useEffect(() => {
    getTags();
  }, []);

  function checkIsTag() {
    if (!editTagContent) return "";
    const tagsTable = tags.map((el) => el.name);
    const include = tagsTable.includes(editTagContent);
    if (include) return editTagContent;
    if (!include) {
      handleEditTagContent("");
      return editTagContent;
    }
  }

  return (
    <Box
      className={`z-50 w-full py-4 flex items-center justify-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
        isEditElement ? "visible opacity-100" : "invisible opacity-5"
      }`}
    >
      {loading && <p>Loading ...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <form onSubmit={updateTask} className="bg-white p-8 rounded-md">
          <FormControl className="grid grid-rows-[auto_auto_auto] gap-y-5">
            <div className="grid grid-cols-[1fr_3fr] gap-3">
              <InputLabel id="tag">Tag</InputLabel>
              <Select
                required
                value={checkIsTag()}
                label="Tag"
                onChange={updateTagContent}
              >
                {tags.map((tag) => (
                  <MenuItem key={tag.id} value={tag.name}>
                    {tag.name}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                required
                label="Title"
                value={editTitleContent}
                onChange={updateTitleContent}
              />
            </div>
            <TextField
              label="Details"
              value={editBodyContent}
              onChange={updateBodyContent}
              multiline
              rows={4}
            />
            <div className="flex justify-between gap-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD/MM/YYYY"
                  disablePast
                  required
                  label="Date"
                  value={editDateContent}
                  onChange={updateDateContent}
                />
              </LocalizationProvider>
              <button
                disabled={sending}
                className={` transition-all uppercase px-6 py-2 border-solid border-green-600 border-2 rounded-md hover:text-white hover:bg-green-600                ${
                  sending && "border-gray-600 text-gray-600"
                } `}
              >
                {!sending && "Update"}
                {sending && "Updating"}
              </button>
            </div>
          </FormControl>
        </form>
      )}
    </Box>
  );
}
