import axios from "axios";

// axios 인스턴스 생성
const apiClient = axios.create({
  timeout: 30000,
  withCredentials: true,
});

// axios 인터셉터 추가
apiClient.interceptors.request.use((config) => {
  // localStorage에서 token 추출
  const token = localStorage.getItem("token");

  // 존재할시 요청 header에 추가
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 인증에러인 경우 로그인 전역 상태값을 삭제한다.
    if (error.response?.status === 401) {
      /** 로그인 전역상태값 */
      const loginState = localStorage.getItem(
        process.env.NEXT_PUBLIC_LOCALSTORAGE_LOGIN_KEY as string
      ) as string;

      // 상태값 파싱 처리
      const {
        state: { isLogin, userInfo, ...rest },
      } = JSON.parse(loginState);

      // 로그아웃 value 문자열 처리
      const stringified = JSON.stringify({
        isLogin: false,
        userInfo: {},
        ...rest,
      });

      // 로그아웃된 value로 대체한다.
      localStorage.setItem(
        process.env.NEXT_PUBLIC_LOCALSTORAGE_LOGIN_KEY as string,
        stringified
      );

      // 메인 페이지 이동
      location.href = "/";

      alert("로그인이 필요합니다.");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
