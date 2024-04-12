import fetch from "auth/FetchInterceptor";

const JwtAuthService = {};

JwtAuthService.login = function (data) {
  return fetch({
    url: "/api/v1/users/login/token/",
    method: "post",
    headers: {
      "public-request": "true",
    },
    data: data,
    withCredentials: true,
  });
};

JwtAuthService.signUp = function (data) {
  return fetch({
    url: "/auth/signup",
    method: "post",
    headers: {
      "public-request": "true",
    },
    data: data,
  });
};

export default JwtAuthService;
