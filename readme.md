```sh
git clone git@github.com:SimonPalacios/inmoscrapper.git && cd inmoscrapper && ((virtualenv venv &&  source venv/bin/activate && pip install -r requirements.txt) || (echo "Error de instalacion"))
```

### Ejecucion 
- Dependencias en el requirements.txt
- python test.py <1|2|3|4> 
> 1 = Inmobusquedas solo  
> 2 = ArgenProp solo  
> 3 = ZonaProps solo (no implementado)  
> 4 = Todos 
- Las filas se escriben en 'resultados.csv'