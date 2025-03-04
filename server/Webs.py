import math
from bs4 import BeautifulSoup
import cloudscraper
import re
from tqdm import trange
format = '{percentage:3.0f}%|{bar}|{n_fmt}/{total_fmt}'

def use(pattern, in_string):
    value = pattern.search(in_string)
    return value.group(1) if value else "-"


class ZonaProp():
    _base = "https://www.zonaprop.com.ar"
    _endpoint = ""
    _scrapper = None
    items_per_page = 30
    r_desc = re.compile(r'/_(.*?)\|')
    r_exp = re.compile(r'(\d+)')
    r_dorm = re.compile(r'(\d+)\s?dorm')
    r_mts = re.compile(r'(\d+) m² tot.')
    r_dir = ""

    def __init__(self, **kwargs):
        self._endpoint = f"/casas-departamentos-ph-{kwargs['operacion']}-la-plata"

        replacers = ["departamento", "alquiler", "la plata", "ph", "casa",
                     "duplex", "de", "monoambiente", "2 dormitorios", "1 dormitorio"]
        self.r_dir = re.compile(r''+'|'.join(replacers))
        self._scrapper = cloudscraper.CloudScraper()

    def getter(self, page: int = 0):
        url = self._base+self._endpoint + \
            f"{'-pagina-'+str(page) if bool(page)else''}.html"
        response = self._scrapper.get(url)
        if (response.status_code != 200):
            print(f"Error {response.status}")
            raise Exception(f"Error {response.status}")
        return response.text

    def modelate(self, soup):

        boxes = soup.find_all(
            'div', class_='postingCard-module__posting-top')
        rows = []
        for box in boxes:
            url = "https://www.zonaprop.com.ar"+box.find('a').get('href')
            texto = box.get_text('|/|', strip=True).split('|/|')

            # -------- MONEDA Y PRECIO $ 480.000
            moneda, precio = texto[0].replace(".", "").split(" ")

            # -------- DESCUENTO
            descuento = re.match(r'(\d+)%', texto[1])
            dir_idx = 2 if descuento else 1
            # --------Expensas, direccion, ubicacion, extras
            expensas = "-"
            if ("expensas" in texto[dir_idx].lower()):
                expensas = self.r_exp.search(
                    texto[dir_idx].replace(".", "")).group(1)
                dir_idx += 1
            direccion, ubicacion, *extra = texto[dir_idx:-1]
            direccion = self.r_dir.sub('', direccion.lower()).strip()
            # ---- DORMITORIOS, MTS²
            joined_extra = " ".join(extra)
            #  --- DORMS
            match = self.r_dorm.search(joined_extra)
            dorm = match.group(1) if match else "-"
            # --- mts
            match = self.r_mts.search(joined_extra)
            mts = match.group(1) if match else "-"

            # ---- EXTRAS
            extras = list(filter(lambda x: x not in [
                          f"{dorm} dorm.", f"{mts} m² tot."], extra))

            # ----DESCRIPCION
            match = self.r_desc.search(texto[-1])
            desc = match.group(1).strip() if match else texto[-1]
            # --------

            rows.append([
                'ZONAPROP',
                moneda,
                precio,
                expensas,
                direccion,
                dorm,
                mts,
                extras,
                '-',
                url,
                desc
            ])
        return rows

    def retrieve_pages(self, soup):
        total_items_str = soup.find(
            'h1', class_="postingsTitle-module__title").text.replace(".", "")
        total_items_value = re.match(r'([\d\.]+)', total_items_str).group(1)
        return math.ceil(int(total_items_value) / self.items_per_page)

    def run(self,):
        response = self.getter()
        soup = BeautifulSoup(response, 'lxml')
        content = [self.modelate(soup)]
        N = self.retrieve_pages(soup)
        for i in trange(N, colour="blue", bar_format=format+' pages'):
            content.append(self.modelate(
                BeautifulSoup(self.getter(i), 'lxml')))
        return content, N


class ArgenProp():
    _base = "https://www.argenprop.com/"
    _endpoint = ""
    _scrapper = None
    dormReg = re.compile(r"(\d+)\s?dorm")
    mtsReg = re.compile(r"(\d+)\s?m²")

    def __init__(self, **kwargs):

        # Estructura endpoint: /tipo[]/operacion/ubicacion
        self._endpoint = f"casas-o-departamentos-o-ph/{kwargs['operacion']}/la-plata-buenos-aires"
        self._scrapper = cloudscraper.CloudScraper()

    def getter(self, page: int = 0):
        url = self._base+self._endpoint + \
            f"{'?pagina-'+str(page) if bool(page)else''}"
        response = self._scrapper.get(url)
        if (response.status_code != 200):
            print(f"Error {response.status}")
            raise Exception(f"Error {response.status}")
        return response.text

    def modelate(self, soup):
        boxes = soup.find_all('a', class_='card')
        rows = []
        for box in boxes:
            link = "https://www.argenprop.com"+box.get('href')
            details = box.find('div', class_='card__details-box')
            direccion = details.find('p', class_='card__address').text
            precio_box = details.find('p', class_='card__price')
            if (precio_box.find('span', class_='card__noprice')):
                moneda, precio, expensas = "", "consulte", "?"
            else:
                precio_box = list(precio_box.stripped_strings)
                moneda, precio, expensas = precio_box if len(
                    precio_box) == 3 else [*precio_box, "0"]
            match_exp = re.search(r'.*\$\s?([\d\.?]+)\s?expensas', expensas)
            precio = precio.replace(".", "")
            expensas = match_exp.group(1).replace(
                ".", "") if match_exp else "0"
            # Descripcion se arma con los siguientes elementos:
            tipo = details.find('p', class_='card__title--primary').text
            box_extra = details.find(
                'ul', class_='card__main-features').stripped_strings
            extra = [" ".join(text.split()).lower() for text in box_extra]
            box_extra_str = " ".join(extra)
            mts, dorm = use(self.mtsReg, box_extra_str), use(
                self.dormReg, box_extra_str)
            extras = list(filter(lambda item: item not in [
                          f"{mts} m² cubie.", f"{dorm} dorm."], extra))
            titulo = details.find('h2', class_='card__title').text
            info_container = details.find('p', class_='card__info')
            info = info_container.text if info_container else ""
            decripcion = " ".join([titulo, info])
            direccion, tipo, link,  decripcion = map(lambda item: ' '.join(
                item.replace("\n", "").split()), [direccion, tipo, link,  decripcion])

            rows.append(["ARGENPROP", moneda, precio, expensas,
                         direccion, dorm, mts, extras, tipo, link,  decripcion])
        return rows

    def retrieve_pages(self, soup):
        return int(soup.find_all('li', class_='pagination__page')[-2].text)

    def run(self):
        response = self.getter()
        soup = BeautifulSoup(response, 'lxml')
        content = [self.modelate(soup)]
        N = self.retrieve_pages(soup)
        for i in trange(N, colour="blue", bar_format=format+' pages'):
            content.append(self.modelate(
                BeautifulSoup(self.getter(i), 'lxml')))
        return content, N


class InmoBusquedas():
    _base = "https://www.inmobusqueda.com.ar/"
    _kwargs = None
    _scrapper = None
    _endpoint = ""
    r_ubi = re.compile(r'(?P<tipo>\w+)\sen\s(?P<ubicacion>.*)')
    r_dorm = re.compile(r"(\d+)\s?dorm")
    r_mts = re.compile(r"(\d+)\s?mts")

    def __init__(self, *args, **kwargs):
        self._kwargs = kwargs
        self._endpoint = "-".join(kwargs.values())
        self._scrapper = cloudscraper.CloudScraper()

    def getter(self, page: int = 0):
        endpoint = "-".join(self._kwargs.values())
        url = self._base+endpoint + \
            f"{'-pagina-'+str(page) if bool(page)else''}.html"
        response = self._scrapper.get(url)
        if (response.status_code != 200):
            print(f"Error {response.status}")
            raise Exception(f"Error {response.status}")
        return response.text

    @staticmethod
    def precio_expensas(precio):
        """ Valores posibles: 
            'u$d250 expensas : $25000'
            'consulte expensas : $25000'
            '$170000 expensas : $25000'
            'u$d250'
            'consulte'
            '$170000'
            si todo = 0 -> precio:consulte, expensas:0
            Si e1 != 0 -> precio:consulte, expensas:e1
            Si p2 != 0 -> precio:p2, expensas:0
            sino -> precio:p1, expensas:e2
        """
        regex = r'^consulte$|consulte.*\$(\d+)|([\$d]*\d+).*\$(\d+)|([\$d]*\d+)'
        e1, p1, e2, p2 = re.search(regex, precio).groups(0)
        precio, expensas = ("consulte", e1) if e1 else (p2, 0) if p2 else ("consulte", 0) if precio == "consulte"else (p1, e2)
        moneda = ""
        if('$' in precio):
            moneda = '$'
            i = 1
            if 'd' in precio:
                moneda = 'USD'
                i += 1
            precio = precio[i:]
        return (moneda, precio, expensas)

    def modelate(self, soup):
        boxes = soup.find_all(
            'div', class_='resultadoContenedorDatosResultados')
        rows = []
        for i in trange(len(boxes), leave=False, colour="yellow", bar_format=format+' items'):
            try:
                url = boxes[i].find('a').get('href')
                values = [" ".join(text.split()).lower()
                          for text in boxes[i].stripped_strings]
                if (values[-1] == "anuncio promocionado"):
                    # La primera posicion tiene el tipo de propiedad
                    # La segunda posicion es: direccion '>' ubicacion
                    tipo, localizacion, precio, descripcion, *resto = values
                    direccion, ubicacion = localizacion.split(">")
                    extra = resto[:-3]
                else:
                    direccion, ubicacion, precio, descripcion, * \
                        extra = values[:-2]
                    tipo, ubicacion = self.r_ubi.search(ubicacion).groups(" ")

                moneda, precio, expensas = self.precio_expensas(precio.replace(".", ""))
                
                extra_str = " ".join([text.lower().lstrip() for text in extra])
                dorm, mts = use(self.r_dorm, extra_str), use(
                    self.r_mts, extra_str)
                extras = list(filter(lambda item: item not in [
                              f"{mts} mts", f"{dorm} dorm"], extra))
                rows.append(["INMOBUSQUEDAS", moneda, precio, expensas,
                            f"{direccion} {ubicacion}", dorm, mts, extras, tipo, url, descripcion])
            except Exception as e:
                print(values)
                raise e
        return rows

    def retrieve_pages(self, soup):
        return int(soup.find_all('div', class_='paginas')
                   [-1].text.replace('\n', ''))

    def run(self, tipo="departamento", ):
        self._kwargs['tipo'] = tipo
        response =self.getter()
        soup = BeautifulSoup(response, 'lxml')
        N = self.retrieve_pages(soup)
        content = []
        for i in trange(N, colour="blue", bar_format=format+' pages'):
            rows =self.modelate(soup)
            content.append(rows)
            response = self.getter(i)
            soup = BeautifulSoup(response, 'lxml')
        rows =self.modelate(soup)
        content.append(rows)
        return [content, N]
