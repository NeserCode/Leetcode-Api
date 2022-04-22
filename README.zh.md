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

本项目接口内容**随缘更新**。可以人工催促。当然，这都必须建立在**合理**的基础上。

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

;function someFn(){
    session.defaultSession.webRequest.onBeforeSendHeaders({ urls: ['https://leetcode-cn.com/*'] }, (details, callback) => {
        details.requestHeaders['Referer'] = `https://leetcode-cn.com/`
        callback({ cancel: false, requestHeaders: details.requestHeaders })
    })
    //...
}
```

在给出的实例化的对象中，所有的函数方法都会返回 [**axios**](https://www.axios-http.cn/) 对象。所以，你可以从函数的 **then** 回调中获取数据，例如：

```javascript
import { remote } from "electron"
const { session } = remote
      ,$leetcode = new $Leetcode()

;function someFn(questionSlug){
    $leetcode.getUserStatus().then((response)=>{
        if(response.status == 200)
            const { userStatus } = response.data.data
        else
            console.log(response)
        //...
    })
}
```

相关的文档请移步相关技术或者自行查询。

## 接口详情

所有接口在文档更新时均已通过测试。

- [用户状态](#用户状态)
- [题目集合](#题目集合)
- [题目详情](#题目详情)
- [题目状态](#题目状态)
- [提交ID](#提交ID)
- [提交详情](#提交详情)

下文表格中提到的 Cookie 项，是指用户在登录力扣官方网站生成的 **LEETCODE_SESSION** 与 **x-csrftoken** 项，获取方法：使用浏览器登录成功后，打开开发人员工具中的网络一项，寻找成功状态的 graphql 请求，在请求信息中可以找到这两项的值。

> 接口中标注 `必须使用Cookie` 时，即必须携带上述两项 Cookie 进行网络请求才能获取到数据；接口中标注 `可以不使用Cookie` 时，即携带上述两项 Cookie 进行网络请求才能获取到完整数据(表项中带有 * 的需要携带 Cookie 才能正常获取)；无标注即为普通的网络请求，不需要携带 Cookie 也能正常获取到完整数据。

### 用户状态

! **必须使用Cookie**

```javascript
const $leetcode = new $Leetcode()

;$leetcode.getUserStatus().then((response)=>{
    if(response.status == 200)
        const { commonNojPermissionTypes, jobsMyCompany, userStatus } = response.data.data
    else
        console.log(response)
    //...
})	// must with cookie [LEETCODE_SESSION,x-csrftoken]
```

请求数据项：

|    Item    | Value                                         |
| :--------: | :-------------------------------------------- |
|    Type    | `POST`                                        |
| Parameters | `NULL`                                        |
|    URL     | `https://leetcode-cn.com/graphql`             |
|  Require   | `Cookie Item [LEETCODE_SESSION, x-csrftoken]` |

获取到的数据项：

| Key                         |     Value      | Describe         |
| :-------------------------- | :------------: | :--------------- |
| commonNojPermissionTypes    | Array[Object?] | 未知             |
| jobsMyCompany               |     Object     | 用户公司         |
| userStatus                  |     Object     | 用户状态         |
| userStatus.avatar           |     String     | 用户头像         |
| userStatus.isAdmin          |    Boolean     | 是否是管理员     |
| userStatus.isPhoneVerified  |    Boolean     | 是否通过手机验证 |
| userStatus.isPremium        |    Boolean     | 未知             |
| userStatus.isSignedIn       |    Boolean     | 是否登录         |
| userStatus.isSuperuser      |    Boolean     | 是否是VIP        |
| userStatus.isTranslator     |    Boolean     | 是否是翻译       |
| userStatus.isVerified       |    Boolean     | 是否通过身份验证 |
| userStatus.premiumExpiredAt |     Number     | 未知             |
| userStatus.realName         |     String     | 用户昵称         |
| userStatus.useTranslation   |    Boolean     | 是否使用翻译     |
| userStatus.userSlug         |     String     | 用户标签         |
| userStatus.username         |     String     | 用户名           |

### 题目集合

! **可以不使用Cookie**

```javascript
const $leetcode = new $Leetcode()
	,categorySlug = ""		//defalut
	,skip = 0 				//defalut
	,limit = 25 			//defalut

;$leetcode.getQuestionSet(categorySlug, skip, limit).then((response)=>{
    if(response.status == 200)
    	const { problemsetQuestionList } = response.data.data
    else
        console.log(response)
    //...
})	// with cookie [LEETCODE_SESSION,x-csrftoken] or not
```

请求数据项：

|    Item    | Value                                                  |
| :--------: | :----------------------------------------------------- |
|    Type    | `POST`                                                 |
| Parameters | `categorySlug`, `skip`, `limit`                        |
|    URL     | `https://leetcode-cn.com/graphql`                      |
|  Require   | `NULL` / `Cookie Item [LEETCODE_SESSION, x-csrftoken]` |

参数项：

- `categorySlug`，分类名，获取的题目集合将只含有此分类，默认分类为空字符串。
- `skip`，跳过数，分页相关，获取数量从头部减去 skip 条，默认为 0 条。
- `limit`，数据数量，分页相关，获取数据的数量，默认为 25 条。

获取到的数据项：

| Key                                                          |     Value     | Describe                             |
| :----------------------------------------------------------- | :-----------: | :----------------------------------- |
| problemsetQuestionList                                       | Array[Object] | 题目集合对象                         |
| problemsetQuestionList.hasMore                               |    Boolean    | 是否有更多题目                       |
| problemsetQuestionList.questions                             | Array[Object] | 题目集合                             |
| problemsetQuestionList.questions.acRate                      |    Number     | 题目通过率                           |
| problemsetQuestionList.questions.difficulty                  |    String     | 题目难度                             |
| problemsetQuestionList.questions.extra                       |    Object     | 题目额外信息                         |
| problemsetQuestionList.questions.extra.companyTagNum         |    Number     | 公司数量                             |
| problemsetQuestionList.questions.extra.hasVideoSolution      |    Boolean    | 该题是否有解法视频                   |
| problemsetQuestionList.questions.extra.topCompanyTags        | Array[Object] | 相关公司集合                         |
| problemsetQuestionList.questions.extra.topCompanyTags.imgUrl |    String     | 相关公司头像                         |
| problemsetQuestionList.questions.extra.topCompanyTags.slug   |    String     | 相关公司标题                         |
| problemsetQuestionList.questions.freqBar                     |    Boolean    | 未知                                 |
| problemsetQuestionList.questions.frontendQuestionId          |    String     | 题目的前端ID                         |
| *problemsetQuestionList.questions.isFavor                    |    Boolean    | 题目是否被收藏，需要用户登录         |
| problemsetQuestionList.questions.paidOnly                    |    Boolean    | 题目是否付费                         |
| problemsetQuestionList.questions.solutionNum                 |    Number     | 题目已知解法数量                     |
| *problemsetQuestionList.questions.status                     |    String     | 题目通过状态，需要用户登录，默认NULL |
| problemsetQuestionList.questions.title                       |    String     | 题目的题名                           |
| problemsetQuestionList.questions.titleCn                     |    String     | 题目的题名(中文)                     |
| problemsetQuestionList.questions.titleSlug                   |    String     | 题目的标题                           |
| problemsetQuestionList.questions.topicTags                   | Array[Object] | 题目相关话题集合                     |
| problemsetQuestionList.questions.topicTags.id                |    String     | 话题ID                               |
| problemsetQuestionList.questions.topicTags.name              |    String     | 话题名称                             |
| problemsetQuestionList.questions.topicTags.nameTranslated    |    String     | 话题名称(中文)                       |
| problemsetQuestionList.questions.topicTags.slug              |    String     | 话题标题                             |
| problemsetQuestionList.total                                 |    Number     | 题目总数                             |

### 题目详情

! **可以不使用Cookie**

```javascript
const $leetcode = new $Leetcode()
	,questionSlug = "two-sum"

;$leetcode.getQuestion(questionSlug).then((res)=>{
    if(res.status == 200)
        const { question } = res.data.data
})	// with cookie [LEETCODE_SESSION,x-csrftoken] or not
```

请求数据项：

|    Item    | Value                                                  |
| :--------: | :----------------------------------------------------- |
|    Type    | `POST`                                                 |
| Parameters | `questionSlug`                                         |
|    URL     | `https://leetcode-cn.com/graphql`                      |
|  Require   | `NULL` / `Cookie Item [LEETCODE_SESSION, x-csrftoken]` |

参数项：

- `questionSlug`，题目标题，必须是本 Api 中 `question.titleSlug` 的可选值。

获取到的数据项：

| Key                               |     Value      | Describe                          |
| :-------------------------------- | :------------: | :-------------------------------- |
| question                          |     Object     | 题目对象                          |
| question.book                     |    Object?     | 题目书籍                          |
| question.boundTopicId             |     Object     | 题目相关话题数量                  |
| question.categoryTitle            |     String     | 题目分类名                        |
| question.codeSnippets             |     String     | 题目代码对象                      |
| question.codeSnippets.code        |     String     | 题目代码内容(初始值)              |
| question.codeSnippets.lang        |     String     | 题目代码语言                      |
| question.codeSnippets.langSlug    |     String     | 题目代码语言标题                  |
| question.companyTagStats          |    String?     | 未知，题目相关公司?               |
| question.content                  |     String     | 题目内容                          |
| question.contributors             | Array[Object?] | 未知，题目贡献者?                 |
| question.dailyRecordStatus        |     String     | 题目每日状态记录                  |
| question.difficulty               |     String     | 题目难度                          |
| question.dislikes                 |     Number     | 题目踩数量                        |
| question.editorType               |     String     | 未知，题目编辑器风格?             |
| question.enableRunCode            |    Boolean     | 是否可以运行代码                  |
| question.envInfo                  |     String     | 题目警告信息                      |
| question.exampleTestcases         |     String     | 题目样例                          |
| question.hints                    | Array[String]  | 题目提示                          |
| question.isDailyQuestion          |    Boolean     | 是否是每日一题                    |
| *question.isLiked                 |    String?     | 题目是否点赞                      |
| question.isPaidOnly               |    Boolean     | 题目是否付费                      |
| *question.isSubscribed            |    Boolean     | 是否订阅题目                      |
| question.judgeType                |     String     | 未知，题目判定类型?               |
| question.judgerAvailable          |    Boolean     | 未知，判定是否可用?               |
| question.langToValidPlayground    |     String     | 题目可用的语言                    |
| question.likes                    |     Number     | 题目赞数量                        |
| question.metaData                 |     String     | 题目预设信息                      |
| question.mysqlSchemas             | Array[Object?] | 未知，题目数据库信息?             |
| question.questionFrontendId       |     String     | 题目前端ID                        |
| question.questionId               |     String     | 题目ID                            |
| question.sampleTestCase           |     String     | 题目一般测试用例                  |
| question.similarQuestions         |     String     | 相似题目对象(JSON.stringfy)       |
| question.solution                 |     Object     | 题目解法对象                      |
| question.solution.canSeeDetail    |    Boolean     | 未知，题目解法细节是否可见?       |
| question.solution.id              |     String     | 题目解法ID                        |
| question.stats                    |     String     | 题目通过状态(总体)(JSON.stringfy) |
| *question.status                  |     String     | 题目通过状态，需要用户登录        |
| question.style                    |     String     | 未知，题目风格？                  |
| question.title                    |     String     | 题目题名                          |
| question.titleSlug                |     String     | 题目标题                          |
| question.topicTags                | Array[Object]  | 题目话题标签                      |
| question.topicTags.name           |     String     | 题目话题标签名                    |
| question.topicTags.slug           |     String     | 题目话题标签标题                  |
| question.topicTags.translatedName |     String     | 题目话题标签名(中文)              |
| question.translatedContent        |     String     | 题目内容(中文)                    |
| question.translatedTitle          |     String     | 题目题名(中文)                    |
| question.ugcQuestionId            |     String     | 未知，题目UGCID?                  |

### 题目状态

! **必须使用Cookie**

```javascript
const $leetcode = new $Leetcode()

;$leetcode.getQuestionStatus().then((res)=>{
    if(res.status == 200)
        const { allQuestionsBeta } = res.data.data
})	// must with cookie [LEETCODE_SESSION,x-csrftoken]
```

请求数据项：

|    Item    | Value                                         |
| :--------: | :-------------------------------------------- |
|    Type    | `POST`                                        |
| Parameters | `NULL`                                        |
|    URL     | `https://leetcode-cn.com/graphql`             |
|  Require   | `Cookie Item [LEETCODE_SESSION, x-csrftoken]` |

获取到的数据项：

| Key                         |     Value     | Describe     |
| :-------------------------- | :-----------: | :----------- |
| allQuestionsBeta            | Array[Object] | 题目状态对象 |
| allQuestionsBeta.questionId |    String     | 题目ID       |
| allQuestionsBeta.status     |    String     | 题目状态     |

### 提交ID

! **必须使用Cookie、伪造referer**

```javascript
const $leetcode = new $Leetcode()
	,question_id = 1
	,lang = 'cpp'
	,typd_code = "..."
	,questionSlug = "two-sum"

;$leetcode.getSubmissionID(question_id, lang, typed_code, questionSlug).then((res)=>{
    session.defaultSession.webRequest.onBeforeSendHeaders({ urls: ['https://leetcode-cn.com/problems/*'] }, (details, callback) => {
        details.requestHeaders['Referer'] = `https://leetcode-cn.com/problems/${questionSlug}/submissions/`
        callback({ cancel: false, requestHeaders: details.requestHeaders })
    })
    if(res.status == 200)
        const { submission_id } = res.data
})	// must with cookie [LEETCODE_SESSION,x-csrftoken] and referer [https://leetcode-cn.com/problems/${questionSlug}/submissions/]
```

>  注意，在这个 Api 中，Cookies 必须被携带在 `https://leetcode-cn.com/problems/${questionSlug}/submit`，即访问的 URL  ，否则会触发力扣的 **CSRF** 校验失败。同时，此 Api 还需要伪造 Referer 为 `https://leetcode-cn.com/problems/${questionSlug}/submissions/`，其中字符串模板中的变量 questionSlug 为题目标题，必须为 [题目详情 API](#题目详情) 中 `question.titleSlug` 的可选值

请求数据项：

|    Item    | Value                                                        |
| :--------: | :----------------------------------------------------------- |
|    Type    | `POST`                                                       |
| Parameters | `question_id`, `lang`, `typed_code`, `questionSlug`          |
|    URL     | `https://leetcode-cn.com/problems/${questionSlug}/submit/`   |
|  Require   | `Cookie Item [LEETCODE_SESSION, x-csrftoken]`, `referer [https://leetcode-cn.com/problems/${questionSlug}/submissions/]` |

参数项：

- `question_id`，题目ID，必须是 [题目详情API](#题目详情) 中 `question.questionId` 的可选值。
- `lang`，题目语言，必须是 [题目详情API](#题目详情) 中 `question.codeSnippets.langSlug` 的可选值。
- `typed_code`，运行代码，将测试运行的题解代码。
- `questionSlug`，题目标题，必须是 [题目详情API](#题目详情) 中 `question.titleSlug` 的可选值。
- <s>`test_mode`</s>，测试模式。
- <s>`test_judger`</s>，测试判定器。

获取到的数据项：

| Key           | Value  | Describe   |
| :------------ | :----: | :--------- |
| submission_id | Number | 题目提交ID |

### 提交详情

```javascript
const $leetcode = new $Leetcode()
	,submission_id = 123456789

;$leetcode.getSubumissionStatus(submission_id).then((res)=>{
    if(res.status == 200)
        const { data } = res
}) // can without anything.
```

请求数据项：

|    Item    | Value                                                        |
| :--------: | :----------------------------------------------------------- |
|    Type    | `GET`                                                        |
| Parameters | `submission_id`                                              |
|    URL     | `https://leetcode-cn.com/submissions/detail/${submissionID}/check/` |
|  Require   | `NULL`                                                       |

参数项：

- `submission_id`，题目ID，必须是 [提交ID API](#提交ID) 中 `submission_id` 的可选值。

获取到的数据项：

| Key                     |  Value  | Describe               |
| :---------------------- | :-----: | :--------------------- |
| data                    | Object  | 题目提交ID             |
| data.compile_error      | String  | 题解编译错误           |
| data.elapsed_time       | Number  | 题解运行时间           |
| data.fast_submit        | Boolean | 是否快速提交           |
| data.finished           | Boolean | 是否运行完毕?          |
| data.full_compile_error | String  | 题解编译错误(完整)     |
| data.lang               | String  | 题解语言               |
| data.memory             | Number  | 题解运行占用内存空间   |
| data.memory_percentile  | String? | 题解运行占用内存百分比 |
| data.pretty_lang        | String  | 题解语言(还原化)       |
| data.question_id        | String  | 题解对应题目ID         |
| data.run_success        | Boolean | 题解是否成功运行       |
| data.runtime_percentile | String? | 题解运行时间百分比?    |
| data.state              | String  | 题解当前判定状态       |
| data.status_code        | Number  | 题解判定状态码         |
| data.status_memory      | String  | 判定状态占用内存       |
| data.status_msg         | String  | 判定状态消息           |
| data.status_runtime     | String  | 判定状态运行时间       |
| data.submission_id      | String  | 题解提交ID             |
| data.task_finish_time   | Number  | 题解提交时间?          |
| data.task_name          | String  | 题解判定器名称         |
| data.total_correct      | Number? | 题解通过的测试用例     |
| data.total_testcases    | Number? | 题解全部的测试用例     |

