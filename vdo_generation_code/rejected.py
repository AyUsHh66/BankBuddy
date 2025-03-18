import edge_tts
import asyncio
import subprocess
text_script = "Thank you for applying with us. After careful review of your application, we are unable to approve your loan request at this time. This decision is based on: a low credit score of 580 and high existing financial commitments. Please note that this doesn't affect future applications with us. You may reapply after 6 months or once your financial situation has improved. If you'd like to explore other options that might be suitable for your current situation, please click 'Show Alternatives' below."
voice = "en-US-JennyNeural"  # Female voice
output_audio = "reject.wav"

async def generate_speech():
    tts = edge_tts.Communicate(text_script, voice)
    await tts.save(output_audio)

asyncio.run(generate_speech())