#! /usr/bin/env python
# coding:utf-8

import json
from datetime import timedelta

from flask import request, Response

from core.api import app
from core.api import mongo_client
from core.api.utils.Time import get_current_local_time, timestamp_to_obj
from core.api.utils.Twitter import *


@app.route('/api/activity/upcount', strict_slashes=False, methods=['POST'])
def upcount():
    __data__ = [
        'GPS',
        'MAC_ID',
        'TIMESTAMP'
    ]

    data = request.get_json()

    if mongo_client.db.macid.find_one(
            {
                '_id': data['MAC_ID']
            }
    ) is None:
        print("New MAC ID:", data['MAC_ID'])

        mongo_client.db.macid.insert_one(
            {
                '_id': data['MAC_ID']
            }
        )

        resp = mongo_client.db.activity.find_one(
            {
                'location': data['GPS']
            },
            {
                '_id': 1,
                'count': 1,
            }
        )

        count = resp['count']

        mongo_client.db.activity.update_one(
            {
                '_id': resp['_id']
            },
            {
                '$inc': {
                    'count': 1
                },
                '$push': {
                    'volume': {
                        'value': count + 1,
                        'TIMESTAMP': data['TIMESTAMP'],
                        'MAC_ID': data['MAC_ID']
                    }
                }
            }
        )
        return Response(
            json.dumps({'message': "Successful"}, indent=4),
            mimetype="application/json"
        )
    else:
        return Response(
            json.dumps({'message': "Received a duplicate MAC_ID"}, indent=4),
            mimetype="application/json"
        )


@app.route('/api/activity', strict_slashes=False, methods=['GET'])
def get_all_activities():
    cursor = mongo_client.db.activity.find()

    return Response(
        json.dumps(list(cursor), indent=4),
        mimetype="application/json"
    )


@app.route('/api/activity/create', strict_slashes=False, methods=['GET'])
def create_activity():
    location = '24.523272,54.434817,1mi'

    tweets = get_tweets_by_GPS(
        location,
        text_only=False
    )

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
        "location": location,
        "tweets": get_tweets_by_GPS(location)
    }

    _id = mongo_client.db.activity.insert(
        data
    )

    return Response(
        json.dumps({'_id': _id}, indent=4),
        mimetype="application/json"
    )


@app.route('/api/activity/<_id>/refresh', strict_slashes=False, methods=['GET'])
def update_activity(_id):
    location = '24.523272,54.434817,1mi'

    tweets = get_tweets_by_GPS(
        location,
        text_only=False
    )

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
        "location": location,
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


@app.route('/api/activity/<_id>', strict_slashes=False, methods=['GET'])
def get_activity(_id):
    resp = mongo_client.db.activity.find_one(
        {
            '_id': _id
        }
    )

    return Response(
        json.dumps(
            resp,
            indent=4),
        mimetype="application/json"
    )


@app.route('/api/activity/<_id>/volume', strict_slashes=False, methods=['GET'])
def get_volume(_id):
    data = []
    volume = mongo_client.db.activity.find_one(
        {
            '_id': _id
        },
        {
            '_id': 0,
            'volume': 1
        }
    )['volume']

    now = timestamp_to_obj(volume[0]['TIMESTAMP'])

    for index, each in enumerate(volume):
        while index < len(volume) - 1 and now <= timestamp_to_obj(volume[index + 1]['TIMESTAMP']):
            data.append(each['value'])
            now += timedelta(seconds=5)

    return Response(
        json.dumps(
            data,
            indent=4),
        mimetype="application/json"
    )
