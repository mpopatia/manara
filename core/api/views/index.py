#! /usr/bin/env python
# coding:utf-8

import json

from flask import request, Response
from werkzeug.exceptions import BadRequest
from core.api import mongo_client

from core.api import app


@app.route('/api/push', strict_slashes=False, methods=['POST'])
def push():
    __data__ = [
        'timestamp',
        'GPS',
        'ID'
    ]

    data = request.get_json()

    for each in __data__:
        if each not in data:
            raise BadRequest("Invalid POST data")

    mongo_client.db.activity.insert_one(
        data
    )

    return Response(
        json.dumps({'data': None}, indent=4),
        mimetype="application/json"
    )
