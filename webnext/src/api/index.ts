export const getVideosBasedOnQuery = async (query: string) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/searchvideo?q=${query}`)
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
        const response = await fetch(`http://127.0.0.1:5000/startchatwithvideo?videoid=${videoID}`)
        const data = await response.json()
        console.log(data)
        return { success: true }
    } catch (error) {
        console.error('Error:', error)
        return { success: false, error: "Issue in server !" }
    }
}
