const URL = 'http://127.0.0.1:5000'
// const URL = 'https://vidchatbackend.vercel.app'
export const getVideosBasedOnQuery = async (query: string) => {
    try {
        const response = await fetch(`${URL}/searchvideo?q=${query}`)
        const data = await response.json()
        const dat = JSON.parse(data)
        console.log(dat)
        return { success: true, data: dat.videos }
    } catch (error) {
        console.error('Error:', error)
        return { success: false, error: "Issue in server !" }
    }
}

export const getVideosBasedOnURL = async (query: string) => {
    try {
        const response = await fetch(`${URL}/searchdirecturl?q=${query}`)
        const data = await response.json()
        const dat = JSON.parse(data)
        console.log(dat)
        return { success: true, data: dat.videos }
    } catch (error) {
        console.error('Error:', error)
        return { success: false, error: "Issue in server !" }
    }
}

export const GetVideoIntoText = async (videoID: string) => {
    try {
        const response = await fetch(`${URL}/startchatwithvideo?videoid=${videoID}`)
        const data = await response.json()
        if(response.status===500){
            return { success: false , error:"Some Issue With Server"}
        }
        console.log(data.text)
        return { success: true, text: data.text }
    } catch (error) {
        console.error('Error:', error)
        return { success: false, error: "Issue in server !" }
    }
}
