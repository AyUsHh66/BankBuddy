import edge_tts
import asyncio
import subprocess
text_script = "Before we proceed, I need to verify your identity. This helps us maintain the security of your application and protects your personal information. Please look directly at your camera for a few seconds while we capture your image. This will be used throughout your application for verification. Please ensure you're in a well-lit area and remove any sunglasses or headwear that might obscure your face. When you're ready, click 'Begin Verification' and look at the camera."
voice = "en-US-JennyNeural"  # Female voice
output_audio = "identity_verification.wav"

async def generate_speech():
    tts = edge_tts.Communicate(text_script, voice)
    await tts.save(output_audio)

asyncio.run(generate_speech())