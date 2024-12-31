import os
import re
from typing import List
from requests import get
from bs4 import BeautifulSoup, PageElement
import cloudscraper
import csv
from getter import getter_argenprop, getter_inmobusquedas
from server.Webs import InmoBusquedas


def zonaprop(writer):

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
            direccion, ubicacion, * \
                ambientes = arrayItems[2 if int(expensas) else 1:4]
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


def argenprop(writer):
    def __str__(self):
        return "ARGENPROP"

    def modelate(soup, writer):
        boxes = soup.find_all('a', class_='card')
        for i, box in enumerate(boxes):
            link = "https://www.argenprop.com"+box.get('href')
            details = box.find('div', class_='card__details-box')
            direccion = details.find('p', class_='card__address').text
            precio_str = details.find('p', class_='card__price').text
            # Formato de str: "Precio + Expensas"
            match_exp = re.search(r'.*\$\s?([\d\.?]+)\s?expensas', precio_str)
            match_prcio = re.search(r'\$\s?([\d\.?]+)', precio_str)
            precio = (match_prcio.group(
                1) if match_prcio else precio_str).replace(".", "")
            expensas = match_exp.group(1).replace(".", "") if match_exp else ""
            # Descripcion se arma con los siguientes elementos:
            tipo = details.find('p', class_='card__title--primary').text
            i_ambientes = details.find('i', class_='icono-cantidad_ambientes')
            if (not i_ambientes):
                i_ambientes = details.find(
                    'i', class_='icono-cantidad_dormitorios')
            ambientes = i_ambientes.find_next_sibling(
                'span').text if i_ambientes else ""
            titulo = details.find('h2', class_='card__title').text
            info_container = details.find('p', class_='card__info')
            info = info_container.text if info_container else ""
            decripcion = " ".join(
                list(map(lambda i: " ".join(i.replace("\n", "").split()), [titulo, info])))
            row = list(map(lambda item: ' '.join(item.replace("\n", "").split()), [
                       precio, expensas, direccion, ambientes, tipo, link,  decripcion]))
            writer.writerow(row)

    print("Procesando Argenprop...")
    response = getter_argenprop()
    soup = BeautifulSoup(response.text, 'lxml')
    modelate(soup, writer)
    N = int(soup.find_all('li', class_='pagination__page')[-2].text)
    for i in range(2, N+1):
        response = getter_argenprop(f"pagina-{i}")
        soup = BeautifulSoup(response.text, 'lxml')
        modelate(soup, writer)
        porc = 100*(i/N)
        print(f"[{'|'*int(porc)}] {porc:.2f}%")


def inmobusquedas(writer: csv.writer):

    def __str__(self):
        return "Inmobusquedas"

    def modelate(soup):
        boxes = soup.find_all('div', class_='resultadoContenedorDatosResultados')
        rows = []
        for box in boxes:
            values = list(map(lambda x: " ".join(x.replace("\n", " ").
            split()), box.get_text("|\|", strip=True).split('|\|')))
            url = box.find('a').get('href')
            if(values[-1] == "Anuncio promocionado"):
                # La primera posicion tiene el tipo de propiedad
                # La segunda posicion direccion '>' ubicacion
                tipo, localizacion, precio, descripcion, *resto = values
                descripcion = tipo+" "+descripcion
                direccion, ubicacion = localizacion.split(">")
                ambientes = resto[:-3]
            else:
                direccion, ubicacion, precio, descripcion, *ambientes = values[:-2]
                tipo, ubicacion = re.search(r'(?P<tipo>\w+)\sen\s(?P<ubicacion>.*)',ubicacion.lower()).groupdict().values()
            # $170.000 Expensas : $25000
            if('consulte' in precio.lower() ) :
                expensas = "0"
            else:
                precio, expensas = re.search(r'\$(?P<precio>[\d\.?]+).*\$*(?P<expensas>[\d\.?]+)',precio.replace(" ", "")).groupdict().values()
            rows.append([precio, expensas, direccion, ambientes, tipo, url, descripcion])
        return rows

        

    print("Procesando Inmobusquedas...")
    
    scraper = cloudscraper.CloudScraper()
    reqUrl = "https://www.inmobusqueda.com.ar/departamento-alquiler-partido-la-plata"
    response = scraper.get(reqUrl+".html")
    print(f"Request {response.status_code}")
    # response = getter_inmobusquedas()
    soup = BeautifulSoup(response.text, 'lxml')
    writer.writerows(modelate(soup))
    total_pages = int(soup.find_all('div', class_='paginas')[-1].text.replace('\n',''))
    for page_number in range(2, total_pages+1):
        response = scraper.get(reqUrl+f"-pagina-{page_number}.html")
        print(f"Request {response.status_code}")
        soup = BeautifulSoup(response.text, 'lxml')
        writer.writerows(modelate(soup))
        porc = 100*(page_number/total_pages)
        print(f"[{'|'*int(porc)}] {porc:.2f}%")
        if page_number == 4: break

if __name__ == '__main__':
    webs = {
        "1": [inmobusquedas],
        "2": [argenprop],
        "3": [zonaprop],
        "4": [inmobusquedas, argenprop, zonaprop]
    }
    
    try:
        i = os.sys.argv[1]
    except IndexError:
        print("No se ha especificado ningun argumento; 1 -> solo inmobusquedas, 2 -> solo argenprop, 3 -> zonaprop, 4-> todos")
        exit(1)
    file_name = 'inmobusquedas.csv'
    mode = "a" if os.path.exists(f"{file_name}") else "x"
    file = open(file_name, mode)
    writer = csv.writer(file)
    if mode == "x":  # Si el archivo fue creado, escribir los encabezados
        writer.writerow(
            ['Precio', 'Expensas', 'Direccion', 'Ambientes', 'Tipo', 'Url',  'Descripcion'])
    print("Iniciando [key={}]".format(i))
    InmoBusquedas(**{
            'tipo': 'departamento',
            'operacion': 'alquiler',
            'localidad': 'partido-la-plata',
        } ).retrieve_content(writer)
    
    exit()
    # input("Presione Enter para scrapear {}".format(webs[i].__str__()))
    for web in webs[i]:
        web(writer)
    file.close()
    exit(0)
