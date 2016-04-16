#! /usr/bin/env python
# coding:utf-8

import json

from flask import request, Response
from werkzeug.exceptions import BadRequest

from core.api import app
from core.api import mongo_client
from core.api.utils.Time import get_current_local_time

from core.api.utils.Twitter import *


@app.route('/api/event/create', strict_slashes=False, methods=['POST'])
def create_event():
    __data__ = [
        'GPS',
        'ID'
    ]

    data = request.get_json()

    for each in __data__:
        if each not in data:
            raise BadRequest("Invalid POST data")

    data['timestamp'] = get_current_local_time()

    mongo_client.db.activity.insert_one(
        data
    )

    return Response(
        json.dumps({'message': "Successful"}, indent=4),
        mimetype="application/json"
    )


@app.route('/api/activity/<_id>', strict_slashes=False, methods=['GET'])
def upsert_activity(_id):
    location = '24.523272,54.434817,1mi'

    tweets = get_tweets_by_GPS(
        location,
        text_only=False
    )

    if _id == 'create':
        data = {
            "_id": get_major_hashtag(tweets),
            "count": 0,
            "volume": [],
            "sentiment": get_sentiment(tweets),
            "start": get_current_local_time(),
            "images": [
                "https://t.co/HQe2gnfDRh",
                "https://t.co/bckjGT2a2K",
                "https://t.co/LdAcgxowZc",
                "https://t.co/2rIJMJ34TB"
            ],
            "location": {
                "lat": location.split(',')[0],
                "lng": location.split(',')[1]
            },
            "tweets": get_tweets_by_GPS(location)
        }

        _id = mongo_client.db.activity.insert(
            data
        )

        return Response(
            json.dumps({'_id': _id}, indent=4),
            mimetype="application/json"
        )
    else:
        resp = mongo_client.db.activity.find_one(
            {
                '_id': _id
            }
        )

        count = resp['count']
        volume = [] if resp['volume'] is None else resp['volume']

        data = {
            "_id": _id,
            "count": count,
            "volume": volume,
            "sentiment": get_sentiment(tweets),
            "start": resp['start'],
            "images": [
                "https://t.co/HQe2gnfDRh",
                "https://t.co/bckjGT2a2K",
                "https://t.co/LdAcgxowZc",
                "https://t.co/2rIJMJ34TB"
            ],
            "location": {
                "lat": location.split(',')[0],
                "lng": location.split(',')[1]
            },
            "tweets": get_tweets_by_GPS(location)
        }

        mongo_client.db.activity.remove(
            {
                '_id': _id
            }
        )

        mongo_client.db.activity.insert_one(
            data
        )

        return Response(
            json.dumps(
                data,
                indent=4),
            mimetype="application/json"
        )


@app.route('/api/count/<_id>', strict_slashes=False, methods=['GET'])
def increase_count(_id):
    resp = mongo_client.db.activity.find_one(
        {
            '_id': _id
        }
    )

    mongo_client.db.activity.remove(
        {
            '_id': _id
        }
    )

    resp['count'] += 1
    resp['volume'].append(
        {
            'timestamp': get_current_local_time(),
            'value': resp['count']
        }
    )

    mongo_client.db.activity.insert_one(
        resp
    )

    return Response(
        json.dumps(
            resp,
            indent=4),
        mimetype="application/json"
    )
