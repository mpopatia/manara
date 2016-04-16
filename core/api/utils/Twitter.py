import re
from TwitterAPI import TwitterAPI
from textblob import TextBlob

from core.api import Config

api = TwitterAPI(
    "oD2lOtKvdNsoB9vTMRKY4evbe",
    "tzTfST8iDe71j3bsepQNdbt6Y9cgq2o6sQLTLxoSsrkCye7iU3",
    "2287491591-DDaerNAGgV0TD65SRTSSCTmgkkc3DUSMhi2BiaO",
    "WZVE5WrUCd4x81sXDawUwiAMbsDiRtxhPLPuGgJPtJPPr"
)


def get_tweets_by_GPS(location):
    api = TwitterAPI(
        Config.CONSUMER_KEY,
        Config.CONSUMER_SECRET,
        Config.ACCESS_TOKEN_KEY,
        Config.ACCESS_TOKEN_SECRET
    )

    response = api.request('search/tweets', {'geocode': location})

    tweets = []

    for item in response.get_iterator():
        if "text" in item:
            text = ' '.join(re.sub('(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+://\S+)', " ", item['text']).split())
            tweets.append(text)

    return tweets


def get_sentiment(tweets):
    data = ''
    for t in tweets:
        data += t[:len(t) - 1] + " "
    blob = TextBlob(data)

    total = 0
    count = 0

    for sentence in blob.sentences:
        count += 1
        total += sentence.sentiment.polarity
    if count > 0:
        return (int((total / float(count)) * 100) + 100) / 2


if __name__ == '__main__':
    tweets = get_tweets_by_GPS('24.523272,54.434817,1mi')
    print(
        get_sentiment(tweets)
    )
