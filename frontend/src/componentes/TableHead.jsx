import React from "react";

const TableHead = () => {
  return (
    <>
      <thead className="bg-sky-600 text-white border-b">
        <tr>
          <th scope="col" className="text-lg font-medium  px-6 py-4 text-left">
            Nombre Cliente
          </th>
          <th scope="col" className="text-lg font-medium px-6 py-4 text-left">
            Tipo
          </th>
          <th scope="col" className="text-lg font-medium px-6 py-4 text-left">
            Correo
          </th>
          <th scope="col" className="text-lg font-medium px-6 py-4 text-left">
            Fecha Nacimiento
          </th>

          <th scope="col" className="text-lg font-medium px-6 py-4 text-left">
            No. Identificación
          </th>
        </tr>
      </thead>
    </>
  );
};

export default TableHead;
