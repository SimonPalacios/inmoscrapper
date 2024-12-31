import re
from bs4 import BeautifulSoup
import cloudscraper


class InmoBusquedas():
    _base = "https://www.inmobusqueda.com.ar/"
    _kwargs = None
    _endpoint = ""
    regex_ubicacion= r'(?P<tipo>\w+)\sen\s(?P<ubicacion>.*)'

    def __init__(self, *args, **kwargs):
        print(args, kwargs)
        self._kwargs= kwargs
        self._endpoint = "-".join(kwargs.values())
    

    def __str__(self):
        return f"Inmobusquedas: \n{self._base}\n{self._kwargs}\n{self._endpoint}"
    

    def getter(self, page:int=0):
        scraper = cloudscraper.CloudScraper()
        url = self._base+self._endpoint+f"{'-pagina-'+str(page) if bool(page)else''}.html"
        # print(f"Requesting {url}")
        response = scraper.get(url)
        if(response.status_code != 200):
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
        regex = r'^consulte$|consulte.*\$(\d+)|[\$d]*(\d+).*\$(\d+)|[\$d](\d+)'
        e1, p1, e2, p2 = re.search(regex, precio).groups(0)
        return ("consulte", e1) if e1 else (p2, 0) if p2 else ("consulte", 0) if precio=="consulte"else (p1, e2)

    def modelate(self, soup):
        boxes = soup.find_all('div', class_='resultadoContenedorDatosResultados')
        rows = []
        for box in boxes:
            try:
                url = box.find('a').get('href')
                values = [" ".join(text.split()).lower() for text in box.stripped_strings]
                if(values[-1] == "anuncio promocionado"):
                    # La primera posicion tiene el tipo de propiedad
                    # La segunda posicion es: direccion '>' ubicacion
                    tipo, localizacion, precio, descripcion, *resto = values
                    direccion, ubicacion = localizacion.split(">")
                    ambientes = resto[:-3]
                else:
                    direccion, ubicacion, precio, descripcion, *ambientes = values[:-2]
                    tipo, ubicacion = re.search(r'(?P<tipo>\w+)\sen\s(?P<ubicacion>.*)',ubicacion).groups(" ")
                precio, expensas = self.precio_expensas(precio.replace(".",""))
                rows.append([precio, expensas, direccion, ambientes, tipo, url, descripcion])
            except Exception as e:
                print(values)
                raise e
        return rows    

    def retrieve_content(self, writer):
        soup = BeautifulSoup(self.getter(), 'lxml')
        N = int(soup.find_all('div', class_='paginas')[-1].text.replace('\n',''))
        writer.writerows(self.modelate(soup))
        for i in range(2, N+1):
            print(f"Pagina: {i}/{N}")
            writer.writerows(self.modelate(BeautifulSoup(self.getter(i), 'lxml')))
    