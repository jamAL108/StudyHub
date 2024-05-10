import { youtubeExtractstring , shrinkText , formatViews , validateEmail , extractEmailPrefix  , isYouTubeURL} from './string'
import  ModelConfig from './model'

/// exports 

export const YoutubeExtractVideoID = youtubeExtractstring;
export const ShrinkTitle = shrinkText
export const FormatVideoViews = formatViews
export const validateEmailInput = validateEmail
export const extractEmailInputPrefix = extractEmailPrefix
export const isStringYouTubeURL = isYouTubeURL

export const geminiModel = ModelConfig