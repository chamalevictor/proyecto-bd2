import { useNavigate } from "react-router-dom";

const BotonVolver = ({ ruta }) => {
  const navigate = useNavigate();
  const handleOnClick = (e) => {
    e.preventDefault();
    navigate(ruta);
  };
  return (
    <button
      type="button"
      onClick={handleOnClick}
      className="text-white text-sm bg-green-600 p-3 rounded-md uppercase font-bold hover:bg-green-700"
    >
      {" "}
      {"Volver"}{" "}
    </button>
  );
};

export default BotonVolver;
