const TarjetaOpciones = ({ texto }) => {
  return (
    <>
      <div className="my-5 transition ease-in-out hover:scale-105 modules w-72  max-w-sm  bg-white border border-gray-200 rounded-lg shadow-lg  dark:bg-gray-200 dark:border-gray-700">
        <div className="p-5">
          <h5 className="text-center mb-2 text-2xl font-bold text-gray-900 dark:text-green-700">
            {texto}
          </h5>
        </div>
      </div>
    </>
  );
};

export default TarjetaOpciones;
