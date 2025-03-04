import os
import csv
from tqdm import tqdm, trange
from Webs import InmoBusquedas, ArgenProp, ZonaProp



def zonaprop():
    return ZonaProp(operacion='alquiler').run()


def argenprop():
    return ArgenProp(operacion='alquiler').run()


def inmobusquedas():

    return InmoBusquedas(**{
        'tipo': 'departamento',
        'operacion': 'alquiler',
        'localidad': 'partido-la-plata',
    }).run()


def retrieve_writer():
    head = ['pagina', 'moneda', 'precio', 'expensas', 'direccion', 'dorm', 'mts', 'extras', 'tipo', 'url',  'descripcion']
    file_name = 'propiedades.csv'
    mode = "a" if os.path.exists(f"{file_name}") else "x"
    file = open(file_name, mode)
    writer = csv.writer(file)
    if mode == "x":  # Si el archivo fue creado, escribir los encabezados
        writer.writerow(head)
    return file, writer


if __name__ == '__main__':
    webs = {
        "1": [inmobusquedas],
        "2": [argenprop],
        "3": [zonaprop],
        "12": [inmobusquedas, argenprop],
        "13": [inmobusquedas, zonaprop],
        "23": [argenprop, zonaprop],
        "123": [inmobusquedas, argenprop, zonaprop]
    }

    try:
        i = os.sys.argv[1]
    except IndexError:
        print("No se ha especificado ningun argumento; \n1 -> inmobusquedas \n2 -> argenprop \n3 -> zonaprop \n123-> todos")
        exit(1)

    file, writer = retrieve_writer()
    props = {
        'total': len(webs[i]),
        'bar_format': '{percentage:3.0f}%|{bar}|{n_fmt}/{total_fmt}',
        'colour': 'green'
    }

    with tqdm(**props) as pbar:
        for web in webs[i]:
            pbar.write(web.__name__.upper())
            content, pages = web()
            for i in trange(len(content), colour="red",leave=False,bar_format=props['bar_format']+'filas'):
                writer.writerows(content[i])
            pbar.update(1)
    file.close()
    exit(0)
