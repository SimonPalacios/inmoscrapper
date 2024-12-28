import os
import re
from requests import get
from bs4 import BeautifulSoup, PageElement
import csv
from getter import getter_argenprop, getter_inmobusquedas


def zonaprop(writer):
     def __str__(self):
        return "ZONAPROP"

def argenprop(writer):
    def __str__(self):
        return "ARGENPROP"
    def modelate(soup, writer):
        boxes = soup.find_all('a', class_='card')
        for i,box in enumerate(boxes):
            link = "https://www.argenprop.com"+box.get('href')
            details = box.find('div', class_='card__details-box')
            direccion = details.find('p', class_='card__address').text
            precio_str = details.find('p', class_='card__price').text
            # Formato de str: "Precio + Expensas"
            match_exp = re.search(r'.*\$\s?([\d\.?]+)\s?expensas', precio_str)
            match_prcio = re.search(r'\$\s?([\d\.?]+)', precio_str)
            precio = (match_prcio.group(1) if match_prcio else precio_str).replace(".", "")
            expensas = match_exp.group(1).replace(".", "") if match_exp else ""
            # Descripcion se arma con los siguientes elementos:
            tipo = details.find('p', class_='card__title--primary').text
            i_ambientes = details.find('i', class_='icono-cantidad_ambientes')
            if(not i_ambientes):
                i_ambientes = details.find('i', class_='icono-cantidad_dormitorios')
            ambientes = i_ambientes.find_next_sibling('span').text if i_ambientes else ""
            titulo = details.find('h2', class_='card__title').text
            info_container = details.find('p', class_='card__info')
            info = info_container.text if info_container else ""
            decripcion = " ".join(list(map(lambda i: " ".join(i.replace("\n","").split()), [titulo, info])))
            row = list(map(lambda item: ' '.join(item.replace("\n","").split()), [precio, expensas, direccion,ambientes, tipo, link,  decripcion]))
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
    def make_structure():
        default_args = {
            'tipo': 'departamento',
            'operacion': 'alquiler',
            'localidad': 'partido-la-plata',
            'min': 0,
            'max': 3000000
        }
        response = getter_inmobusquedas(**default_args)
        soup = BeautifulSoup(response.text, 'lxml')
        elements = soup.find_all('div', class_='resultadoContenedorDatosResultados')
        try:
            content = list(map(modelate, elements))
        except AttributeError:
            if soup.text == "Bot no autorizado":
                raise Exception("Bot no autorizado")

        # Obtengo elementos que tienen los enlaces a la siguientes páginas
        pagesElement = soup.find(
            'div', attrs={'class': 'wrap', 'id': 'listapaginas'}).find_all('a')
        # Me traigo los enlaces de las siguientes páginas
        return [ref.get('href') for ref in pagesElement], content


    def modelate(caja: PageElement):
        # Obtenemos todas las cajas que tienen las propiedades
        # El tipo de propiedad (departamento, casa, etc) en realidad posee la ubicacion si no existe la clase "tipodestacado".
        direccion = caja.find('div', class_='resultadoTipo')
        link = direccion.find('a').get('href')
        if 'tipodestacado' in direccion['class']:
            tipo = direccion.text
            direccion = caja.find('div', class_='resultadoLocalidad').text
        else:
            direccion = direccion.text
            tipo = caja.find('div', class_='resultadoLocalidad').text
        # Obtenemos el precio
        precio_str:str = caja.find('div', class_='resultadoPrecio').text
        match_exp = re.search(r'.*Expensas\s?:\s?\$\s?([\d\.?]+)', precio_str)
        match_prcio = re.search(r'\$([\d\.?]+)', precio_str)
        precio = (match_prcio.group(1) if match_prcio else precio_str).replace(".", "")
        expensas = match_exp.group(1).replace(".", "") if match_exp else ""
        # Obtenemos la descripcion
        descripcion = " ".join(caja.find(
            'div', class_='resultadoDescripcion').text.replace("\n", "").split())
        ambientes = caja.find('div', class_='contenedordetalles').find_all('div', class_='rdBox')[0].text
        # Escribir en un archivo CSV
        return [precio, expensas, direccion, ambientes, tipo,  link, descripcion]

    print("Procesando Inmobusquedas...")
    pages, content = make_structure()
    writer.writerows(content)
    N = len(pages)
    for i, page in enumerate(pages):
        response = getter_inmobusquedas(**{"endpoint": page})
        soup = BeautifulSoup(response.text, 'lxml')
        elements = soup.find_all('div', class_='resultadoContenedorDatosResultados')
        row = list(map(modelate, elements))
        writer.writerows(row)
        porc = 100*(i/N)
        print(f"[{'|'*int(porc)}] {porc:.2f}%")


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
    file_name = 'resultado.csv'
    mode = "a" if os.path.exists(f"{file_name}") else "x"
    file = open(file_name, mode)
    writer = csv.writer(file)
    if mode == "x":  # Si el archivo fue creado, escribir los encabezados
        writer.writerow(
            ['Precio', 'Expensas', 'Direccion', 'Ambientes','Tipo','Url',  'Descripcion'])
    print("Iniciando [key={}]".format(i))
    input("Presione Enter para scrapear {}".format(webs[i].__str__()))
    for web in webs[i]:
        web(writer)
    file.close()
    exit(0)
