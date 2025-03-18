import subprocess

input_image = "/home/zeal/my cute Hackathons/Standard Chartered Hackathon-March'25/avatar.jpg"  # AI Avatar Image
output_video = "rejected.mp4"
output_audio = "reject.wav"

subprocess.run([
    "python", "Wav2Lip/inference.py", 
    "--checkpoint_path", "Wav2Lip/checkpoints/wav2lip.pth", 
    "--face", input_image,  # Use an image
    "--audio", output_audio, 
    "--outfile", output_video
], check=True)

print(f"Lip-synced video saved as {output_video}")