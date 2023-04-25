const Title = ({ textoClaro, textoOscuro }) => {
  return (
    <h1 className="text-green-600 font-black text-6xl capitalize text-center py-6 ">
      {textoClaro}
      <span className="text-slate-700"> {textoOscuro}</span>
    </h1>
  );
};

export default Title;
