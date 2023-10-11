"use client";
import React, { useEffect } from "react";
import { useTagsContext } from "../context/TagsContext";

import DeleteIcon from "@mui/icons-material/Delete";

export default function TagsList() {
  const { getTags, tags, loading, error } = useTagsContext();

  const { takeItemToDelete } = useTagsContext();

  useEffect(() => {
    getTags();
  }, []);

  return (
    <ul>
      {loading && <span>Loading...</span>}
      {error && <span>{error}</span>}
      {!loading &&
        !error &&
        tags.map((tag) => (
          <li key={tag.id} className="flex  mb-4 justify-between">
            <div className="flex gap-4 items-center">
              <div
                className={`w-8 h-8 rounded-full`}
                style={{ backgroundColor: tag.color }}
              ></div>
              <span className="text-xl">{tag.name}</span>
            </div>
            <button
              onClick={() => {
                takeItemToDelete(tag.id, tag.name);
              }}
            >
              <DeleteIcon className="text-red-600" />
            </button>
          </li>
        ))}
    </ul>
  );
}
