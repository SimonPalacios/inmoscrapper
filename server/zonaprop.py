import cloudscraper
from fake_useragent import UserAgent
import requests
import urllib

ua = UserAgent(os=["Windows", "Android", "iOS", "Linux"])
ua_random = ua.getRandom
reqUrl = "https://www.zonaprop.com.ar/departamentos-alquiler-la-plata.html"


def try__1():

    headersList = {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "es-ES,es;q=0.6",
        "priority": "u=0, i",
        "sec-ch-ua": '"{};v={}"'.format(ua_random['browser'], ua_random['browser_version']),
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"{}"'.format(ua_random['os']),
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "sec-gpc": "1",
        "user-agent": "{}".format(ua_random['useragent']),
    }

    # scraper = cloudscraper.create_scraper()
    scraper = cloudscraper.CloudScraper()
    response = scraper.get(reqUrl)
    print(response.status_code)
    print(response)


def try__2():
    req = urllib.request.Request(reqUrl, headers={
        'User-Agent': ua_random['useragent'], 
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8', 
        'Accept-Language': 'en-US,en;q=0.5', 
        'Accept-Encoding': 'gzip, deflate'
    })

    response = urllib.request.urlopen(req)
    print(response.status)
    print(response.read().decode())

if __name__ == '__main__':
    try__1()
