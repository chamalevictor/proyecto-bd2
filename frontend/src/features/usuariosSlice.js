import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usuarios: {},
  autenticado: false,
  alerta: { msg: "", error: false },
  roles: [],
  agencias: [],
  agenciaActual: [],
  cajas: [],
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
    setRoles(state, action) {
      state.roles = action.payload;
    },
    setAgencias(state, action) {
      state.agencias = action.payload;
    },
    setCajas(state, action) {
      state.cajas = action.payload;
    },
    setAgenciaActual(state, action) {
      state.agenciaActual = action.payload;
    },
  },
});

export const usuarioActions = usuariosSlice.actions;
export default usuariosSlice.reducer;
