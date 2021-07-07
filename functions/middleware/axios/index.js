const axios = require("axios");

export default {
    post
}
const post = async (options) => {
    const result = await axios.post(`${options.api}/${options.entity}`,options.data)
    return result.data
}