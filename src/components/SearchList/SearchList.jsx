import React from 'react';
import { useKakaoMap } from '../KakaoMap/KakaoMap.context';
import PlaceCard from '../PlaceCard/PlaceCard';

const SearchList = () => {
  const { places, searchKeyword } = useKakaoMap();

  if (!searchKeyword) {
    return <p className="mt-6 flex justify-center">🦐 소품샵을 찾을 지역을 입력해주세요 🎁</p>;
  }

  if (places.length === 0) {
    const formattedKeyword = searchKeyword.replace(/ 소품샵$/, '');
    return <p className="mt-6 flex justify-center">{`"${formattedKeyword}" 에 대한 검색 결과가 없습니다.`}</p>;
  }

  return (
    <ul>
      {places.map((place) => (
        <li key={place.id} className="mb-4 border-b border-gray-300 p-2">
          <PlaceCard place={place} />
        </li>
      ))}
    </ul>
  );
};

export default SearchList;
