import axios from "axios"
import { AxiosResponse } from "axios"

const APIKEY = "f29d30784b3570dd4494fef02db5780f"
const getGarbageMessage = async (word: string) => {
    const url = `http://api.tianapi.com/huayu/index?key=${APIKEY}&word=${word}`
    await axios.get(url).then((res: AxiosResponse<Response>) => {
	const { data } = res;
	return data.newlist[0].content
    }).catch(err => {
	console.log(err)
    })
}

const getEnglishWords = async (word: string) => {
    const url = `http://api.tianapi.com/huayu/index?key=${APIKEY}&word=${word}`
    await axios.get(url).then((res: AxiosResponse<Response>) => {
	const { data } = res;
	return data.newlist[0].content
    }).catch(err => {
	console.log(err)
    })
}

const getNightGreets = async () =>  {
    const url = `http://api.tianapi.com/wanan/index?key=${APIKEY}`
    await axios.get(url).then((res: AxiosResponse<Response>) => {
	const { data } = res;
	return data.newlist[0].content
    }).catch(err => {
	console.log(err)
    })
}

type Response = {
    newlist: Content[]
}

type Content = {
    content: string
}

export { getGarbageMessage, getEnglishWords, getNightGreets }
