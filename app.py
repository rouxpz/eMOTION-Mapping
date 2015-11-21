from flask import Flask
from flask import render_template, request
import os, time

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def emotion():
	if request.method == 'POST':
		timestamp = str(time.time())
		latitude = request.form['latitude']
		longitude = request.form['longitude']
		feeling = request.form['feeling']
		timestamp = timestamp
		txt = open('philly1021.txt', 'a')
		txt.write(feeling + '|' + latitude + '|' + longitude + '|' + timestamp)
		txt.write('\n')
		txt.close()
		return render_template("thanks.html")
	else:	
		return render_template('index.html')

if __name__ == '__main__':
	app.debug = True
	port = int(os.environ.get('PORT', 5000)) #locally runs on 5000, heroku assigns own port
	app.run(host='0.0.0.0', port=port)