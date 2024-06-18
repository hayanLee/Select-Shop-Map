import React from 'react';

const DetailPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* <header className="bg-main p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-active">칠리칠리 소품랜드</div>
          <div className="flex items-center space-x-4">
            <input type="text" placeholder="지역을 검색해 주세요..." className="rounded border border-gray-300 p-2" />
            <button className="text-active">Log In</button>
          </div>
        </div>
      </header> */}

      <main className="container mx-auto p-4">
        <div className="flex space-x-6 rounded-lg bg-white p-6 shadow-lg">
          <img src="/path/to/image.jpg" alt="Store" className="h-64 w-1/2 rounded-lg object-cover" />
          <div className="w-1/2">
            <h1 className="text-3xl font-bold">Title</h1>
            <p className="mt-2 text-gray-700">위치</p>
            <p className="mt-2 text-gray-700">위치</p>
            <p className="mt-2 text-gray-700">위치</p>
            <button className="mt-4 text-point">❤️</button>
          </div>
        </div>

        <section className="mt-6">
          <h2 className="text-2xl font-bold">리뷰를 남겨주세요</h2>
          <textarea placeholder="리뷰를 남겨주세요" className="mt-2 w-full rounded-lg border p-4" />
          <button className="mt-2 rounded-lg bg-hover p-2 text-active">등록</button>
        </section>

        <section className="mt-6">
          {[1, 2, 3].map((item, index) => (
            <div key={index} className="mt-2 flex items-center justify-between rounded-lg bg-main p-4">
              <div>
                <p className="font-bold">작성자</p>
                <p>안녕하세요</p>
              </div>
              <div className="space-x-2">
                <button className="rounded-lg bg-hover p-2 text-active">수정</button>
                <button className="rounded-lg bg-hover p-2 text-active">삭제</button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default DetailPage;
