"use client";

import { useState } from "react";

export default function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="searchRow">
        <input
          className="searchInput"
          type="text"
          placeholder="Search by movie title..."
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <button className="button" type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </form>
  );
}
