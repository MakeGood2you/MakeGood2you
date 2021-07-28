import 'firebase/storage';
import db from '../../middleware/firebase/database/api'

export default {


    addQuestionsAndAnswers: async ({commit, dispatch}, data) => {
        if (!data) return
        const entity = `/questionsAndAnswers`
        let key = (await db.create(entity, data)).key
        commit("addQuestionsAndAnswers", {data, key})
    },
    getQuestionsAndAnswers: async ({commit, dispatch}) => {
        const entity = `/questionsAndAnswers`
        const data = await db.get(entity)
        commit(`setQuestionsAndAnswers`, data)
    },
    removeQuestionAndAnswerAction: async ({commit, dispatch}, key) => {
        const entity = `/questionsAndAnswers/${key}`
        const res = await db.remove(entity)
        commit(`removeQuestionsAndAnswers`, key)
    },

}
