# Leetcode-Api

<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/NeserCode/Leetcode-Api">    <img title="GitHub download" src="https://img.shields.io/github/downloads/NeserCode/Leetcode-Api/total"/>  



关于 力扣 的网络请求接口。
HttpRequest api for leetcode(zh-cn).

## 目录

* [免责声明](#免责声明)
* [项目总览](#项目总览)
* [接口相关](#接口相关)
* [接口详情](#接口详情)

## 免责声明

**本项目仅供学习交流参考，在任意情况下均不得用于任何商业用途。如若违反声明，后果自负，本人不承担任何责任。**
**This project is for study and exchange only, and under no circumstances shall it be used for any commercial purposes. If you violate the statement, you are responsible for the consequences, and I do not assume any responsibility.**

## 项目总览

本项目提供的是 **力扣** 官方网站的 **WebApi** 集合，提出的 Api 均已试验成功。
This project provides the **WebApi** collection of **Leetcode**, and the proposed Api has been successfully tested.

本项目仅包含一个入口 Javascript 文件，将本文档中提出的 WebApi 全部封装到 $Leetcode 类中。
This project contains only an entry Javascript file that wraps all of the Webapis proposed in this document into the $Leetcode class.

所以，想使用 Leetcode-Api，你只需：
So, to use Leetcode-API, you just need to:

```javascript
import $Leetcode from "Leetcode-Api"

const variable = new $Leetcode()
```

然后通过上例中的 variable 使用 Leetcode-Api 中的函数方法。
Then use the function in Leetcode-API through the variable in the above example.

## 接口相关

力扣 官网使用了 [**GraphQL**](https://graphql.org/) 技术来获取数据，即 **按需分配数据** 的模式。同时，全部网络请求需要附着 Cookie 访问，部分网络请求需要确认 **Referer** 是否属于力扣域名之下。请使用这些 WebApi 之前制定好相关解决方案。
Leetcode uses [**GraphQL**](https://graphql.org/) technology to obtain data, that is, the mode of **on-demand data distribution**. At the same time, all network requests need to be attached with Cookie access, and some network requests need to confirm whether the **Referer** belongs to Leetcode domain name. Develop a solution before using these WebApis.

### 部分解决方案

在传统的 HTML5 项目中，如：
In traditional HTML5 projects, such as:

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
In such projects, due to the safety and risk of forgery of the Referer, it is generally not allowed to modify the items in the HttpRequest header, i.e. the items in the RequestHeader, which contain the Referer item.

而在 Vue 的脚手架中可以使用 Webpack 相关的 **DevProxy** 项设置相关的请求表头，从而起到伪造 Referer 以获取数据的效果。
In Vue-Cil project, the Webpack **DevProxy** item can be used to set up the relevant request headers, thus creating the effect of faking the Referer for data.

这样的例子在互联网上有许多，本人不在这里一一赘述，正好最近在写一个新的 [**Electron**](https://www.electronjs.org/) 项目，用到了伪造 Referer 的功能，在这里可以举例一番。
There are many such examples on the Internet, and I won't repeat them all here. Recently, I was writing a new [**Electron**](https://www.electronjs.org/) project, which used the function of forging Referer. Here I can give some examples.

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
In the given instantiated object, all function methods return [**axios**](https://www.axios-http.cn/) objects. So, you can get data from the function's **then** callback, for example:

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
For related documents, refer to related technologies or query them by yourself.

## 接口详情

所有接口在文档更新时均已通过测试。
All interfaces were tested when the document was updated.

下文表格中提到的 Cookie 项，是指用户在登录力扣官方网站生成的 **LEETCODE_SESSION** 与 **x-csrftoken** 项，获取方法：使用浏览器登录成功后，打开开发人员工具中的网络一项，寻找成功状态的 graphql 请求，在请求信息中可以找到这两项的值。
The Cookie items mentioned in the table below refer to the **LEETCODE_SESSION** and **x-csrftoken** items generated when users log in to the official website of Leetcode. The method of obtaining them is as follows: After logging in successfully using the browser, open the network item in the developer tool and look for the graphQL request in the successful state. The values of the two items can be found in the request information.

### 用户状态

```javascript
$Leetcode.getUserStatus()	// with cookie [LEETCODE_SESSION,x-csrftoken]
```

请求数据项：
Requested data item:

|    Item    |                    Value                    |
| :--------: | :-----------------------------------------: |
|    Type    |                    POST                     |
| Parameters |                    NULL                     |
|    URL     |      `https://leetcode-cn.com/graphql`      |
|  Require   | Cookie Item [LEETCODE_SESSION, x-csrftoken] |

获取到的数据项：
Obtained data items:

|             Key             |  Value  | Describe                                  |
| :-------------------------: | :-----: | :---------------------------------------- |
|  commonNojPermissionTypes   |  Array  | 未知 Unknow                               |
|        jobsMyCompany        | Object  | 用户公司 User company                     |
|         userStatus          | Object  | 用户状态 User status obj                  |
|      userStatus.avatar      | String  | 用户头像 User avatar                      |
|     userStatus.isAdmin      | Boolean | 是否是管理员 User admin status            |
| userStatus.isPhoneVerified  | Boolean | 是否通过手机验证 User phone verify status |
|    userStatus.isPremium     | Boolean | User premium status                       |
|    userStatus.isSignedIn    | Boolean | 是否登录 User sign status                 |
|   userStatus.isSuperuser    | Boolean | 是否是VIP User vip role status            |
|   userStatus.isTranslator   | Boolean | 是否是翻译 User translator role status    |
|    userStatus.isVerified    | Boolean | 是否通过身份验证 User verify status       |
| userStatus.premiumExpiredAt | Number  | User premium expiration                   |
|     userStatus.realName     | String  | 用户昵称 User detail name                 |
|  userStatus.useTranslation  | Boolean | 是否使用翻译 User translation status      |
|     userStatus.userSlug     | String  | 用户标签 User using slug                  |
|     userStatus.username     | String  | 用户名 User name                          |

