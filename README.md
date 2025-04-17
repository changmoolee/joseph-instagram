# joseph-instagram

🚀 **배포 URL:**

**프론트엔드 (Next.js) →** [🌍 joseph-instagram.vercel.app](https://joseph-instagram.vercel.app/)

- GitHub 레포지토리: [📂 joseph-instagram](https://github.com/changmoolee/joseph-instagram)

**백엔드 (NestJS) →** [🌐 joseph-backend.site](https://joseph-backend.site)

- GitHub 레포지토리: [📂 joseph-api](https://github.com/changmoolee/joseph-api)

<br><br>

📌 **현재 애플리케이션은 개발 중입니다.**  
📌 **버그 및 미완성된 기능이 있을 수 있습니다.**

<br><br>

## 개요

`joseph-instagram`은 **Next.js 기반으로 제작된 Instagram 클론 프로젝트**입니다.
<br>
프론트엔드 개발자로서 **프론트엔드, 백엔드, 데이터베이스까지 전체적인 웹 애플리케이션 개발 경험**을 쌓기 위해 시작한 프로젝트입니다.

<br><br>

## Tech Stack

### 📌 **프론트엔드**

<div>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Next.js-111111?style=flat-square&logo=Next.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/TailwindCSS-0DA5E9?style=flat-square&logo=TailwindCSS&logoColor=white"/>
  <img src="https://img.shields.io/badge/SWR-111111?style=flat-square&logo=SWR&logoColor=white"/>
</div>

### 📌 **백엔드**

- GitHub 레포지토리: [📂 joseph-api](https://github.com/changmoolee/joseph-api)

<br><br>

## 📌 기능

### 주요 기능

1. **사용자 인증**<br>
   - 회원가입, 로그인 (JWT 기반 인증)<br>
   - 비밀번호 암호화 (bcrypt)<br>
   - 사용자 정보 조회 및 수정<br>
   - ✅ **Google OAuth 로그인 기능 (access_token → 사용자 정보 → JWT 발급)** <br><br>
2. **게시글 관리**<br>
   - 게시글 생성, 수정, 삭제<br>
   - 게시글 목록 조회 (전체 / 특정 사용자)<br>
   - 이미지 업로드<br><br>
3. **좋아요 기능**<br>
   - 게시물 좋아요 / 좋아요 취소<br>
   - 좋아요한 게시물 목록 조회<br><br>
4. **팔로우 기능**<br>
   - 특정 사용자를 팔로우 / 언팔로우<br>
   - 팔로잉 / 팔로워 목록 조회<br><br>
5. **✅ 게시물 자동 생성 기능**<br>
   - OpenAI GPT-4 API를 사용하여 자동 게시물 텍스트 생성
   - 키워드 기반으로 Unsplash에서 이미지를 자동으로 검색 & 업로드
   - NestJS Scheduler(CRON) 기반으로 매일 1회 자동 게시
     <div>
     <img alt="게시물 자동 생성 기능 시연" width="300" src="https://github.com/user-attachments/assets/b0e82fa1-94f1-4e79-96cf-478447d7acbb" />
     </div><br><br> 
6. **무한스크롤 구현**<br>
   - SWR `useSWRInfinite` + IntersectionObserver API 사용
   - 페이지네이션 버튼 없이 자연스러운 사용자 경험 제공
     <div>
     <img alt="무한스크롤 구현 기능 시연" width="300" src="https://github.com/user-attachments/assets/011f121a-8b66-4543-bbd6-074ee360a8d8" />
     </div>
