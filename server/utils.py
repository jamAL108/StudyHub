import random
import string
from moviepy.editor import VideoFileClip
import os
from openai import OpenAI
import assemblyai as aai

aai.settings.api_key = "9807cc31f3b446ff96b656fbc55145dd"


def generate_random_filename(length=10):
    """Generate a random filename."""
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))

def getAudioFromVideo(file_path):
    mp3 = generate_random_filename() + ".mp3"
    mp3_file = os.path.join('user_audio',mp3)
    video_clip = VideoFileClip(file_path)
    audio_clip = video_clip.audio
    audio_clip.write_audiofile(mp3_file)
    return mp3


def AudioTotext(audio_file):
    transcriber = aai.Transcriber()
    transcript = transcriber.transcribe(os.path.join('user_audio',audio_file))
    print(transcript.text)
    return transcript.text

