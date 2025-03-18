import edge_tts
import asyncio
import subprocess
text_script = "Thank you for providing all the necessary information and documents. I'm now going to check your loan eligibility based on: 1. Your income and existing financial commitments 2. The loan amount requested and tenure 3. Your credit history and repayment capacity 4. Value of the asset (for secured loans) This will take just a few moments. Please wait while our system processes your application."

voice = "en-US-JennyNeural"  # Female voice
output_audio = "eligibility_check.wav"

async def generate_speech():
    tts = edge_tts.Communicate(text_script, voice)
    await tts.save(output_audio)

asyncio.run(generate_speech())