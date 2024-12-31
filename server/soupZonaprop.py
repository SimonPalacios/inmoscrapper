import csv
import os
from typing import List
from bs4 import BeautifulSoup
import cloudscraper


def replace_prices(text: str):
    return text.replace("$", "").replace(".", "").lower().replace("expensas", "").strip()

def valores(text: List[str]):
    return [text[0], text[1] if "expensas" in text[1].lower() else "0"]

def modelate(soup, writer):
    boxes = soup.find_all(
        'div', class_="postingCard-module__posting-top__PCwt5")

    for i, box in enumerate(boxes):
        print(f"[BOX {i}]")
        url = "https://www.zonaprop.com.ar"+box.find('a').get('href')
        arrayItems = box.get_text('|/|', strip=True).split('|/|')
        # ['Precio', 'Expensas'?, 'direccion', 'ubicacion', 'Ambientes'*n,  'Descripcion']
        precio, expensas = map(replace_prices, valores(arrayItems[:2]))
        # Si no había expensas la direccion es el i=1
        direccion, ubicacion, *ambientes = arrayItems[2 if int(expensas) else 1:4]
        ambientes = " ".join(ambientes)
        descripcion = arrayItems[-1]
        row = [precio, expensas, direccion,
               ambientes, ubicacion,  url, descripcion]
        print("{}\n------------\n ".format(row))
        writer.writerow(row)


scraper = cloudscraper.CloudScraper()
reqUrl = "https://www.zonaprop.com.ar/departamentos-alquiler-la-plata.html"
response = scraper.get(reqUrl)
file_name = 'resultado.csv'
mode = "a" if os.path.exists(f"{file_name}") else "x"
file = open(file_name, mode)
writer = csv.writer(file)
i = 2
print("First Request {}".format(response.status_code))
while response.status_code < 300:
    soup = BeautifulSoup(response.text, 'lxml')
    modelate(soup, writer)
    response = scraper.get(reqUrl+f"-pagina-{i}")
    print("{} Request {}".format(i, response.status_code))
    i += 1
file.close()