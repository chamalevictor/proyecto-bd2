const Modules = ({ img, moduleName }) => {
  return (
    <>
      <div className="transition ease-in-out hover:scale-105 modules  max-w-sm  bg-white border border-gray-200 rounded-lg shadow-2xl  dark:bg-gray-200 dark:border-gray-700">
        <img className="rounded-t-lg " src={img} alt="" />

        <div className="p-5">
          <h5 className="text-center mb-2 text-2xl font-bold text-gray-900 dark:text-green-700">
            {moduleName}
          </h5>
        </div>
      </div>
    </>
  );
};

export default Modules;
