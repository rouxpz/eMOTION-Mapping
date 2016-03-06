from flask import Flask, request, render_template, redirect, abort
import os, csv
from datetime import datetime
from collections import Counter
from flask.ext.mongoengine import MongoEngine

locations = ['boston', 'baltimore', 'philly']
emotions = []
positive = ['joy', 'trust', 'surprise', 'anticipation']
negative = ['fear', 'anger', 'sadness', 'disgust']

with open('NRC-emotion-lexicon-wordlevel-alphabetized-v0.92.txt', 'rb') as f:
	reader = csv.reader(f, delimiter="\t")
	for row in reader:
		if row[2] == "1":
			if len(emotions) == 0:
				emotions.append([row[0], row[1]])
			else:
				for i in range(len(emotions)-1, len(emotions)):
					if row[0] in emotions[i]:
						emotions[i].append(row[1])
						continue
					else:
						emotions.append([row[0], row[1]])

# print "Emotions loaded!"

app = Flask(__name__)
app.config['CSRF_ENABLED'] = False
app.config['MONGODB_SETTINGS'] = {'HOST':os.environ.get('MONGOLAB_URI'),'DB': 'heroku_2b6wmdnk'}
app.logger.debug("Connecting to MongoLabs")
db = MongoEngine(app)

import models

@app.route('/')
def main():
	return redirect('/boston')

@app.route('/map')
def map():
	templateData = {
		'mapData' : models.Emotion.objects()
	}
	return render_template("map.html", **templateData)

@app.route('/<string:location>')
def instructions(location):
	if location in locations:
		if location == "philly":
			templateData = {
				'location' : 'Philadelphia'
			}
		else:
			templateData = {
				'location' : location.capitalize()
			}
		return render_template('instructions.html', **templateData)
	else:
		return render_template('404.html')

@app.route('/submit', methods=['GET', 'POST'])
def emotion():
	if request.method == 'POST':
		emo = models.Emotion()
		emo.latitude = request.form.get('latitude')
		emo.longitude = request.form.get('longitude')
		feeling = emo.feeling = request.form.get('feeling')
		emo.timestamp = dt = datetime.now()

		feeling = feeling.lower()
		feeling = feeling.replace(".", '').replace("!", "").replace(',', '').replace(";", '').replace('?', '').replace('"', '').replace("'", '').replace('$', '')
		splitText = feeling.split(' ')
		print splitText

		aggregateEmotions = []
		r = g = b = 154

		for e in emotions:
			for t in splitText:
				if t == e[0]:
					# print e
					for i in range(1, len(e)):
						aggregateEmotions.append(e[i])

		print aggregateEmotions
		words = Counter(aggregateEmotions).keys()
		vals = Counter(aggregateEmotions).values()

		print words
		print vals

		for i in range(len(words)):
			if words[i] in positive:
				r = r - 12*vals[i]
				g = g + 12*vals[i]
			elif words[i] in negative:
				r = r + 12*vals[i]
				g = g - 12*vals[i]
			elif words[i] == 'positive':
				b = b + int(3.6*vals[i])
			else:
				b = b - int(3.6*vals[i])

		if r > 212:
			r = 212
		elif r < 96:
			r = 96

		if g > 212:
			g = 212
		elif g < 96:
			g = 96

		if b > 172:
			b = 172
		elif b < 135:
			b = 135

		# print str(r) + ", " + str(g) + ", " + str(b)
		colorHex = str('#%02x%02x%02x') % (r, g, b)
		# print colorHex

		emo.hexcode = colorHex
		# print emo.latitude
		emo.save()
		return render_template("thanks.html")

	else:
		dt = datetime.now()
		if dt.day == 5 or dt.day == 12 or dt.day == 19:
			if dt.hour >= 9 and dt.hour < 15:
				return render_template('index.html')
			elif dt.hour >= 17 and dt.hour < 23:
				return render_template('index.html')
			else:
				return render_template('nosaveallowed.html')
		else:
			return render_template('nosaveallowed.html')

if __name__ == '__main__':
	app.debug = False
	port = int(os.environ.get('PORT', 5000)) #locally runs on 5000, heroku assigns own port
	app.run(host='0.0.0.0', port=port)