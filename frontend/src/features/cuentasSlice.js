import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cuentas: [],
  cuentaSingle: [],
  cuentaDestino: [],
  tiposCuenta: [],
  categories: [],
  banks: [],
  currencies: [],
  alerta: { msg: "", error: false },
  loading: true,
  cuentaCreada: false,
};

export const cuentaslice = createSlice({
  name: "cuentas",
  initialState,
  reducers: {
    getAllcuentas(state, action) {
      state.cuentas = action.payload;
      state.cuentaSingle = action.payload;
    },
    getAlltiposCuenta(state, action) {
      state.cuentaTypes = action.payload;
    },
    getAllCategories(state, action) {
      state.categories = action.payload;
    },
    getAllBanks(state, action) {
      state.banks = action.payload;
    },
    getAllCurrencies(state, action) {
      state.currencies = action.payload;
    },
    createAccount(state, action) {
      state.cuentas = [...state.cuentas, action.payload];
    },
    createNewAccountCompleted(state, action) {
      state.cuentaCreada = action.payload;
    },
    getcuentaSingle(state, action) {
      state.cuentaSingle = state.cuentas.filter(
        (account) => account.account_id == action.payload
      );
    },
    setDestinationAccount(state, action) {
      state.destinationAccount = state.cuentas.filter(
        (account) => account.account_id == action.payload
      );
    },
  },
});

export const cuentasActions = cuentaslice.actions;
export default cuentaslice.reducer;
