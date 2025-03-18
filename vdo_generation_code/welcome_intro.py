import edge_tts
import asyncio
import subprocess
text_script = "Hello and welcome to [Bank Name]'s Virtual Loan Center. I'm [Name], your AI Branch Manager, and I'll be guiding you through your loan application process today.During this session, we'll identify the right loan for your needs, collect necessary documents, and check your eligibility—all without you needing to visit a branch. The process should take about 10-15 minutes, and you can pause and resume at any time. All your information is secure and encrypted. Are you ready to begin? Please click 'Start Application' below when you're ready."
voice = "en-US-JennyNeural"  # Female voice
output_audio = "welcome_intro.wav"

async def generate_speech():
    tts = edge_tts.Communicate(text_script, voice)
    await tts.save(output_audio)

asyncio.run(generate_speech())