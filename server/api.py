import csv
import os
from fastapi import FastAPI
from Webs import ArgenProp, InmoBusquedas
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def write_csv(content):
    file_name = 'propiedades.csv'
    mode = "a" if os.path.exists(f"{file_name}") else "x"
    file = open(file_name, mode)
    writer = csv.writer(file)
    if mode == "x":  # Si el archivo fue creado, escribir los encabezados
        writer.writerow(
            ['Pagina','Moneda','Precio', 'Expensas', 'Direccion', 'Dorm.','Mts²','Extras', 'Tipo', 'Url',  'Descripcion'])
    for row in content:
        writer.writerows(row)
    file.close()


@app.get("/propiedades/", status_code=200)
def read_propiedades(tipo="departamento", operacion="alquiler", localidad="partido-la-plata"):
    content, pages = [], 0
    
    inmo = InmoBusquedas(**{
        'tipo': tipo,
        'operacion': operacion,
        'localidad': localidad,
    })
    for tipo in ['departamento', 'casa', 'ph']:
        result = inmo.run(tipo)
        content.extend(result["content"])
        pages += result["pages"]


    result = ArgenProp({
        'tipo': 'departamento',
        'operacion': operacion,
        'localidad': localidad,
    }).run()
    content.extend(result["content"])
    pages += result["pages"]
    write_csv(content)
    return {
        "paginas": pages,
        "content":content
    }


@app.get("/argenprop/")
def read_argenProp():
    
    argen = ArgenProp()
    result =  argen.run()
    return {
        "paginas": result["pages"],
        "content":result["content"]
    }

@app.get("/inmobusquedas/")
def read_inmobusquedas():
    content = []
    argen = InmoBusquedas(**{
        'operacion': 'alquiler',
        'localidad': 'partido-la-plata',
    })
    for tipo in ['departamento', 'casa', 'ph']:
        result = argen.run(tipo)
        content.extend(result["content"])
    write_csv(content)
    return {
        "paginas": result["pages"],
        "content":result["content"]
    }
