import edge_tts
import asyncio
import subprocess
text_script = "For your home loan application, we also need documents related to the property: 1. Property purchase agreement or sale deed 2. Property valuation report (if available) 3. Property insurance details (if available) 4. Building approval plan (for new constructions) These documents help us verify the property's value and legality. Please upload what you have available now - additional documents can be provided later if needed."
voice = "en-US-JennyNeural"  # Female voice
output_audio = "property_doc.wav"

async def generate_speech():
    tts = edge_tts.Communicate(text_script, voice)
    await tts.save(output_audio)

asyncio.run(generate_speech())