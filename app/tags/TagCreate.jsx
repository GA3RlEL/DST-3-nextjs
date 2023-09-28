"use client";

import { Box, FormControl, TextField } from "@mui/material";
import React from "react";
import { useTagsContext } from "../context/TagsContext";

export default function TagCreate() {
  const { sending, tagName, color, handleColor, handleTagName, handleCreate } =
    useTagsContext();

  return (
    <form onSubmit={handleCreate}>
      <Box>
        <FormControl className="flex gap-4 flex-row">
          <input
            type="color"
            className="self-center h-14"
            value={color}
            onChange={handleColor}
          />
          <TextField
            label="Tag name"
            value={tagName}
            onChange={handleTagName}
          />
          <button
            disabled={sending}
            className={` transition-all uppercase px-6 py-2 border-solid border-green-600 border-2 rounded-md hover:text-white hover:bg-green-600 ${
              sending && "border-gray-600 text-gray-600"
            }`}
          >
            {!sending && "Add"}
            {sending && "Sending"}
          </button>
        </FormControl>
      </Box>
    </form>
  );
}
