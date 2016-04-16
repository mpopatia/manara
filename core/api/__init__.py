#! /usr/bin/env python
# coding:utf-8

import subprocess

from flask import Flask
from flask.ext.pymongo import PyMongo

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'manara'

mongo_client = PyMongo(app)


class Config:
    # FIXME
    HOST = "http://localhost:3000"
    GIT_ROOT = subprocess.Popen(['git', 'rev-parse', '--show-toplevel'], stdout=subprocess.PIPE).communicate()[0] \
        .rstrip().decode('utf-8')
