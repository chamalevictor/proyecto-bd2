import ClienteFila from "./ClienteFila";

const InfoClientes = ({ listadoClientes }) => {
  const clientesLista =
    listadoClientes.length > 0 &&
    listadoClientes.map((cliente) => {
      return <ClienteFila cliente={cliente} key={cliente.no_identificacion} />;
    });
  return (
    <div>
      <div className="flex flex-col rounded mx-6">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden  rounded-lg ">
              <table className="min-w-full  ">
                <thead className="bg-green-600 text-white border-b ">
                  <tr>
                    <th
                      scope="col"
                      className="text-lg font-medium px-6 py-4 text-left"
                    >
                      Nombre Cliente
                    </th>
                    <th
                      scope="col"
                      className="text-lg font-medium  px-6 py-4 text-left"
                    >
                      Tipo
                    </th>
                    <th
                      scope="col"
                      className="text-lg font-medium px-6 py-4 text-left"
                    >
                      Correo
                    </th>
                    <th
                      scope="col"
                      className="text-lg font-medium px-6 py-4 text-left"
                    >
                      Fecha Nacimiento
                    </th>
                    <th
                      scope="col"
                      className="text-lg font-medium px-6 py-4 text-left"
                    >
                      Identificación
                    </th>
                  </tr>
                </thead>
                <tbody>{clientesLista}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoClientes;
