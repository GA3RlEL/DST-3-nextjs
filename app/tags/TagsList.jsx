"use client";
import React, { useEffect } from "react";
import { useTagsContext } from "../context/TagsContext";

export default function TagsList() {
  const { getTags, tags, loading, error } = useTagsContext();

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
          <li key={tag.id} className="flex gap-4 items-center mb-4">
            <div
              className={`w-8 h-8 rounded-full`}
              style={{ backgroundColor: tag.color }}
            ></div>
            <span className="text-xl">{tag.name}</span>
          </li>
        ))}
    </ul>
  );
}
