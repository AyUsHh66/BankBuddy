import edge_tts
import asyncio
import subprocess

# Step 1: Generate speech from text
text_script = """Thank you for completing your loan application with LoanBuddy.
Your application has been successfully submitted, and you will receive updates via SMS and email.
Your application reference number is: XXXXXXXRJ45NBXXX235 - please save this for future reference.
If you have any questions or need assistance, our customer service team is available 24/7 at 1800 452 236 842 or via email at loanbuddy25@gmail.com.
We appreciate your choosing LoanBuddy for your financial needs. Have a great day!"""

# Choose a professional voice (Example: "en-US-GuyNeural" or "en-GB-RyanNeural")
voice = "en-US-JennyNeural"  # Female voice
output_audio = "appl_complete.wav"

async def generate_speech():
    tts = edge_tts.Communicate(text_script, voice)
    await tts.save(output_audio)

asyncio.run(generate_speech())
