import edge_tts
import asyncio
import subprocess
text_script = "Congratulations on accepting your loan offer! Here are the next steps: 1. Digital signature: You'll receive a secure link to sign your loan agreement digitally 2. Bank verification: We'll conduct a quick verification call within 24 hours 3. Disbursement: Once verified, your loan will be disbursed directly to your account within [timeframe] You can track the status of your application through our mobile app or website using your application reference number: [Number]. Do you have any questions about the next steps? If not, click 'Complete Application' below."

# Choose a professional voice (Example: "en-US-GuyNeural" or "en-GB-RyanNeural")
voice = "en-US-JennyNeural"  # Female voice
output_audio = "acceptance_nxt.wav"

async def generate_speech():
    tts = edge_tts.Communicate(text_script, voice)
    await tts.save(output_audio)

asyncio.run(generate_speech())