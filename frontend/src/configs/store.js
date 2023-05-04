import { configureStore } from "@reduxjs/toolkit";
import usuarioReducer from "../features/usuariosSlice";
import cuentaReducer from "../features/cuentasSlice";
import transaccionesReducer from "../features/transaccionesSlice";

export const store = configureStore({
  reducer: {
    usuarios: usuarioReducer,
    cuentas: cuentaReducer,
    transacciones: transaccionesReducer,
  },
});
