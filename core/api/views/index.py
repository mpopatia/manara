#! /usr/bin/env python
# coding:utf-8

from core.api import app


@app.route('/api')
def api():
    return "API"
