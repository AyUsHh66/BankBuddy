import edge_tts
import asyncio
import subprocess
text_script = "You've selected a Personal Loan. These are unsecured loans that can be used for almost any purpose. Please tell me: 1. How much would you like to borrow? Our personal loans range from ₹50,000 to ₹20 lakhs. 2. What is the purpose of your loan? This helps us tailor our offer to your needs. 3. What repayment tenure would you prefer? We offer terms between 12 and 60 months. The longer your tenure, the lower your monthly payments will be, but you'll pay more interest overall. Please make your selections below."
voice = "en-US-JennyNeural"  # Female voice
output_audio = "personal_loan.wav"

async def generate_speech():
    tts = edge_tts.Communicate(text_script, voice)
    await tts.save(output_audio)

asyncio.run(generate_speech())