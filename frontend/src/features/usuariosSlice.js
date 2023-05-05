import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usuarios: { usuario: { nombre: 'james' }},
  autenticado: false,
  alerta: { msg: "", error: false },
};

export const usuariosSlice = createSlice({
  name: "usuario",
  initialState,
  reducers: {
    setLoggedUser(state, action) {
      state.usuarios = action.payload;
      state.autenticado = true;
    },
    setAlertMessage(state, action) {
      state.alerta.msg = action.payload.msg;
      state.alerta.error = action.payload.error;
    },
    logOutUser(state, action) {
      state.usuarios = {};
      state.autenticado = false;
      state.alerta = { msg: "", error: false };
    },
  },
});

export const usuarioActions = usuariosSlice.actions;
export default usuariosSlice.reducer;
