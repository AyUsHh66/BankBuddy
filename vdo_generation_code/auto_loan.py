import edge_tts
import asyncio
import subprocess
text_script = "You've selected an Auto Loan. Let's get some details about the vehicle you wish to purchase. Please provide: 1. Vehicle type: New or used 2. Make and model of the vehicle 3. The on-road price or expected purchase price 4. Your preferred loan amount and tenure (between 1 and 7 years) Once you provide these details, we'll move forward with your application. Please make your selections below."

# Choose a professional voice (Example: "en-US-GuyNeural" or "en-GB-RyanNeural")
voice = "en-US-JennyNeural"  # Female voice
output_audio = "auto_loan.wav"

async def generate_speech():
    tts = edge_tts.Communicate(text_script, voice)
    await tts.save(output_audio)

asyncio.run(generate_speech())