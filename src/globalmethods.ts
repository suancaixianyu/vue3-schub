import Cfg from "./config/config";
import axios from "axios";

//开启cookie携带
axios.defaults.withCredentials = true;

class global {
  _config: {
    // 配置信息
    version: string;
  };
  axios: any;
  constructor() {
    this._config = {
      // 配置信息
      version: "1.0.0",
    };
    this.axios = axios;
  }
  /**
   * get方法请求api
   * @param {string} path 请求路径
   */
  api_get(path: string) {
    return fetch(`${Cfg.config.server}${path}`);
  }

  /**
   * post方法请求api
   * @param {string} path 请求路径
   * @param {object} data 请求体
   */
  api_post(path: string, data: object) {
    return axios.post(`${Cfg.config.server}${path}`, data);
  }

  /**
   * 格式化时间戳 -> xx时间前
   * @param {number} time 时间戳
   */
  formatBbsTime(time: number) {
    let time2: Date = new Date();
    time = time * 1000;
    let msg: string;
    const diffMilliseconds = Math.abs(time2.getTime() - time);
    const diffSeconds = Math.floor(diffMilliseconds / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays >= 1) {
      msg = `${diffDays}天前`;
    } else if (diffHours % 24 >= 1) {
      msg = `${diffHours % 24}小时前`;
    } else if (diffMinutes % 60 >= 1) {
      msg = `${diffMinutes % 60}分钟前`;
    } else {
      msg = `${diffSeconds % 60}秒前`;
    }
    return msg;
  }

  /**
   * 资源类型
   * @param {number} type 类型id
   */
  getScTypeName(type: number): string {
    switch (type) {
      case 1:
        return "世界";
      case 2:
        return "方块材质";
      case 3:
        return "人物皮肤";
      case 4:
        return "家具包";
      default:
        return "未知";
    }
  }

  /**
   * 获取文件后缀
   * @param {string} name 文件名
   */
  getFileName(name: string): string {
    let i = name.lastIndexOf(".");
    return name.substring(0, i);
  }

  fixTimePre(str: number) {
    if (str < 10) return "0" + str;
    else return str;
  }

  strtotime(date?: string | null | undefined) {
    if (date == null || date == undefined) {
      let a = Date.now() / 1000;
      return a;
    } else {
      date = date.replace(/-/g, "/"); //解决IOS不兼容问题
      let d = Date.parse(date);
      d = d / 1000;
      return d;
    }
  }

  formatNormalTime(time: number): string {
    function myDate(date: Date, format: string): string {
      const pad = (n: number) => (n < 10 ? "0" + n : n.toString());
      const formatMap: Record<string, number> = {
        Y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        H: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
      };

      return format.replace(/([YmdHis])/g, (_, char) => pad(formatMap[char]));
    }

    const date = new Date(time * 1000);

    return myDate(date, "Y-m-d H:i:s");
  }

  /**
   * 储存信息到本地
   */
  localSet(key: string, obj: object) {
    localStorage.setItem(key, JSON.stringify(obj));
  }

  /**
   * 读取本地信息
   */
  localGet(key: string, defaultValue: object) {
    let v;
    if ((v = localStorage.getItem(key)) == null) return defaultValue;
    else return JSON.parse(v);
  }

  getHostUrl(e: string): string {
    if (e.indexOf("http://") != -1 || e.indexOf("https://") != -1) return e;
    if (e.indexOf("./") == -1) {
      return Cfg.config.server + e;
    } else {
      return Cfg.config.server + e.slice(1);
    }
  }

  getInformation() {
    //刷新页面重新获取用户信息
    this.api_get("/user/info").then((response2: any) => {
      if (response2.data.code == 200) {
        Cfg.config.userInfo.isLogin = true;
        Cfg.config.userInfo.isLoginDialogVisible = false;
        response2.data.data.headurl = this.getHostUrl(
          response2.data.data.headurl,
        );
        Cfg.config.userInfo.data = response2.data.data;
      }
    });
  }
}

export default new global();
