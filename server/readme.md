```sh
git clone git@github.com:SimonPalacios/inmoscrapper.git && cd inmoscrapper && ((virtualenv venv &&  source venv/bin/activate && pip install -r requirements.txt) || (echo "Error de instalacion"))
```

### Ejecucion 
- Dependencias en el requirements.txt
- python test.py <1|2|3|123> 
> 1 = Inmobusquedas  
> 2 = ArgenProp  
> 3 = ZonaProps  
> 12 = [1,2]
> 13 = [1,3]
> 23 = [2,3]
> 123 = [1,2,3] 
- Las filas se escriben en 'propiedades.csv'. Si el archivo existe las filas se agregan al final.