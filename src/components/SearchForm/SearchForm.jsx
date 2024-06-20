import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useKakaoMap } from '../KakaoMap/KakaoMap.context';

const SearchForm = () => {
  const { setSearchKeyword } = useKakaoMap();
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedValue = value.trim().replace(/\s+/g, ' ');

    if (!formattedValue.length) {
      Swal.fire('검색어를 입력하세요');
      return;
    }

    setSearchKeyword(formattedValue + ' 소품샵');
  };

  const handleChange = (e) => setValue(e.target.value);

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        name="keyword"
        placeholder="검색할 지역을 입력해주세요"
        value={value}
        onChange={handleChange}
        className="mb-2 w-full rounded border border-gray-300 p-2 focus:outline-active"
      />
      <button type="submit" className="w-full rounded bg-active p-2 text-white hover:bg-hover">
        검색
      </button>
    </form>
  );
};

export default SearchForm;
