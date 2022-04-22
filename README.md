# Leetcode-Api

<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/NeserCode/Leetcode-Api">    <img title="GitHub download" src="https://img.shields.io/github/downloads/NeserCode/Leetcode-Api/total"/>  

[中文文档](README.zh.md)

HttpRequest api for leetcode(zh-cn).

## Directory

* [Disclaimer](#Disclaimer)
* [Project Overview](#Project-Overview)
* [About Interface](#About-Interface)
* [Interface Detail](#Interface-Detail)

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

The interface content of this project is **updated as needed**. Can be manually urged. Of course, this has to be done on a **reasonable** basis.

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

- [User Status](#User-Status)
- [Question Set](#Question-Set)
- [Question Detail](#Question-Detail)
- [Question Status](#Question-Status)
- [Submission ID](#Submission-ID)
- [Submission Detail](#Submission-Detail)

Cookie items mentioned in the table below refer to **LEETCODE_SESSION** and **x-csrftoken** items generated when users log in to the official website of Licou. The method of obtaining them is as follows: After logging in successfully using the browser, open the network item in the developer tool and look for the graphQL request in the successful state. The values of the two items can be found in the request information.

> If **With-Cookie** is marked on the interface, the data can be obtained only when the above two cookies are carried for network request. If **Can-Without-Cookie** is marked on the interface, complete data can be obtained only by carrying the above two cookies for network request (cookies with * in entries can be normally obtained only by carrying cookies). No annotation is an ordinary network request, and complete data can be normally obtained without carrying cookies.

### User Status

Type[**With-Cookie**]

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

Request data:

|    Item    | Value                                         |
| :--------: | :-------------------------------------------- |
|    Type    | `POST`                                        |
| Parameters | `NULL`                                        |
|    URL     | `https://leetcode-cn.com/graphql`             |
|  Require   | `Cookie Item [LEETCODE_SESSION, x-csrftoken]` |

Return Data:

| Key                         |     Value      | Describe             |
| :-------------------------- | :------------: | :------------------- |
| commonNojPermissionTypes    | Array[Object?] | Unkow                |
| jobsMyCompany               |     Object     | User Company         |
| userStatus                  |     Object     | User Status          |
| userStatus.avatar           |     String     | User Avatar          |
| userStatus.isAdmin          |    Boolean     | is Admin             |
| userStatus.isPhoneVerified  |    Boolean     | is phone verified    |
| userStatus.isPremium        |    Boolean     | Unkow                |
| userStatus.isSignedIn       |    Boolean     | is Logined           |
| userStatus.isSuperuser      |    Boolean     | is Vip               |
| userStatus.isTranslator     |    Boolean     | is Translator        |
| userStatus.isVerified       |    Boolean     | is verified          |
| userStatus.premiumExpiredAt |     Number     | Unkow                |
| userStatus.realName         |     String     | User Nickname        |
| userStatus.useTranslation   |    Boolean     | is using Translation |
| userStatus.userSlug         |     String     | User Slug            |
| userStatus.username         |     String     | User name            |

### Question Set

Type[**Can-Without-Cookie**]

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

Request data:

|    Item    | Value                                                  |
| :--------: | :----------------------------------------------------- |
|    Type    | `POST`                                                 |
| Parameters | `categorySlug`, `skip`, `limit`                        |
|    URL     | `https://leetcode-cn.com/graphql`                      |
|  Require   | `NULL` / `Cookie Item [LEETCODE_SESSION, x-csrftoken]` |

Parameters:

- `categorySlug`, category name, the collection of topics obtained will contain only this category, which defaults to an empty string.
- `skip`, the number of skips is page-related. The number of skips is subtracted from the header. The default is 0.
- `limit`, number of pages, the number of pages to obtain data, default is 25.

Return Data:

| Key                                                          |     Value     | Describe                                               |
| :----------------------------------------------------------- | :-----------: | :----------------------------------------------------- |
| problemsetQuestionList                                       | Array[Object] | Question Set Object                                    |
| problemsetQuestionList.hasMore                               |    Boolean    | is has more question                                   |
| problemsetQuestionList.questions                             | Array[Object] | Question Set                                           |
| problemsetQuestionList.questions.acRate                      |    Number     | Question accept percentage                             |
| problemsetQuestionList.questions.difficulty                  |    String     | Question Difficulty                                    |
| problemsetQuestionList.questions.extra                       |    Object     | Question extra infomation                              |
| problemsetQuestionList.questions.extra.companyTagNum         |    Number     | Company number                                         |
| problemsetQuestionList.questions.extra.hasVideoSolution      |    Boolean    | is has solution video                                  |
| problemsetQuestionList.questions.extra.topCompanyTags        | Array[Object] | Top Company Set                                        |
| problemsetQuestionList.questions.extra.topCompanyTags.imgUrl |    String     | Top Company Avatar                                     |
| problemsetQuestionList.questions.extra.topCompanyTags.slug   |    String     | Top Company Slug                                       |
| problemsetQuestionList.questions.freqBar                     |    Boolean    | Unkow                                                  |
| problemsetQuestionList.questions.frontendQuestionId          |    String     | Question frontend ID                                   |
| *problemsetQuestionList.questions.isFavor                    |    Boolean    | Whether the question is favorites, requires user login |
| problemsetQuestionList.questions.paidOnly                    |    Boolean    | is question need payment                               |
| problemsetQuestionList.questions.solutionNum                 |    Number     | Known solution number                                  |
| *problemsetQuestionList.questions.status                     |    String     | Question status, requires user login, default Null     |
| problemsetQuestionList.questions.title                       |    String     | Question Title                                         |
| problemsetQuestionList.questions.titleCn                     |    String     | Question Title(Chinese)                                |
| problemsetQuestionList.questions.titleSlug                   |    String     | Question Slug                                          |
| problemsetQuestionList.questions.topicTags                   | Array[Object] | Question topic set                                     |
| problemsetQuestionList.questions.topicTags.id                |    String     | Topic ID                                               |
| problemsetQuestionList.questions.topicTags.name              |    String     | Topic name                                             |
| problemsetQuestionList.questions.topicTags.nameTranslated    |    String     | Topic name(Chinese)                                    |
| problemsetQuestionList.questions.topicTags.slug              |    String     | Topic slug                                             |
| problemsetQuestionList.total                                 |    Number     | Question total number                                  |

### Question Detail

Type[**Can-Without-Cookie**]

```javascript
const $leetcode = new $Leetcode()
	,questionSlug = "two-sum"

;$leetcode.getQuestion(questionSlug).then((res)=>{
    if(res.status == 200)
        const { question } = res.data.data
})	// with cookie [LEETCODE_SESSION,x-csrftoken] or not
```

Request data:

|    Item    | Value                                                  |
| :--------: | :----------------------------------------------------- |
|    Type    | `POST`                                                 |
| Parameters | `questionSlug`                                         |
|    URL     | `https://leetcode-cn.com/graphql`                      |
|  Require   | `NULL` / `Cookie Item [LEETCODE_SESSION, x-csrftoken]` |

Parameters:

- `questionSlug`, question slug, which must be an optional value of  `question.titleSlug` in this API.

Return Data:

| Key                               |     Value      | Describe                            |
| :-------------------------------- | :------------: | :---------------------------------- |
| question                          |     Object     | Question Object                     |
| question.book                     |    Object?     | Question Book                       |
| question.boundTopicId             |     Object     | Question Topic ID                   |
| question.categoryTitle            |     String     | Question category title             |
| question.codeSnippets             |     String     | Question code snippet Object        |
| question.codeSnippets.code        |     String     | Question code                       |
| question.codeSnippets.lang        |     String     | Question code language              |
| question.codeSnippets.langSlug    |     String     | Question language slug              |
| question.companyTagStats          |    String?     | Question company?                   |
| question.content                  |     String     | Question Content                    |
| question.contributors             | Array[Object?] | Question Contributors?              |
| question.dailyRecordStatus        |     String     | Question daily Record Status        |
| question.difficulty               |     String     | Question Difficulty                 |
| question.dislikes                 |     Number     | Question dislikes                   |
| question.editorType               |     String     | Question Editor style?              |
| question.enableRunCode            |    Boolean     | is able to run code                 |
| question.envInfo                  |     String     | Question enviroment info            |
| question.exampleTestcases         |     String     | Question example testcase           |
| question.hints                    | Array[String]  | Question hints                      |
| question.isDailyQuestion          |    Boolean     | is daily question                   |
| *question.isLiked                 |    String?     | is like question                    |
| question.isPaidOnly               |    Boolean     | is question need payment            |
| *question.isSubscribed            |    Boolean     | is subscribed question              |
| question.judgeType                |     String     | Question judge type?                |
| question.judgerAvailable          |    Boolean     | is judge available?                 |
| question.langToValidPlayground    |     String     | Question available language         |
| question.likes                    |     Number     | Question likes                      |
| question.metaData                 |     String     | Question meta data                  |
| question.mysqlSchemas             | Array[Object?] | Question mysql infomation?          |
| question.questionFrontendId       |     String     | Question frontend ID                |
| question.questionId               |     String     | Question ID                         |
| question.sampleTestCase           |     String     | Question sample testcase            |
| question.similarQuestions         |     String     | similar question(JSON.stringfy)     |
| question.solution                 |     Object     | Question solution Object            |
| question.solution.canSeeDetail    |    Boolean     | is visable detail?                  |
| question.solution.id              |     String     | Question solution ID                |
| question.stats                    |     String     | Question status(all)(JSON.stringfy) |
| *question.status                  |     String     | Question status，require user login |
| question.style                    |     String     | Question style？                    |
| question.title                    |     String     | Question title                      |
| question.titleSlug                |     String     | Question slug                       |
| question.topicTags                | Array[Object]  | Question Topic Set                  |
| question.topicTags.name           |     String     | Question Topic name                 |
| question.topicTags.slug           |     String     | Question Topic slug                 |
| question.topicTags.translatedName |     String     | Question Topic name(Chinese)        |
| question.translatedContent        |     String     | Question content(Chinese)           |
| question.translatedTitle          |     String     | Question title(Chinese)             |
| question.ugcQuestionId            |     String     | Question UGCID?                     |

### Question Status

Type[**With-Cookie**]

```javascript
const $leetcode = new $Leetcode()

;$leetcode.getQuestionStatus().then((res)=>{
    if(res.status == 200)
        const { allQuestionsBeta } = res.data.data
})	// must with cookie [LEETCODE_SESSION,x-csrftoken]
```

Request data:

|    Item    | Value                                         |
| :--------: | :-------------------------------------------- |
|    Type    | `POST`                                        |
| Parameters | `NULL`                                        |
|    URL     | `https://leetcode-cn.com/graphql`             |
|  Require   | `Cookie Item [LEETCODE_SESSION, x-csrftoken]` |

Return Data:

| Key                         |     Value     | Describe               |
| :-------------------------- | :-----------: | :--------------------- |
| allQuestionsBeta            | Array[Object] | Question status Object |
| allQuestionsBeta.questionId |    String     | Question ID            |
| allQuestionsBeta.status     |    String     | Question Status        |

### Submission ID

Type[**With-Cookie-and-Fake-Referer**]

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

> Note that in this Api, Cookies must be carried at `https://leetcode-cn.com/problems/${questionSlug}/submit`, i.e. the URL visited, otherwise the **CSRF** validation of Leetcode will fail. At the same time, the Api also needs to forge the Referer as `https://leetcode-cn.com/problems/${questionSlug}/submissions/`, where the variable questionSlug in the string template is the title, It must be an optional value of `question.TitleSlug` in [Question Details API](#Question-Detail)

Request data:

|    Item    | Value                                                        |
| :--------: | :----------------------------------------------------------- |
|    Type    | `POST`                                                       |
| Parameters | `question_id`, `lang`, `typed_code`, `questionSlug`          |
|    URL     | `https://leetcode-cn.com/problems/${questionSlug}/submit/`   |
|  Require   | `Cookie Item [LEETCODE_SESSION, x-csrftoken]`, `referer [https://leetcode-cn.com/problems/${questionSlug}/submissions/]` |

Parameters:

- `question_id`，Question ID, which must be an optional value of `question.QuestionId` in [Question Details API](#Question Detail).
- `lang`, Question language, which must be an optional value of `question.codeSnippets.langSlug`in [Question Details API](#Question Detail)
- `typed_code`, Running code, test the problem solving code that runs.
- `questionSlug`, Question slug, which must be an optional value of `question.titleSlug` in [Question Details API](#Question Detail)
- <s>`test_mode`</s>, test mode.
- <s>`test_judger`</s>, test judger.

Return Data:

| Key           | Value  | Describe                |
| :------------ | :----: | :---------------------- |
| submission_id | Number | Question Submisstion ID |

### Submission Detail

```javascript
const $leetcode = new $Leetcode()
	,submission_id = 123456789

;$leetcode.getSubumissionStatus(submission_id).then((res)=>{
    if(res.status == 200)
        const { data } = res
}) // can without anything.
```

Request data:

|    Item    | Value                                                        |
| :--------: | :----------------------------------------------------------- |
|    Type    | `GET`                                                        |
| Parameters | `submission_id`                                              |
|    URL     | `https://leetcode-cn.com/submissions/detail/${submissionID}/check/` |
|  Require   | `NULL`                                                       |

Parameters:

- `submission_id`，Submission ID, which must be an optional value of `submission_id` in [Submission ID API](#Submission-ID).

Return Data:

| Key                     |  Value  | Describe                        |
| :---------------------- | :-----: | :------------------------------ |
| data                    | Object  | Question Submission ID          |
| data.compile_error      | String  | Question Compile error          |
| data.elapsed_time       | Number  | Question run time               |
| data.fast_submit        | Boolean | is fast submit                  |
| data.finished           | Boolean | is finished?                    |
| data.full_compile_error | String  | Question Compile error(all)     |
| data.lang               | String  | Question language               |
| data.memory             | Number  | Question memory                 |
| data.memory_percentile  | String? | Question memory percentage      |
| data.pretty_lang        | String  | Question language(pretty)       |
| data.question_id        | String  | Question ID                     |
| data.run_success        | Boolean | is question run successfully    |
| data.runtime_percentile | String? | Question runtime percentage?    |
| data.state              | String  | Question solution state         |
| data.status_code        | Number  | Question solution state code    |
| data.status_memory      | String  | Question solution state memory  |
| data.status_msg         | String  | Question solution state massage |
| data.status_runtime     | String  | Question solution runtime       |
| data.submission_id      | String  | Submisstion ID                  |
| data.task_finish_time   | Number  | Question submit time?           |
| data.task_name          | String  | Question judger name            |
| data.total_correct      | Number? | pass testcase number            |
| data.total_testcases    | Number? | total testcase number           |

