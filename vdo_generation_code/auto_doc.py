import edge_tts
import asyncio
import subprocess

text_script = "For your auto loan application, we also need documents related to the vehicle: 1. Proforma invoice from the dealer (for new vehicles) 2. RC book and insurance details (for used vehicles) 3. Quotation with vehicle details and on-road price These documents help us verify the vehicle's value. Please upload what you have available now."

voice = "en-US-JennyNeural"  # Female voice
output_audio = "auto_doc.wav"

async def generate_speech():
    tts = edge_tts.Communicate(text_script, voice)
    await tts.save(output_audio)

asyncio.run(generate_speech())