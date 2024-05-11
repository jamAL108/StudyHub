export const getVideosBasedOnQuery = async (query: string) => {
    try {
        const response = await fetch(`https://vidchatbackend.vercel.app/searchvideo?q=${query}`)
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
        const response = await fetch(`https://vidchatbackend.vercel.app/searchdirecturl?q=${query}`)
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
        const response = await fetch(`https://vidchatbackend.vercel.app/startchatwithvideo?videoid=${videoID}`)
        const data = await response.json()
        console.log(data.text)
        return { success: true, text: data.text }
    } catch (error) {
        console.error('Error:', error)
        return { success: false, error: "Issue in server !" }
    }
}
