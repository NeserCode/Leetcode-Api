# Leetcode-Api

<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/NeserCode/Leetcode-Api"><img title="GitHub download" src="https://img.shields.io/github/downloads/NeserCode/Leetcode-Api/total"/>



关于 力扣 的网络请求接口。
HttpRequest api for leetcode(zh-cn).

## 免责声明

**本项目仅供学习交流参考，在任意情况下均不得用于任何商业用途。如若违反声明，后果自负，本人不承担任何责任。**
**This project is for study and exchange only, and under no circumstances shall it be used for any commercial purposes. If you violate the statement, you are responsible for the consequences, and I do not assume any responsibility.**

------

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

## 
