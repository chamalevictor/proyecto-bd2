import { configureStore } from "@reduxjs/toolkit";
import usuarioReducer from "../features/usuariosSlice";
import cuentaReducer from "../features/cuentasSlice";

export const store = configureStore({
  reducer: {
    usuarios: usuarioReducer,
    cuentas: cuentaReducer,
  },
});
