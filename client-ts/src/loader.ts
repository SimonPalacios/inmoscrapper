import Papa from "papaparse";

const transform = (value:any, field:any) => {
  // Si el campo es "Extras" y parece un array en formato string:
  if (field === "extras" && typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      // Reemplaza las comillas simples por dobles para formar un JSON válido
      const jsonCompatible = trimmed.replace(/'/g, '"');
      try {
        return JSON.parse(jsonCompatible);
      } catch (error) {
        console.error("Error al parsear el campo Extras:", value, error);
        return value;
      }
    }
  }
  return value;
}

export async function loader() {
  // Obtén el CSV desde la ruta deseada (asegúrate de que el archivo esté disponible)
  const response = await fetch("/propiedades.csv");
  if (!response.ok) {
    throw new Response("No se pudo cargar el archivo CSV", { status: response.status });
  }
  const csvText = await response.text();

  // Parsea el CSV a JSON usando PapaParse
  const parsedData = Papa.parse(csvText, {
    header: true,         // La primera línea define los nombres de los campos
    dynamicTyping: true,  // Convierte números y booleanos automáticamente
    skipEmptyLines: true, // Ignora líneas vacías
    transform: transform, // Aplica una función de transformación a cada campo
  }).data;
  // Retorna los datos parseados usando la función json de react-router-dom
  return {data:parsedData, ok: true};
} 