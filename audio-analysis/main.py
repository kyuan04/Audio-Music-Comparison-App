import json

from flask import Flask, request, jsonify
from flask_cors import CORS
import librosa
import librosa.display

from AudioAnalysis import AudioAnalysis

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/api/v1/compare', methods=['POST'])
def compare_audio():
    #soundTrack1 = request.json["soundTrack1"]
    #soundTrack2 = request.json["soundTrack2"]
    audioModels = AudioAnalysis()
    try:
        output = audioModels.plotAudio(None)
    except Exception as e:
        print(e)
        output = {"Error": str(e)}

    return output


@app.route('/api/v1/healthcheck', methods=['GET'])
def health_check():
    return {"status": "OK"}


if __name__ == '__main__':
    app.run(host='localhost', port=8084, debug=True)
