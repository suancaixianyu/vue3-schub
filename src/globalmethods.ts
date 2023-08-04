import Cfg from './config/config'
import axios, { AxiosStatic } from 'axios'
import { ElMessage } from 'element-plus'
import useClipboard from 'vue-clipboard3'
const { toClipboard } = useClipboard()

//开启cookie携带
axios.defaults.withCredentials = true

class Method {
  /** 配置信息 */
  _config: {
    /** 版本号 */
    version: string
  }
  axios: AxiosStatic
  constructor() {
    this._config = {
      version: '1.0.0',
    }
    this.axios = axios
  }
  /**
   * get方法请求api
   * @param {string} path 请求路径
   */
  api_get(path: string) {
    return axios.get(`${Cfg.config.server}${path}`)
  }

  /**
   * post方法请求api
   * @param {string} path 请求路径
   * @param {object} data 请求体
   */
  api_post(path: string, data: object) {
    return axios.post(`${Cfg.config.server}${path}`, data)
  }

  /**
   * post方法请求图床api
   * @param {string} path 请求路径
   * @param {object} data 请求体
   */
  uploadimg(path: string, data: object) {
    return axios.post(`${Cfg.config.uploadimg}${path}`, data)
  }

  /**
   * 格式化时间戳 -> xx时间前
   * @param {number} time 时间戳
   */
  formatBbsTime(time: number) {
    let time2: Date = new Date()
    time = time * 1000
    let msg: string
    const diffMilliseconds = Math.abs(time2.getTime() - time)
    const diffSeconds = Math.floor(diffMilliseconds / 1000)
    const diffMinutes = Math.floor(diffSeconds / 60)
    const diffHours = Math.floor(diffMinutes / 60)
    const diffDays = Math.floor(diffHours / 24)
    if (diffDays >= 1) {
      msg = `${diffDays}天前`
    } else if (diffHours % 24 >= 1) {
      msg = `${diffHours % 24}小时前`
    } else if (diffMinutes % 60 >= 1) {
      msg = `${diffMinutes % 60}分钟前`
    } else {
      msg = `${diffSeconds % 60}秒前`
    }
    return msg
  }

  /**
   * 资源类型
   * @param {number} type 类型id
   */
  getScTypeName(type: number): string {
    switch (type) {
      case 1:
        return '世界'
      case 2:
        return '方块材质'
      case 3:
        return '人物皮肤'
      case 4:
        return '家具包'
      default:
        return '未知'
    }
  }

  /**
   * 获取文件后缀
   * @param {string} name 文件名
   */
  getFileName(name: string): string {
    let i = name.lastIndexOf('.')
    return name.substring(0, i)
  }

  /**
   * 格式化文件大小
   * @param size 文件大小
   */
  getFileSize(size: number): string {
    if (size / 1024 >= 1) {
      return `${(size / 1024).toFixed(1)}KB`
    } else if (size / 10240 >= 1) {
      return `${(size / 10240).toFixed(1)}MB`
    } else {
      return `${size}B`
    }
  }

  /**
   * 格式化数字
   * @param number 数量
   */
  getNumber(number: number): string {
    if (number / 1000 >= 1) {
      return `${(number / 1000).toFixed(1)}k`
    } else if (number / 10000 >= 1) {
      return `${(number / 1000).toFixed(1)}万`
    } else {
      return `${number}`
    }
  }

  fixTimePre(str: number) {
    if (str < 10) return '0' + str
    else return str
  }

  strtotime(date?: string | null | undefined) {
    if (date == null || date == undefined) {
      let a = Date.now() / 1000
      return a
    } else {
      date = date.replace(/-/g, '/') //解决IOS不兼容问题
      let d = Date.parse(date)
      d = d / 1000
      return d
    }
  }

  myDate(date: Date, format: string): string {
    const pad = (n: number) => (n < 10 ? '0' + n : n.toString())
    const formatMap: Record<string, number> = {
      Y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      H: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
    }
    return format.replace(/([YmdHis])/g, (_, char) => pad(formatMap[char]))
  }

  formatNormalTime(time: number, format = 'Y-m-d H:i:s'): string {
    const date = new Date(time * 1000)
    return this.myDate(date, format)
  }

  /**
   * 储存信息到本地
   */
  localSet(key: string, obj: object | string) {
    if (typeof obj === 'string') {
      localStorage.setItem(key, obj)
    } else {
      localStorage.setItem(key, JSON.stringify(obj))
    }
  }

  /**
   * 读取本地信息
   */
  localGet(key: string, defaultValue: object) {
    let v
    if ((v = localStorage.getItem(key)) == null) return defaultValue
    else return JSON.parse(v)
  }

  /**
   * 将资源相对路径转为绝对路径
   * @param e 资源相对路径
   */
  getHostUrl(e: string): string {
    if (e.indexOf('http://') != -1 || e.indexOf('https://') != -1) return e
    if (e.indexOf('./') == -1) {
      return Cfg.config.server + e
    } else {
      return Cfg.config.server + e.slice(1)
    }
  }

  /**
   * 解码角色列表
   * @param roleStr
   */
  decodeRoleList(roleStr: string) {
    let {
      userInfo: { role_list },
    } = Cfg.config
    let result = [] as any
    if (roleStr == null) return result
    let arr = roleStr.split(',')
    arr.forEach((x: string) => {
      let f = role_list.find((xx: any) => {
        return xx.id == x
      })
      if (f != null) {
        result.push(f)
      }
    })
    return result
  }
  /**
   * 解码flag_list
   * @param flag_list_str
   */
  decodeFlagList(flag_list_str: string) {
    let {
      userInfo: {
        global_mod_data_list: { flag_list },
      },
    } = Cfg.config
    let arr = flag_list_str.split(',')
    let result = [] as any
    if (arr.length > 0) {
      arr.forEach((x: any) => {
        let f = flag_list.find((xx: any) => {
          return xx.id == x
        })
        if (f != null) {
          result.push({ name: f.name, flag_name: f.flag_name })
        }
      })
    }
    return result
  }

  /**
   * 解码link_list
   * @param linkStr
   */
  decodeLinkList(linkStr: string) {
    let {
      userInfo: {
        global_mod_data_list: { link_type },
      },
    } = Cfg.config
    let result = [] as any
    if (linkStr == null) return result
    let arr = linkStr.split('|')
    arr.forEach((x: string) => {
      let arr2 = x.split(',')
      let f = link_type.find((xx: any) => {
        return xx.id == arr2[0]
      })
      if (f != null) {
        result.push({ name: f.name, src: arr2[1] })
      }
    })
    return result
  }
  /**
   * 解码api_version_list
   * @param linkStr
   */
  decodeApiVersionList(linkStr: string) {
    let {
      userInfo: {
        global_mod_data_list: { api_version },
      },
    } = Cfg.config
    let result = [] as any
    if (linkStr == null) return result
    let arr = linkStr.split(',')
    arr.forEach((x: string) => {
      let f = api_version.find((xx: any) => {
        return xx.id == x
      })
      if (f != null) {
        result.push({ name: f.name })
      }
    })
    return result
  }
  /**
   * 解码game_version_list
   * @param linkStr
   */
  decodeGameVersionList(linkStr: string) {
    let {
      userInfo: {
        global_mod_data_list: { game_version },
      },
    } = Cfg.config
    let result = [] as any
    if (linkStr == null) return result
    let arr = linkStr.split(',')
    arr.forEach((x: string) => {
      let f = game_version.find((xx: any) => {
        return xx.id == x
      })
      if (f != null) {
        result.push({ name: f.name })
      }
    })
    console.log(linkStr)
    return result
  }
  /**
   * 解码relation_list
   * @param relationList
   */
  decodeRelationList(relationList: any) {
    let {
      userInfo: {
        global_mod_data_list: { relate_type },
      },
    } = Cfg.config
    let result = [] as any
    relationList.forEach((linkStr: any) => {
      let item = { condition: linkStr.condition_value, list: [] as any }
      if (linkStr.relation != null) {
        let arr = linkStr.relation.split('|')
        arr.forEach((x: string) => {
          let arr2 = x.split(',')
          let f = relate_type.find((xx: any) => {
            return xx.id == arr2[0]
          })
          if (f != null) {
            item.list.push({
              type_name: f.name,
              package_name: arr2[1],
              package_id: arr2[2],
            })
          }
        })
      }
      result.push(item)
    })
    return result
  }
  /**
   * 刷新页面重新获取用户信息
   */
  getInformation() {
    let { userInfo } = Cfg.config
    //刷新页面重新获取用户信息
    this.api_get('/user/role_list').then((response) => {
      let roleRes = response.data
      if (roleRes.code == 200) {
        userInfo.role_list = roleRes.data //全局角色列表缓存
      }
    })
    this.api_get('/mod/global_data_list').then((response) => {
      let roleRes = response.data
      if (roleRes.code == 200) {
        userInfo.global_mod_data_list = roleRes.data //全局角色列表缓存
      }
    })
    this.api_get('/user/info').then((response2: any) => {
      let res = response2.data
      if (res.code == 200) {
        userInfo.isLogin = true
        userInfo.isLoginDialogVisible = false
        res.data.headurl = this.getHostUrl(res.data.headurl)
        userInfo.data = res.data
      }
    })
  }

  /**
   * 设置页面样式
   */
  setwebstyle() {
    let data = this.localGet('webstyle', {})
    console.log(data)
    if (data.webkit) {
      console.log('加载本地设置', data)
      for (let key in Cfg.config.webstyle) {
        Cfg.config.webstyle[key] = data[key]
      }
    }

    for (let key in Cfg.config.webstyle) {
      for (let b in Cfg.config.webstyle[key]) {
        console.log(key, b, Cfg.config.webstyle[key][b])
        document.documentElement.style.setProperty(
          `--${b}`,
          Cfg.config.webstyle[key][b],
        )
      }
    }
  }

  /**
   * 将文本复制到剪切板
   * @param txt 需要复制的文本
   */
  async copyText(txt: string) {
    try {
      await toClipboard(txt)
      ElMessage({
        type: 'success',
        message: '复制成功！',
      })
    } catch (error: any) {
      ElMessage({
        type: 'error',
        message: `复制失败：${error.message}`,
      })
    }
  }
}

export default new Method()
