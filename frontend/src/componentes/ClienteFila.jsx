const TransactionRow = ({ cliente }) => {
  return (
    <tr className="bg-white border-b ">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
        {cliente.NOMBRE}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
        {(cliente.ID_TIPO_CLIENTE = 1 ? "Individual" : "Comercial")}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
        {cliente.CORREO}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
        {cliente.FECHA_NAC.split("T")[0]}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-light text-gray-900">
        {cliente.NO_IDENTIFICACION}
      </td>
    </tr>
  );
};

export default TransactionRow;
