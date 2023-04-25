const Boton = ({ title, onClickAction }) => {
  return (
    <button
      type="button"
      onClick={onClickAction}
      className="text-white text-sm bg-green-600 p-3 rounded-md uppercase font-bold hover:bg-green-700"
    >
      {" "}
      {title}{" "}
    </button>
  );
};

export default Boton;
