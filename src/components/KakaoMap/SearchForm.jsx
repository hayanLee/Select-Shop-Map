import React, { useState } from 'react';

const SearchForm = ({ setKeyword }) => {
  const [input, setInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(input);
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <input
        type="text"
        name="keyword"
        placeholder="검색어를 입력하세요"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border border-gray-300 rounded p-2 w-full mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white rounded p-2 w-full">
        검색
      </button>
    </form>
  );
};

export default SearchForm;
