import { configureStore } from "@reduxjs/toolkit";
import usuarioReducer from "../features/usuariosSlice";
import cuentasReducer from "../features/cuentasSlice";
import transaccionesReducer from "../features/transaccionesSlice";

export const store = configureStore({
  reducer: {
    usuario: usuarioReducer,
    cuentas: cuentasReducer,
    transacciones: transaccionesReducer,
  },
});
