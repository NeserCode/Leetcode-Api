"use strict"
import Axios from "axios"

class $Leetcode {

    //实例预设值
    name = `Leetcode Api`
    host = `https://leetcode-cn.com/`
    GitHub_Link = `https://github.com/NeserCode/Leetcode-Api`

    //实例化对象
    constructor() {
        console.log(`🙇‍ 感谢使用 ${this.name} \n🔗 Github项目地址 ${this.GitHub_Link} \n⭐ 欢迎 star issue `);
    }

    //获取题库
    getQuestionSet = async (categorySlug, skip, limit) => {
        var config = {
            method: 'post',
            url: `${this.host}graphql/`,
            data: JSON.stringify({
                "query": "\n    query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {\n  problemsetQuestionList(\n    categorySlug: $categorySlug\n    limit: $limit\n    skip: $skip\n    filters: $filters\n  ) {\n    total\n    questions {\n      acRate\n      difficulty\n    solutionNum\n     title\n      titleCn\n      titleSlug\n   }\n  }\n}\n",
                "variables": {
                    "categorySlug": categorySlug ?? "",
                    "skip": skip ?? 0,
                    "limit": limit ?? 30,
                    "filters": {}
                }
            })
        };
        return Axios(config)
    }

    //获取题目详情
    getQuestion = async (slug) => {
        var config = {
            method: 'post',
            url: `${this.host}graphql/`,
            data: JSON.stringify({
                "operationName": "questionData",
                "variables": {
                    "titleSlug": slug
                },
                "query": "query questionData($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    questionId\n    questionFrontendId\n    categoryTitle\n    boundTopicId\n    title\n    titleSlug\n    content\n    translatedTitle\n    translatedContent\n    isPaidOnly\n    difficulty\n    likes\n    dislikes\n    isLiked\n    similarQuestions\n    contributors {\n      username\n      profileUrl\n      avatarUrl\n      __typename\n    }\n    langToValidPlayground\n    topicTags {\n      name\n      slug\n      translatedName\n      __typename\n    }\n    companyTagStats\n    codeSnippets {\n      lang\n      langSlug\n      code\n      __typename\n    }\n    stats\n    hints\n    solution {\n      id\n      canSeeDetail\n      __typename\n    }\n    status\n    sampleTestCase\n    metaData\n    judgerAvailable\n    judgeType\n    mysqlSchemas\n    enableRunCode\n    envInfo\n    book {\n      id\n      bookName\n      pressName\n      source\n      shortDescription\n      fullDescription\n      bookImgUrl\n      pressImgUrl\n      productUrl\n      __typename\n    }\n    isSubscribed\n    isDailyQuestion\n    dailyRecordStatus\n    editorType\n    ugcQuestionId\n    style\n    exampleTestcases\n    __typename\n  }\n}\n"
            })
        };
        return Axios(config)
    }

    //获取题目状态（仅状态）
    getQuestionStatus = async () => {
        var config = {
            method: 'post',
            url: `${this.host}graphql/`,
            data: JSON.stringify({
                "operationName": "allQuestionsStatuses",
                "variables": {},
                "query": "query allQuestionsStatuses {\n  allQuestionsBeta {\n    ...questionStatusFields\n    __typename\n  }\n}\n\nfragment questionStatusFields on QuestionNode {\n  questionId\n  status\n  __typename\n}\n"
            })
        };
        return Axios(config)
    }

    //获取对应提交ID的处理详情
    getSubumissionStatus = (submissionID) => {
        var config = {
            method: 'get',
            url: `${this.host}submissions/detail/${submissionID}/check/`,
        };
        return Axios(config)
    }

    //获取用户状态
    getUserStatus = () => {
        var config = {
            method: 'post',
            url: `${this.host}graphql/`,
            data: JSON.stringify({
                "query": "\n    query globalData {\n  userStatus {\n    isSignedIn\n    isPremium\n    username\n    realName\n    avatar\n    userSlug\n    isAdmin\n    useTranslation\n    premiumExpiredAt\n    isTranslator\n    isSuperuser\n    isPhoneVerified\n    isVerified\n  }\n  jobsMyCompany {\n    nameSlug\n  }\n  commonNojPermissionTypes\n}\n    ",
                "variables": {}
            })
        };
        return Axios(config)
    }

    //获取题目提交后的ID  ! 需要伪造Referer
    getSubmissionID = (question_id, lang, typed_code, questionSlug) => {
        // Electron 中伪造 referer 的方法示例：

        // session.defaultSession.webRequest.onBeforeSendHeaders({ urls: [`${this.host}problems/*`] }, (details, callback) => {
        //     details.requestHeaders['Referer'] = `${this.host}problems/${questionSlug}/submissions/`
        //     callback({ cancel: false, requestHeaders: details.requestHeaders })
        // })

        var config = {
            method: 'post',
            url: `${this.host}problems/${questionSlug}/submit/`,
            data: JSON.stringify({
                "question_id": question_id,
                "lang": lang,
                "typed_code": typed_code,
                "test_mode": false,
                "test_judger": "",
                "questionSlug": questionSlug
            })
        };
        return Axios(config)
    }
}

export default $Leetcode