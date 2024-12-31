## Revisar 

- Estilos que están de más en index y app css volarlos.
- assets, volalo
- Usa la libreria react-router-dom. Mete [createBrowseroutes](https://reactrouter.com/6.28.1/routers/create-browser-router) para usar [loaders](https://reactrouter.com/6.28.1/route/loader) y [actions](https://reactrouter.com/6.28.1/route/action)
- Hace una carpeta /api dentro de la carpeta src para abtraer la forma de obtener la informacion que llena el componente.
- Cuando uses el 'loader' del path que le asignas al componente fijate que te permite ahorrarte el useState y el useFetch. La respuesta del loader la sacas con un hook y listo. 
- Trata de hacer dos archivos dentro de /api uno para los getters y otro para los post. 
- Los post te van a servir para los filtros y están relacionados con las 'actions' asignadas al path. 
- Pasa todo a Typescript hdp 
- Cuando types las cosas usa interface para los objetos o estructuras dinamicas y 'type' para las propiedades. Usar interfaces te deja poder usar 'Omit', 'Partial' y 'extends' para una subinterface. DEspues, ambos aceptan conectores logicos '|' '&' 
- Agrega alias a los path para invocarlos con '@api/' por ejemplo. Así despues no tenés problemas cuando cambias las cosas de lugar. Yo uso generalmente 3: @api/, @components/ @routes/ y en algunas si tengo mucho modal @modals/

- [Aliases](https://medium.com/@vitor.vicen.te/setting-up-path-aliases-in-a-vite-typescript-react-project-the-ultimate-way-d2a9a8ff7c63)

