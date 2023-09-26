"use client";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useCreateContext } from "../context/CreateContext";

export default function CreateForm() {
  const {
    getTags,
    loading,
    error,
    tags,
    selectTag,
    title,
    details,
    date,
    handleDetails,
    handleTitle,
    handleTag,
    handleDate,
    handleCreate,
    sending,
  } = useCreateContext();

  useEffect(() => {
    getTags();
  }, [getTags]);

  return (
    <Box className="justify-self-center self-center  max-w-3xl w-full px-3 flex items-center justify-center">
      {loading && <p>Loading ...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <form onSubmit={handleCreate}>
          <FormControl className="grid grid-rows-[auto_auto_auto] gap-y-5">
            <div className="grid grid-cols-[1fr_3fr] gap-3">
              <InputLabel id="tag">Tag</InputLabel>
              <Select
                required
                value={selectTag}
                label="Tag"
                onChange={handleTag}
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
                value={title}
                onChange={handleTitle}
              />
            </div>
            <TextField
              label="Details"
              value={details}
              onChange={handleDetails}
              multiline
              rows={4}
              required
            />
            <div className="flex justify-between gap-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD/MM/YYYY"
                  disablePast
                  required
                  label="Date"
                  value={date}
                  onChange={handleDate}
                />
              </LocalizationProvider>
              <button
                disabled={sending}
                className={` transition-all uppercase px-6 py-2 border-solid border-green-600 border-2 rounded-md hover:text-white hover:bg-green-600 ${
                  sending && "border-gray-600 text-gray-600"
                }`}
              >
                {!sending && "Add"}
                {sending && "Sending"}
              </button>
            </div>
          </FormControl>
        </form>
      )}
    </Box>
  );
}
