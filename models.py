# mongoengine database module
from mongoengine import *
from datetime import datetime
import logging

class Emotion(Document):
	latitude = StringField()
	longitude = StringField()
	feeling = StringField(required=True)
	timestamp = DateTimeField(default=datetime.now())
	hexcode = StringField()
