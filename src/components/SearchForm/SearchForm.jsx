import React, { useState } from 'react';

const SearchForm = ({ onSearchKeyword }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchKeyword(value);
  };

  const handleChange = (e) => setValue(e.target.value);

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        name="keyword"
        placeholder="지역을 입력하세요"
        value={value}
        onChange={handleChange}
        className="mb-2 w-full rounded border border-gray-300 p-2"
      />
      <button type="submit" className="w-full rounded bg-blue-500 p-2 text-white">
        검색
      </button>
    </form>
  );
};

export default SearchForm;
