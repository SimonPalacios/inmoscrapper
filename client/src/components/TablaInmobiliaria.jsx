import React, { useState, useEffect } from 'react';

const TablaInmobiliaria = () => {
  const [inmobiliarias, setInmobiliarias] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetch('/resultados.json')
      .then(response => response.json())
      .then(data => setInmobiliarias(data))
      .catch(error => console.error('Error al cargar el JSON:', error));
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inmobiliarias.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(inmobiliarias.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Límite de botones de página
  const range = 2;
  const startPage = Math.max(currentPage - range, 1);
  const endPage = Math.min(currentPage + range, pageNumbers.length);

  return (
    <div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Precio</th>
              <th className="py-3 px-6 text-left">Expensas</th>
              <th className="py-3 px-6 text-left">Ambientes</th>
              <th className="py-3 px-6 text-left">Dirección</th>
              <th className="py-3 px-6 text-left">Descripción</th>
              <th className="py-3 px-6 text-left">Enlace</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentItems.length > 0 ? (
              currentItems.map((inmobiliaria, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{inmobiliaria.Precio || "No especificado"}</td>
                  <td className="py-3 px-6 text-left">{inmobiliaria.Expensas || "No especificado"}</td>
                  <td className="py-3 px-6 text-left">{inmobiliaria.Ambientes || "No especificado"}</td>
                  <td className="py-3 px-6 text-left">{inmobiliaria.Direccion || "No especificado"}</td>
                  <td className="py-3 px-6 text-left truncate max-w-xs">{inmobiliaria.Descripcion || "No especificado"}</td>
                  <td className="py-3 px-6 text-left">
                    <a href={inmobiliaria.Url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Ver más</a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-3 px-6 text-center">No hay datos disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => paginate(1)}
          disabled={currentPage === 1}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Primero
        </button>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <div className="flex">
          {startPage > 1 && (
            <span className="mx-1 px-3 py-1">...</span>
          )}
          {pageNumbers.slice(startPage - 1, endPage).map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`mx-1 px-3 py-1 rounded ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {number}
            </button>
          ))}
          {endPage < pageNumbers.length && (
            <span className="mx-1 px-3 py-1">...</span>
          )}
        </div>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
        <button
          onClick={() => paginate(pageNumbers.length)}
          disabled={currentPage === pageNumbers.length}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Último
        </button>
      </div>
    </div>
  );
};

export default TablaInmobiliaria;
