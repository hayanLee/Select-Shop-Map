import React from 'react';

const DetailPage = () => {
  return (
    <div className="flex min-h-screen justify-center">
      <main className="w-full max-w-[1320px] p-4">
        <div className="mt-[20px] flex space-x-6 rounded-lg bg-hover p-[48px_36px_30px_36px] shadow-lg">
          <img
            // src={require('../assets/image.jpg')} // 실제 이미지 경로로 변경
            alt="Store"
            className="h-64 w-1/2 rounded-lg bg-white object-cover shadow-md"
          />
          <div className="relative w-1/2 rounded-lg bg-white p-6 shadow-md">
            <h1 className="text-3xl font-bold">Title</h1>
            <p className="mt-2 text-gray-700">위치</p>
            <p className="mt-2 text-gray-700">위치</p>
            <p className="mt-2 text-gray-700">위치</p>
            <button className="absolute bottom-4 right-4 text-point">❤️</button>
          </div>
        </div>

        <div className="mt-9 rounded-lg bg-hover p-[48px_36px_30px_36px] shadow-md">
          <section className="rounded-lg bg-white p-4 shadow-md">
            <div className="flex items-center space-x-[22px]">
              <textarea placeholder="리뷰를 남겨주세요" className="h-[70px] w-full rounded-lg border p-2" />
              <button className="h-[35px] w-[76px] rounded-lg bg-point text-white">등록</button>
            </div>
          </section>
          <section className="mt-6 space-y-[30px]">
            {[1, 2, 3].map((item, index) => (
              <div key={index} className="rounded-lg bg-white p-4 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold">작성자</p>
                    <p>안녕하세요</p>
                  </div>
                  <div className="flex space-x-[22px]">
                    <button className="h-[35px] w-[76px] rounded-lg bg-point text-white">수정</button>
                    <button className="h-[35px] w-[76px] rounded-lg bg-main text-white">삭제</button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default DetailPage;
