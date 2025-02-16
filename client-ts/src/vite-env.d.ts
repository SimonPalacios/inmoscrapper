/// <reference types="vite/client" />

interface Inmueble {
  pagina: string;
  moneda: null | string;
  precio: number | string;
  expensas: number | string;
  direccion: null | number | string;
  dorm: number | string;
  mts: number | string;
  extras: string[];
  tipo: string;
  url: string;
  descripcion: string;
}