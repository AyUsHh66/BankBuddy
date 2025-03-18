import edge_tts
import asyncio
import subprocess
text_script = "Now we need to collect some documents to verify your information. The process is simple - you can upload photos or scans directly from your device. For all applications, we require: 1. Your PAN Card 2. Aadhaar Card 3. A recent passport-sized photograph Please ensure all documents are clear, with all corners visible. Click 'Upload' for each document when you're ready."

voice = "en-US-JennyNeural"  # Female voice
output_audio = "document_collection.wav"

async def generate_speech():
    tts = edge_tts.Communicate(text_script, voice)
    await tts.save(output_audio)

asyncio.run(generate_speech())