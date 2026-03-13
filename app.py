from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
import os

app = Flask(__name__)

# --- CONFIGURATION ---
# Replace with your actual Google Gemini API Key
GEMINI_API_KEY = "ADD YOUR API KEY HERE"

# Configure the library
genai.configure(api_key=GEMINI_API_KEY)

# Initialize the model (Gemini 1.5 Flash is fast and good for chat)
model = genai.GenerativeModel('gemini-2.5-flash')


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/get_response", methods=["POST"])
def get_response():
    user_input = request.json.get("message")

    try:
        # 1. Send message to Gemini
        # We use .text to get the string response directly
        response = model.generate_content(user_input)

        # 2. Extract text
        bot_response = response.text

    except Exception as e:
        print(f"Error: {e}")
        bot_response = "Sorry, I am having trouble connecting to Gemini right now."

    return jsonify({"response": bot_response})


if __name__ == "__main__":
    app.run(debug=True)
