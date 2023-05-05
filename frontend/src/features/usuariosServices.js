import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../configs/axiosClient";
import { usuarioActions } from "./usuariosSlice";

export const loginUser = createAsyncThunk(
  "User login",
  async (user, thunkApi) => {
    try {
      const { data } = await axiosClient.post("/usuarios/login", user);

      if (data.exito == 1) {
        thunkApi.dispatch(usuarioActions.setLoggedUser(data));
      } else {
        console.log(data);
        thunkApi.dispatch(
          usuarioActions.setAlertMessage({
            msg: data.msg,
            error: true,
          })
        );
      }
    } catch (error) {
      //console.log(error.response.data.msg);
      thunkApi.dispatch(
        usuarioActions.setAlertMessage({
          msg: error.response.data.msg,
          error: true,
        })
      );
    }
  }
);
