import React, { useEffect } from 'react';

const Marker = ({ place, mapInstance, markersRef, infoWindowsRef }) => {
  useEffect(() => {
    if (!mapInstance) {
      console.log("Map instance is not available");
      return;
    }

    const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
      map: mapInstance,
      title: place.place_name,
    });

    const content = `
      <div style="padding:16px; background-color:white; border:1px solid #d1d5db; border-radius:12px; max-width:400px; box-shadow:0 4px 6px rgba(0, 0, 0, 0.1);">
        <h4 style="font-weight:bold; font-size:1.125rem; margin-bottom:8px;">${place.place_name}</h4>
        <img src="path/to/your/image.jpg" alt="${place.place_name}" style="margin-bottom:8px; width:100%; height:128px; object-fit:cover; border-radius:8px;"/>
        <p style="font-size:0.875rem; color:#6b7280;">${place.road_address_name || place.address_name}</p>
        <p style="font-size:0.875rem; color:#6b7280;">${place.phone ? '☎️: ' + place.phone : '전화번호 정보 없음'}</p>
        <a href="${place.place_url}" target="_blank" style="color:#3b82f6; text-decoration:underline; margin-top:8px; display:block;">상세정보</a>
      </div>
    `;

    const infowindow = new window.kakao.maps.InfoWindow({
      content: content,
      removable: true,
      zIndex: 1,
    });

    const handleMarkerClick = () => {
      infoWindowsRef.current.forEach((iw) => iw.close());
      infowindow.open(mapInstance, marker);

      // 인포윈도우의 기본 스타일을 직접 제거
      const iwElement = infowindow.a;
      if (iwElement) {
        iwElement.style.border = 'none';
        iwElement.style.background = 'none';
        iwElement.style.boxShadow = 'none';
      }
    };

    window.kakao.maps.event.addListener(marker, 'click', handleMarkerClick);

    markersRef.current.push(marker);
    infoWindowsRef.current.push(infowindow);

    return () => {
      window.kakao.maps.event.removeListener(marker, 'click', handleMarkerClick);
      marker.setMap(null);
      markersRef.current = markersRef.current.filter((m) => m !== marker);
      infoWindowsRef.current = infoWindowsRef.current.filter((iw) => iw !== infowindow);
    };
  }, [mapInstance, place, markersRef, infoWindowsRef]);

  return null;
};

export default Marker;
