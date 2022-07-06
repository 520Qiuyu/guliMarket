import axios from "axios";
import nprogress from "nprogress";
import"nprogress/nprogress.css"
//创建axios实例[创建出来的实例即为axios，只不过可以配置一些东西]
const request = axios.create({
  //设置请求时间（5S）
  // timeout: 5000,
});

//请求拦截器:在发请求之前可以检测到，可以干一些事情
request.interceptors.request.use((config) => {
    nprogress.start()
    return config
});

//响应拦截器：服务器的数据已经返回了，可以干一些事情
request.interceptors.response.use(
  (res) => {
    nprogress.done()
    return res;
  },
  (error) => {
    //终止promise链
    return Promise.reject(error);
  }
);

export default request;
