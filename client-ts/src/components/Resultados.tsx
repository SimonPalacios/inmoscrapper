import { useState } from "react";
import { FaBed, FaChevronCircleLeft, FaChevronCircleRight, FaLink } from "react-icons/fa";
import { TbMeterSquare } from "react-icons/tb";
import { useLoaderData } from "react-router-dom";

type filtrosType = {
  orden: keyof Inmueble;
  items: number;
  minPrecio: number;
  maxPrecio: number;
  minMts: number;
  maxMts: number;
  dormitorios: number;
  moneda: "$" | "USD"
};

function updateStorage(filtros:filtrosType){
  localStorage.clear()
  localStorage.setItem('filtros', JSON.stringify(filtros))

}

export const Resultados = () => {
  const { data, filtros:defaultFiltros, ok } = useLoaderData();
  const [pagina, setPagina] = useState(1);
  const [open, setOpen] = useState(false);
  const [filtros, setFiltros] = useState<filtrosType>(defaultFiltros);

  const closeFiltro = (data?: filtrosType) => {
    if (data) {
      setFiltros(data);
      updateStorage(data)
    }
    setOpen(false);
  };

  function filtrar(inmueble: Inmueble) {
    const { minPrecio, moneda, maxPrecio, minMts, maxMts, dormitorios } = filtros;
    const { moneda:mond, precio, mts, dorm } = inmueble;
    return (mond === moneda &&
      +precio >= minPrecio &&
      +precio <= maxPrecio &&
      +mts >= minMts &&
      +mts <= maxMts &&
      (!dormitorios || dorm === dormitorios)
    );
  }

  if (!ok) {
    return (
      <div className="text-black w-dvw h-dvh flex flex-col items-center justify-center gap-4">
        <span className="h-16 w-16 rounded-full animate-spin border-t border-cyan-400"></span>
        <span className="border-b px-6 py-2 font-semibold text-lg border-cyan-400 rounded-sm">Cargando...</span>
      </div>
    );
  }

  const headers = Object.keys(data[0]);
  const filtereds = data.filter(filtrar)
  const paginas = Math.ceil(filtereds.length / filtros.items);
  const paginaAct = filtereds
    .sort((a: Inmueble, b: Inmueble) => ((a[filtros.orden] || 0) < (b[filtros.orden] || 0) ? -1 : 1))
    .slice((pagina - 1) * filtros.items, pagina * filtros.items);

  return (
    <article className="text-black w-dvw h-dvh flex flex-col pt-12">
      <nav className=" fixed top-0 left-0 w-full backdrop-blur-sm rounded-md bg-slate-300/25 flex justify-end items-center gap-2 uppercase px-6 py-2">
        <p>V1.2.0</p>

        <div className="grow flex justify-center gap-2">
          <button
            onClick={() => setPagina(pagina - 1)}
            disabled={pagina === 1}
          >
            <FaChevronCircleLeft />
          </button>
          <span>
            {pagina}/{paginas}
          </span>
          <button
            onClick={() => setPagina(pagina + 1)}
            disabled={pagina === paginas}
          >
            <FaChevronCircleRight />
          </button>
        </div>
        <span
          className="border px-1 py-2 cursor-pointer"
          children="Filtrar"
          onClick={() => setOpen(true)}
        />
      </nav>

      {(open && <DialogFiltros {...{ headers, close: closeFiltro, filtros }} />) || null}

      <section
        id="content"
        className="w-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 gap-4"
      >
        {paginaAct.map((inmueble: Inmueble, index: number) => (
          <Card
            key={index}
            inmueble={inmueble}
          />
        ))}
      </section>
    </article>
  );
};

const FieldSet = (props: { children: React.ReactNode, legend: string }) => (
  <fieldset className="border flex justify-center p-2 invalid:border-red-600 invalid:text-red-700">
    <legend className="px-2 min-w-5/8 uppercase font-semibold text-xs text-gray-700">{props.legend} </legend>
    {props.children}
  </fieldset>
);

const DialogFiltros = (props: {headers:string[], close:(data?:filtrosType)=>void, filtros:filtrosType}) => {
  const { close, filtros} = props;
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries([...formData.entries()].map(([k, v]) => [k, isNaN(+v) ? v : +v])) as filtrosType;
    data.maxMts = data.maxMts || 1e10;
    data.maxPrecio = data.maxPrecio || 1e10;
    close(data);
  };

  const onReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    close();
  };

  return (
    <dialog
      open
      className="fixed top-0 left-0 w-full h-full bg-gray-200/25 backdrop-blur-md p-6 flex items-center justify-center"
    >
      <form
        {...{ onSubmit, onReset }}
        className="p-6 space-y-4 rounded-md w-full md:w-1/4  bg-gray-200"
      >
        <FieldSet legend="Ordenar">
          <select
            className="border-0 outline-0 px-2 w-full uppercase"
            name="orden"
            required
          >
            {["PRECIO", "MTS", "PAGINA", "DORM"].map((h) => (
              <option key={h} selected={h === filtros.orden}
              className="bg-slate-600 uppercase">{h}</option>
            ))}
          </select>
        </FieldSet>
        <FieldSet legend="Cantidad Items x Pagina">
          <select
            className="border-0 outline-0 px-2 w-full"
            name="items"
            required
          >
            {[10, 25, 50, 100].map((i) => (
              <option
                key={i}
                selected={i === filtros.items}
                className="bg-slate-600"
              >
                {i}
              </option>
            ))}
          </select>
        </FieldSet>
        <FieldSet legend="Precio -> min  |  max">
          <input
            type="text"
            name="minPrecio"
            pattern="\d{0,10}"
            placeholder="Minimo"
            defaultValue={filtros.minPrecio || ""}
            onInvalid={(e) => e.currentTarget.setCustomValidity("Solo numeros")}
            className="border-0 outline-0 px-2 w-full"
          />
          <input
            type="text"
            name="maxPrecio"
            pattern="\d{0,10}"
            placeholder="Maximo"
            defaultValue={filtros.maxPrecio}
            onInvalid={(e) => e.currentTarget.setCustomValidity("Solo numeros")}
            className="border-l-2 outline-0 px-2 w-full"
          />
        </FieldSet>
        <FieldSet legend="mts² -> min  |  max">
          <input
            type="text"
            name="minMts"
            pattern="\d{0,10}"
            placeholder="Minimo"
            defaultValue={filtros.minMts || ""}
            onInvalid={(e) => e.currentTarget.setCustomValidity("Solo numeros")}
            className="border-0 outline-0 px-2 w-full"
          />
          <input
            type="text"
            name="maxMts"
            pattern="\d{0,10}"
            placeholder="Maximo"
            onInvalid={(e) => e.currentTarget.setCustomValidity("Solo numeros")}
            defaultValue={filtros.maxMts}
            className="border-l-2 outline-0 px-2 w-full"
          />
        </FieldSet>
        <FieldSet legend="Cant. Dormitorios">
          <input
            type="text"
            name="dormitorios"
            pattern="\d{0,10}"
            placeholder="Dormitorios"
            onInvalid={(e) => e.currentTarget.setCustomValidity("Solo numeros")}
            defaultValue={filtros.dormitorios || ""}
            className="border-0 outline-0 px-2 w-full"
          />
        </FieldSet>
          <FieldSet legend="moneda">
            <label htmlFor="moneda1" className="mx-auto">
            <input
              type="radio"
              id="moneda1"
              name="moneda"
              value="$"
              defaultChecked={filtros.moneda === "$"}
            />
             Pesos
            </label>
            <label htmlFor="moneda2" className="mx-auto">
            <input type="radio"
              id="moneda2"
              name="moneda"
              value="USD"
              defaultChecked={filtros.moneda === "USD"}
              />
              Dolares
            </label>
            
          </FieldSet>
        <footer className="w-ful flex items-center justify-between">
          <button
            className="bg-green-500/50 px-6 py-2 rounded-md cursor-pointer"
            type="submit"
          >
            Aplicar
          </button>
          <button
            className="bg-red-500/50 px-6 py-2 rounded-md cursor-pointer"
            type="reset"
          >
            Cerrar
          </button>
        </footer>
      </form>
    </dialog>
  );
};
const Card = ({ inmueble }: { inmueble: Inmueble }) => (
    <article className="rounded-md border border-gray-400/50 p-6 flex flex-col">
      <header className="card__header text-center  rounded-sm py-2 font-bold">
        <a
          href={inmueble.url}
          target="_blank"
          rel="noreferrer"
          className="bg-gray-600/25 flex items-center visited:text-green-400 py-2 justify-around"
        >
          {inmueble.pagina} <FaLink />
        </a>
      </header>
      <section className="card__content grow flex flex-col gap-3">
        <div className="text-center text-xl uppercase py-2">
          <h2 className="line-clamp-1 overflow-ellipsis">{inmueble.direccion}</h2>
        </div>
        <div className="flex justify-around py-2 border-y">
          <h2>
            {inmueble.moneda} {inmueble.precio}
          </h2>
          <h2>$ {inmueble.expensas}</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            {inmueble.dorm}
            <FaBed />
          </span>
          <span className="flex items-center gap-1">
            {inmueble.mts} <TbMeterSquare />
          </span>
          <span className="ms-auto flex items-center gap-2">
            {inmueble.extras.map((i) => (
              <h5>{i}</h5>
            ))}
          </span>
        </div>
        <p className="py-3 mx-3 max-h-40 overflow-auto">{inmueble.descripcion}</p>
      </section>
    </article>
  )
