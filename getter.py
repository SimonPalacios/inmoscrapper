import requests
from fake_useragent import UserAgent
from random import randint
from time import sleep


def getter_inmobusquedas(**kwargs):
    ua = UserAgent(os=["Windows", "Android", "iOS", "Linux"])
    random_ua = ua.getRandom
    reqUrl = kwargs.get('endpoint')
    if (not reqUrl):
        # Obtener los valores de los argumentos
        tipo = kwargs.get('tipo', 'departamento')
        operacion = kwargs.get('operacion', 'alquiler')
        localidad = kwargs.get('localidad', 'partido-la-plata')
        min = kwargs.get('min', 0)
        max = kwargs.get('max', 3000000)
        pagina = kwargs.get('pagina', "")
        # URL Semilla
        reqUrl = f"{tipo}-{operacion}-{localidad}-{min}-{max}-pesos-pagina-{pagina}.html"
    

    headersList = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "es-ES,es;q=0.7",
    "Connection": "keep-alive",
    "Cookie": "afiliado=0; aid=0; usinr=1234701-2cf0eb9bffe5fe973fdf4e9bebc7d14133ff2029; pagina=rnuevos.departamento-alquiler-partido-la-plata.html; frase=-; visita=0531abcf98f6fdfd993ce7e4dd866c78; testcookie=0531abcf98f6fdfd993ce7e4dd866c78",
    "Host": "www.inmobusqueda.com.ar",
    "Referer": "https://www.inmobusqueda.com.ar/",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-User": "?1",
    "Sec-GPC": "1",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "{}".format(random_ua['useragent']),
    "sec-ch-ua": "'{}';v='{}'".format(random_ua['browser'], random_ua['browser_version']),
    "sec-ch-ua-mobile": "?{}".format(int(random_ua['type'] == 'mobile')),
    "sec-ch-ua-platform": "'{}'".format(random_ua['os']), 
    }

    payload = ""
    # random_sleep = randint(10,20)
    # print(f"[GET] {reqUrl} - DELAY:{random_sleep}")
    # sleep(random_sleep)
    return  requests.request("GET", f"https://www.inmobusqueda.com.ar/{reqUrl}", data=payload,  headers=headersList)

    # reqUrl = "https://www.inmobusqueda.com.ar/resultados.armarurl.php?tipo=2&operacion=0&localidad=Todo+el+Partido+de+La+Plata%2C+Buenos+Aires&moneda=1&desde=0&hasta=3000000&provinciaid=0&partidoid=0&localidadid=0&barrioid=0&mlocalidad=68.0.0&radio=1&dorm=0&dorm2=0&ambientes=0&ambientes2=0&aptobanco=cualquiera&aceptapermuta=2&actualizado=1&publicado=0&garage=cualquiera&banos=cualquiera&piscina=cualquiera&tipoanunciante=2&expensashasta=&jardin=cualquiera&patio=2&orden=1&estado=99&estado2=99&antiguedad=200&antiguedad2=200&desdemts=&hastamts=&desdemtstotal=&hastamtstotal="

def getter_argenprop(page:str=""):
    ua = UserAgent(os=["Windows", "Android", "iOS", "Linux"])
    ua_random = ua.getRandom
    reqUrl = "https://www.argenprop.com/casas-o-departamentos-o-ph/alquiler/la-plata-buenos-aires?"+page
    headersList = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "accept-encoding": "gzip, deflate, br, zstd",
    "accept-language": "es-ES,es;q=0.7",
    "cache-control": "max-age=0",
    "cookie": ".AspNetCore.Antiforgery.7VAPn8AcYdQ=CfDJ8P0KTcMsSQNIuP2_7YFi4kaIvgbzcuUDrBGS06_SJi_SqDCvj5KR1BZBc37vcdFVEcZ-psFxpA3-FB_tbxVlPFknPJZHIgMCEiQOQGzt_gpq6ml6uzt3pX7x0OdudhzX1QkpislmYY6LviVG53H13kg",
    "priority": "u=0, i",
    "sec-ch-ua": "'{}';v='{}'".format(ua_random['browser'], ua_random['browser_version']),
    "sec-ch-ua-mobile": "?{}".format(int(ua_random['type'] == 'mobile')),
    "sec-ch-ua-platform": "'{}'".format(ua_random['os']),
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "sec-gpc": "1",
    "upgrade-insecure-requests": "1",
    "user-agent": "{}".format(ua_random['useragent']), 
    }
    payload = ""
    return requests.request("GET", reqUrl, data=payload,  headers=headersList)      