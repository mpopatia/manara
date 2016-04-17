from datetime import datetime
from time import time


def get_current_local_time():
    return int(time())


def timestamp_to_obj(timestamp):
    return datetime.fromtimestamp(
        int(timestamp)
    )
