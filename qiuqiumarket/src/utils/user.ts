export const getUserInfo = () => {
  if (localStorage.getItem("userInfo")) {
    return JSON.parse(localStorage.getItem("userInfo") as string);
  } else {
    return JSON.parse(sessionStorage.getItem("userInfo") as string);
  }
};
export const setStorge = (autoLogin: boolean, token: string, userInfo: {}) => {
  if (autoLogin) {
    localStorage.setItem("token", token);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userInfo");
  } else {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
  }
};
export const delStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userInfo");
};
