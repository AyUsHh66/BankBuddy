import edge_tts
import asyncio
import subprocess

text_script = "YGreat news! Based on the information provided, your loan application has been approved. Here are the details of your offer: 1. Approved loan amount: [Amount] 2. Interest rate: [Rate]% per annum 3. Tenure: [Years/Months] 4. Monthly EMI: [Amount] 5. Processing fee: [Amount] To proceed, please review the complete loan offer document available for download. If you're satisfied with the terms, click 'Accept Offer' to continue with the final steps."

voice = "en-US-JennyNeural"  # Female voice
output_audio = "approved.wav"

async def generate_speech():
    tts = edge_tts.Communicate(text_script, voice)
    await tts.save(output_audio)

asyncio.run(generate_speech())