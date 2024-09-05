from flask import Flask, request, jsonify
import google.generativeai as genai
import whisper
import os
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# CORS configuration
# cors_origin = os.getenv("CORS_ORIGIN", "http://localhost:3000")  # Default to localhost if not set
# CORS(app, origins=[cors_origin])  # Allow your frontend origin
CORS(app)

# Configure Google Generative AI
api_key = os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=api_key)

def upload_to_gemini(path, mime_type='image\png'):
    file = genai.upload_file(path, mime_type=mime_type)
    return file

def generate_content_from_image(file_uri):
    generation_config = {
        "temperature": 0.9,
        "top_p": 0.95,
        "top_k": 32,
        "max_output_tokens": 1024,
        "response_mime_type": "text/plain",
    }
    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=generation_config,
    )
    response = model.generate_content([file_uri, "extract the text from the image"])
    return response.text

def generate_product_info(text):
    model = genai.GenerativeModel('gemini-1.5-flash')
    prompt = "You are a famous product information provider for helping people know everything about their product, who can help them understand everything about their product. Just give them info about everything and every purpose the product exists. Try not to give them any useless information they do not need and be as creative as possible. The user should feel like they do not have to search more to know about the product. For convenience, you are provided with the product info and tell them few factual information randomly to the user. You write short (about 60 words) along with the facts as points. You can use the following data we collected from an image to text form to give them the information:"
              
    response = model.generate_content(prompt + text)
    print(response.text)
    return response.text

# Load the Whisper model
whisper_model = whisper.load_model("base")

# Directory to save uploaded audio files
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Create directory if it doesn't exist

@app.route('/')
def golu():
    return "Hello, World!"

@app.route('/golu')
def hello_world():
    return "Hello, Golu!"

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        # Save the incoming audio file locally in the uploads folder
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)
        print("path is :  " , file_path )
        
        # Perform transcription using Whisper on the saved file directly
        result = whisper_model.transcribe(file_path)

        # Return the transcription result as a JSON response
        response = jsonify({"transcription": result['text'], "file_saved": file_path})
        
        # Delete the recorded audio file
        os.remove(file_path)

        return response

    except Exception as e:
        # Print the error for debugging and return it as a JSON response
        print(f"Error found: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/img', methods=['POST'])
def img_route():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        # Save the incoming image file locally in the uploads folder
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)
        print("file path : ", file_path)
        
        file_uri = [upload_to_gemini(file_path , 'image/png')]
        text_from_image = generate_content_from_image(file_uri[0])
        
        # Delete the uploaded image file
        os.remove(file_path)
        print(text_from_image)

        product_info = generate_product_info(text_from_image)
        return jsonify({"text": product_info})

    except Exception as e:
        # Print the error for debugging and return it as a JSON response
        print(f"Error found: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/text', methods=['POST'])
def text_route():
    data = request.json
    if 'text' not in data:
        return jsonify({"error": "No text provided"}), 400

    text = data['text']
    product_info = generate_product_info(text)

    return jsonify({"info": product_info})


# @app.route('/process-command', methods=['POST'])
# def process_command():
#     data = request.get_json()
#     command = data.get('command')

#     # Process the command here (e.g., trigger app actions based on command)
#     if 'open' in command:
#         return jsonify({'action': 'send_msg'})
#     elif 'close' in command:
#         return jsonify({'action': 'Closing something...'})
#     else:
#         return jsonify({'action': 'Command not recognized'})

if __name__ == '__main__':
    app.run(debug=True)