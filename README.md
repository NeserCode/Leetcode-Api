# Leetcode-Api

<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/NeserCode/Leetcode-Api">    <img title="GitHub download" src="https://img.shields.io/github/downloads/NeserCode/Leetcode-Api/total"/>  

[中文文档](README.zh.md)

HttpRequest api for leetcode(zh-cn).

## Directory

* [Disclaimer](#Disclaimer)
* [Project Overview](#Project Overview)
* [About Interface](#About Interface)
* [Interface Detail](#Interface Detail)

## Disclaimer

**This project is for study and exchange only, and under no circumstances shall it be used for any commercial purposes. If you violate the statement, you are responsible for the consequences, and I do not assume any responsibility.**

## Project Overview

This project provides the **WebApi** collection of **Leetcode**, and the proposed Api has been successfully tested.

This project contains only an entry Javascript file that wraps all of the Webapis proposed in this document into the $Leetcode class.

So, to use Leetcode-API, you just need to:

```javascript
import $Leetcode from "Leetcode-Api"

const variable = new $Leetcode()
```

Then use the function in Leetcode-API through the variable in the above example.

## About Interface

Leetcode uses [**GraphQL**](https://graphql.org/) technology to obtain data, that is, the mode of **on-demand data distribution**. At the same time, all network requests need to be attached with Cookie access, and some network requests need to confirm whether the **Referer** belongs to Leetcode domain name. Develop a solution before using these WebApis.

### Partial Solution

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

In such projects, due to the safety and risk of forgery of the Referer, it is generally not allowed to modify the items in the HttpRequest header, i.e. the items in the RequestHeader, which contain the Referer item.

In Vue-Cil project, the Webpack **DevProxy** item can be used to set up the relevant request headers, thus creating the effect of faking the Referer for data.

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

For related documents, refer to related technologies or query them by yourself.

## Interface Detail

All interfaces were tested when the document was updated.

The Cookie items mentioned in the table below refer to the **LEETCODE_SESSION** and **x-csrftoken** items generated when users log in to the official website of Leetcode. The method of obtaining them is as follows: After logging in successfully using the browser, open the network item in the developer tool and look for the graphQL request in the successful state. The values of the two items can be found in the request information.

### User Status

```javascript
const $leetcode = new $Leetcode()
;$leetcode.getUserStatus()	// with cookie [LEETCODE_SESSION,x-csrftoken]
```

Requested data item:

|    Item    |                    Value                    |
| :--------: | :-----------------------------------------: |
|    Type    |                    POST                     |
| Parameters |                    NULL                     |
|    URL     |      `https://leetcode-cn.com/graphql`      |
|  Require   | Cookie Item [LEETCODE_SESSION, x-csrftoken] |

Obtained data items:

|             Key             |  Value  | Describe                                  |
| :-------------------------: | :-----: | :---------------------------------------- |
|  commonNojPermissionTypes   |  Array  | 未知 Unknow                               |
|        jobsMyCompany        | Object  | 用户公司 User company                     |
|         userStatus          | Object  | 用户状态 User status obj                  |
|      userStatus.avatar      | String  | 用户头像 User avatar                      |
|     userStatus.isAdmin      | Boolean | 是否是管理员 User admin status            |
| userStatus.isPhoneVerified  | Boolean | 是否通过手机验证 User phone verify status |
|    userStatus.isPremium     | Boolean | 未知 Unknow                               |
|    userStatus.isSignedIn    | Boolean | 是否登录 User sign status                 |
|   userStatus.isSuperuser    | Boolean | 是否是VIP User vip role status            |
|   userStatus.isTranslator   | Boolean | 是否是翻译 User translator role status    |
|    userStatus.isVerified    | Boolean | 是否通过身份验证 User verify status       |
| userStatus.premiumExpiredAt | Number  | 未知 Unknow                               |
|     userStatus.realName     | String  | 用户昵称 User detail name                 |
|  userStatus.useTranslation  | Boolean | 是否使用翻译 User translation status      |
|     userStatus.userSlug     | String  | 用户标签 User using slug                  |
|     userStatus.username     | String  | 用户名 User name                          |

