import io
import json
import matplotlib.pyplot as plt
import librosa
import librosa.display
import IPython.display
from PIL import Image
from flask import jsonify
import base64

from matplotlib_inline.backend_inline import FigureCanvas


class AudioAnalysis:
    def plotAudio(self, data):
        y, sr = librosa.load("/usr/local/var/www/audios/file_example_WAV_2MG.wav", duration=10)
        IPython.display.Audio(data=y, rate=sr)
        fig, ax = plt.subplots(nrows=3, sharex=True)
        librosa.display.waveshow(y, sr=sr, ax=ax[0])
        ax[0].set(title='Envelope view, mono')
        ax[0].label_outer()

        y, sr = librosa.load(librosa.ex('choice', hq=True), mono=False, duration=10)
        librosa.display.waveshow(y, sr=sr, ax=ax[1])
        ax[1].set(title='Envelope view, stereo')
        ax[1].label_outer()
        IPython.display.Audio(data=y, rate=sr)

        y, sr = librosa.load("/usr/local/var/www/audios/file_example_WAV_2MG.wav", duration=10)
        y_harm, y_perc = librosa.effects.hpss(y)
        librosa.display.waveshow(y_harm, sr=sr, alpha=0.5, ax=ax[2], label='Harmonic')
        librosa.display.waveshow(y_perc, sr=sr, color='r', alpha=0.5, ax=ax[2], label='Percussive')
        ax[2].set(title='Multiple waveforms')
        ax[2].legend()
        IPython.display.Audio(data=y, rate=sr)
        # Zooming in on a plot to show raw sample values

        fig, (ax, ax2) = plt.subplots(nrows=2, sharex=True)
        ax.set(xlim=[6.0, 6.01], title='Sample view', ylim=[-0.2, 0.2])
        librosa.display.waveshow(y, sr=sr, ax=ax, marker='.', label='Full signal')
        librosa.display.waveshow(y_harm, sr=sr, alpha=0.5, ax=ax2, label='Harmonic')
        librosa.display.waveshow(y_perc, sr=sr, color='r', alpha=0.5, ax=ax2, label='Percussive')
        ax.label_outer()
        ax.legend()
        ax2.legend()

        #plt.show()
        #plt.savefig("plot.jpg")
        #im = Image.open("plot.jpg")
        #buf = io.BytesIO()
        #im.save(buf, format='JPEG')
        #byte_im = buf.getvalue()
        #return byte_im

        pngImage = io.BytesIO()
        FigureCanvas(fig).print_png(pngImage)
        pngImageB64String = "data:image/png;base64,"
        pngImageB64String += base64.b64encode(pngImage.getvalue()).decode('utf8')


        #encoded = base64.b64encode(byte_im)
        #print(encoded)
        result = {"imageData": pngImageB64String}
        #response = jsonify(result)
        #response.headers.add('Access-Control-Allow-Origin', '*')
        return jsonify(result)

