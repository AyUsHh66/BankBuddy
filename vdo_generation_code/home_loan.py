import edge_tts
import asyncio
import subprocess
text_script = "You've selected a Home Loan. Let's gather some information about the property and your requirements. Please provide: 1. The property type: Is it a flat, independent house, or plot of land? 2. The approximate value of the property 3. How much loan amount you require 4. Your preferred repayment tenure, between 5 and 30 years Remember, longer tenures mean lower EMIs but more interest paid over time. Please make your selections below."

voice = "en-US-JennyNeural"  # Female voice
output_audio = "home_loan.wav"

async def generate_speech():
    tts = edge_tts.Communicate(text_script, voice)
    await tts.save(output_audio)

asyncio.run(generate_speech())