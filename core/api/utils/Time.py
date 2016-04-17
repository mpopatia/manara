from email.utils import formatdate
from time import time
from datetime import tzinfo, datetime


def get_current_local_time():
    return formatdate(time(), tzinfo())


def timestamp_to_obj(timestamp):
    return datetime.fromtimestamp(timestamp)