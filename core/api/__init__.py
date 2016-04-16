#! /usr/bin/env python
# coding:utf-8

import os
import configparser
import subprocess

from flask import Flask
from flask.ext.pymongo import PyMongo
from flask.ext.cors import CORS

app = Flask(__name__)
CORS(app)

app.config['MONGO_DBNAME'] = 'manara'

mongo_client = PyMongo(app)

class Config:
    # FIXME
    HOST = "http://localhost:3000"
    GIT_ROOT = subprocess.Popen(['git', 'rev-parse', '--show-toplevel'], stdout=subprocess.PIPE).communicate()[0] \
        .rstrip().decode('utf-8')

    config = configparser.ConfigParser()
    config.read(
        os.path.join(GIT_ROOT, 'config.ini')
    )

    CONSUMER_KEY = config['TWITTER']['CONSUMER_KEY']
    CONSUMER_SECRET = config['TWITTER']['CONSUMER_SECRET']
    ACCESS_TOKEN_KEY = config['TWITTER']['ACCESS_TOKEN_KEY']
    ACCESS_TOKEN_SECRET = config['TWITTER']['ACCESS_TOKEN_SECRET']