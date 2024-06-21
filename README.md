## 🔍 프로젝트 소개

전국 소품샵 위치를 제공하는 웹 지도 서비스

## ⏰ 개발기간

2024.06.17 ~ 2024.06.20

## 👥 멤버구성

| 이름   | 역할 | 업무 분담                                                                   |
| ------ | ---- | ------------------------------------------------------------------------------------ |
| 최슬기 | 팀장 | 상세페이지 - 소품샵을 저장할 수 있는 기능 (찜하기), 리뷰기능 상세페이지 불러오기<br/>전체 일정 조율 및 목표 설정 |
| 이하얀 | 팀원 | 검색 결과 페이지 - 리뷰를 남기고 확인할 수 있는 기능 + CRUD 관련한 supabase에 모델링하고 DB 구축 |
| 유수지 | 팀원 | 로그인/회원가입 페이지 - 회원가입, 로그인 등의 인증 기능  |
| 황승현 | 팀원 | 검색 결과 페이지 - 검색 결과를 지도에 마커로 표시해 주는 기능  |
| 김도연 | 팀원 | 마이페이지 - 저장한 소품샵과 작성한 리뷰들을 마이페이지에서 확인할 수 있는 기능 |

## 💻 사용 기술 스택

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Figma](https://img.shields.io/badge/FIGMA-F24E1E?style=for-the-badge&logo=figma&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) 
![Visual-Studio-Code](https://img.shields.io/badge/Visual_Studio_Code-5C2D91?style=for-the-badge&logo=Visual-studio-code&logoColor=white) 
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Context-API](https://img.shields.io/badge/Context--Api-000000?style=for-the-badge&logo=react)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## 💡 주요 기능

- 로그인 / 회원가입
- 마이페이지</br>
  - 내 찜목록 보기</br>
  - 내 리뷰 보기</br>
- 지도 검색
- 상세페이지</br>
  - 리뷰작성</br>
  - 찜하기

## 💡 필수 구현 사항

- 지도 API(카카오 맵 API)
- 전역 상태 관리 라이브러리 : Tanstack Query, ContextAPI
- DB활용 : Supabase

## 🌟 Commit Convention

- ✨ update : 해당 파일에 새로운 기능이 생김
- 🎉 add : 없던 파일을 생성함, 초기 세팅
- 🐛 bugfix : 버그 수정
- ♻️ refactor : 코드 리팩토링
- 🩹 fix : 코드 수정
- 🚚 move : 파일 옮김/정리
- 🔥 del : 기능/파일을 삭제
- 🍻 test : 테스트 코드를 작성
- 💄 style : css
- 🙈 gitfix : gitignore 수정
- 💡 comment : 주석 변경
- 🔨 script : package.json 변경(npm 설치 등)
