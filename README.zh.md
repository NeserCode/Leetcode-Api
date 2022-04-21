# Leetcode-Api

<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/NeserCode/Leetcode-Api">    <img title="GitHub download" src="https://img.shields.io/github/downloads/NeserCode/Leetcode-Api/total"/>  

[English Document](README.md)

关于 力扣 的网络请求接口。

## 目录

* [免责声明](#免责声明)
* [项目总览](#项目总览)
* [接口相关](#接口相关)
* [接口详情](#接口详情)

## 免责声明

**本项目仅供学习交流参考，在任意情况下均不得用于任何商业用途。如若违反声明，后果自负，本人不承担任何责任。**

## 项目总览

本项目提供的是 **力扣** 官方网站的 **WebApi** 集合，提出的 Api 均已试验成功。

本项目仅包含一个入口 Javascript 文件，将本文档中提出的 WebApi 全部封装到 $Leetcode 类中。

所以，想使用 Leetcode-Api，你只需：

```javascript
import $Leetcode from "Leetcode-Api"

const variable = new $Leetcode()
```

然后通过上例中的 variable 使用 Leetcode-Api 中的函数方法。

## 接口相关

力扣 官网使用了 [**GraphQL**](https://graphql.org/) 技术来获取数据，即 **按需分配数据** 的模式。同时，全部网络请求需要附着 Cookie 访问，部分网络请求需要确认 **Referer** 是否属于力扣域名之下。请使用这些 WebApi 之前制定好相关解决方案。

### 部分解决方案

在传统的 HTML5 项目中，如：

```html
|-images
|--images01.jpg
|-js
|--example.js
|-style
|--style.css
|-index.html
```

这种项目中，由于伪造 Referer 带来的不安全和危险，一般不会允许用户通过 Javascript 脚本去修改 HttpRequest 的表头中的几项，也就是 RequestHeader 中的几项，其中就包含有 Referer 项。

而在 Vue 的脚手架中可以使用 Webpack 相关的 **DevProxy** 项设置相关的请求表头，从而起到伪造 Referer 以获取数据的效果。

这样的例子在互联网上有许多，本人不在这里一一赘述，正好最近在写一个新的 [**Electron**](https://www.electronjs.org/) 项目，用到了伪造 Referer 的功能，在这里可以举例一番。

```javascript
import { remote } from "electron"
const {session} = remote

;function someFn(questionSlug){
    session.defaultSession.webRequest.onBeforeSendHeaders({ urls: ['https://leetcode-cn.com/problems/*'] }, (details, callback) => {
        details.requestHeaders['Referer'] = `https://leetcode-cn.com/problems/${questionSlug}/submissions/`
        callback({ cancel: false, requestHeaders: details.requestHeaders })
    })
    //...
}
```

在给出的实例化的对象中，所有的函数方法都会返回 [**axios**](https://www.axios-http.cn/) 对象。所以，你可以从函数的 **then** 回调中获取数据，例如：

```javascript
import { remote } from "electron"
const { session } = remote,
      $leetcode = new $Leetcode()，
      leetcodeUserStatus = null

;function someFn(questionSlug){
    session.defaultSession.webRequest.onBeforeSendHeaders({ urls: ['https://leetcode-cn.com/problems/*'] }, (details, callback) => {
        details.requestHeaders['Referer'] = `https://leetcode-cn.com/problems/${questionSlug}/submissions/`
        callback({ cancel: false, requestHeaders: details.requestHeaders })
    })
    $leetcode.getUserStatus().then((response)=>{
        if(response.status == 200){
            const { userStatus } = response.data.data
            // leetcodeUserStatus = userStatus
        }
        else
            console.log(response)
    })
}
```

相关的文档请移步相关技术或者自行查询。

## 接口详情

所有接口在文档更新时均已通过测试。

下文表格中提到的 Cookie 项，是指用户在登录力扣官方网站生成的 **LEETCODE_SESSION** 与 **x-csrftoken** 项，获取方法：使用浏览器登录成功后，打开开发人员工具中的网络一项，寻找成功状态的 graphql 请求，在请求信息中可以找到这两项的值。

### 用户状态

```javascript
const $leetcode = new $Leetcode()
;$leetcode.getUserStatus()	// with cookie [LEETCODE_SESSION,x-csrftoken]
```

请求数据项：

|    Item    |                    Value                    |
| :--------: | :-----------------------------------------: |
|    Type    |                    POST                     |
| Parameters |                    NULL                     |
|    URL     |      `https://leetcode-cn.com/graphql`      |
|  Require   | Cookie Item [LEETCODE_SESSION, x-csrftoken] |

获取到的数据项：

|             Key             |  Value  | Describe         |
| :-------------------------: | :-----: | :--------------- |
|  commonNojPermissionTypes   |  Array  | 未知             |
|        jobsMyCompany        | Object  | 用户公司         |
|         userStatus          | Object  | 用户状态         |
|      userStatus.avatar      | String  | 用户头像         |
|     userStatus.isAdmin      | Boolean | 是否是管理员     |
| userStatus.isPhoneVerified  | Boolean | 是否通过手机验证 |
|    userStatus.isPremium     | Boolean | 未知             |
|    userStatus.isSignedIn    | Boolean | 是否登录         |
|   userStatus.isSuperuser    | Boolean | 是否是VIP        |
|   userStatus.isTranslator   | Boolean | 是否是翻译       |
|    userStatus.isVerified    | Boolean | 是否通过身份验证 |
| userStatus.premiumExpiredAt | Number  | 未知             |
|     userStatus.realName     | String  | 用户昵称         |
|  userStatus.useTranslation  | Boolean | 是否使用翻译     |
|     userStatus.userSlug     | String  | 用户标签         |
|     userStatus.username     | String  | 用户名           |

