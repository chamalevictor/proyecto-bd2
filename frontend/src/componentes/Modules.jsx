const Modules = ({ img, moduleName }) => {
  return (
    <>
      <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img class="rounded-t-lg" src={img} alt="" />
        </a>
        <div class="p-5">
          <a href="#">
            <h5 class="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {moduleName}
            </h5>
          </a>
        </div>
      </div>
    </>
  );
};

export default Modules;
