import edge_tts
import asyncio
import subprocess
text_script = "Now I need to understand your financial situation to determine the best loan options for you. Please tell me: . Are you salaried or self-employed? 2. What is your monthly income? 3. How many years have you been in your current job or business? 4. Do you have any existing loans or EMIs? This information helps us determine your eligibility and suitable loan amount. Please fill in the details below."
voice = "en-US-JennyNeural"  # Female voice
output_audio = "income_verification.wav"

async def generate_speech():
    tts = edge_tts.Communicate(text_script, voice)
    await tts.save(output_audio)

asyncio.run(generate_speech())