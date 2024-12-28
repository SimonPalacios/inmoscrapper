import csv
import os
from bs4 import BeautifulSoup
import requests
from fake_useragent import UserAgent

def argenprop(writer):

    def modelate(soup, writer):
        boxes = soup.find_all('a', class_='card')
        for i,box in enumerate(boxes):
            link = "https://www.argenprop.com"+box.get('href')
            details = box.find('div', class_='card__details-box')
            ubicacion = details.find('p', class_='card__address').text
            precio = details.find('p', class_='card__price').text
            expensas = ""
            if "&plus;" in precio:
                precio, expensas = precio.split("&plus;")
            # Descripcion se arma con los siguientes elementos:
            tipo = details.find('p', class_='card__title--primary').text
            i_ambientes = details.find('i', class_='icono-cantidad_ambientes')
            if(not i_ambientes):
                i_ambientes = details.find('i', class_='icono-cantidad_dormitorios')
            ambientes = i_ambientes.find_next_sibling('span').text
            titulo = details.find('h2', class_='card__title').text
            decripcion = " ".join(list(map(lambda i: " ".join(i.replace("\n","").split()), [expensas, ambientes, titulo])))
            row = list(map(lambda item: ' '.join(item.replace("\n","").split()), [link, ubicacion, tipo, precio, decripcion]))
            writer.writerow(row)

    def getter(page:str=""):
        ua = UserAgent(os=["Windows", "Android", "iOS", "Linux"])
        ua_random = ua.getRandom
        reqUrl = "https://www.argenprop.com/casas-o-departamentos/alquiler/la-plata-buenos-aires?"+page
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

    response = getter()
    soup = BeautifulSoup(response.text, 'lxml')
    file = open(file_name, mode)
    writer = csv.writer(file)    
    last_page = soup.find_all('li', class_='pagination__page')[-2].text
    print(f"Last page: {last_page}")
    modelate(soup,writer)
    for i in range(2, int(last_page)+1):
        response = getter(f"pagina-{i}")
        soup = BeautifulSoup(response.text, 'lxml')
        modelate(soup, writer)
        print(f"Page {i} of {last_page}")

if __name__ == "__main__":
    file_name = 'resultado.csv'
    mode = "a" if os.path.exists(f"{file_name}") else "x"
    response = getter()
    soup = BeautifulSoup(response.text, 'lxml')
    file = open(file_name, mode)
    writer = csv.writer(file)    
    last_page = soup.find_all('li', class_='pagination__page')[-2].text
    print(f"Last page: {last_page}")
    row = modelate(soup, writer)
    for i in range(2, int(last_page)+1):
        response = getter(f"pagina-{i}")
        soup = BeautifulSoup(response.text, 'lxml')
        modelate(soup)
        print(f"Page {i} of {last_page}")
    file.close()
