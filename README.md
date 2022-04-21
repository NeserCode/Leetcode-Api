# Leetcode-Api

<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/NeserCode/Leetcode-Api">     <img title="GitHub download" src="https://img.shields.io/github/downloads/NeserCode/Leetcode-Api/total"/>  



关于 力扣 的网络请求接口。
HttpRequest api for leetcode(zh-cn).

## 目录

* [免责声明](#免责声明)
* [项目总览](#项目总览)
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

## 接口详情

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

