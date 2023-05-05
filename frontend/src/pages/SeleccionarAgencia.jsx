import React, { useState } from 'react'
import BotonVolver from '../componentes/BotonVolver'
import Titulo from "../componentes/Titulo"

const SeleccionarAgencia = () => {

    const [idAgencia, setIdAgencia] = useState(null)
    const [idAcaja, setIdAcaja] = useState(null)

    return (

        <>
        
            <Titulo textoClaro={"En que caja trabajara"} textoOscuro={"Hoy?"} />
            <div className="flex justify-center">
                <div className="md:w-2/3 lg:w-2/5 mt-6 rounded-lg" >
                <form
                    className="mb-5 bg-white rounded-lg shadow-lg px-10 py-10"
                >
                    <div>
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold"
                            htmlFor="agencia"
                        >
                            Seleccione una agencia
                            </label>
                            
                            <select
                                name='agecias'
                                id='agencias'
                                className='w-full mt-3 p-3 border-2 rounded-xl bg-gray-50 text-center'
                                onChange={ (e) => setIdAgencia(e.target.value)}
                            >
                                <option
                                    value=""
                                    className='text-gray-900 block text-md text-center'
                                >--Seleccione una agencia para continuar--</option>

                                <option value="1">Portales</option>
                                <option value="2">Chinautla</option>
                                <option value="3">Central</option>
                                <option value="4">Sur</option>
                                <option value="5">Norte</option>
                                {/*! Mapear las agencias aca de la DB*/}
                            </select>
                        </div>
                        {
                            idAgencia && (
                                <div className='mt-5'>
                                    <label
                                        className="uppercase text-gray-600 block text-xl font-bold"
                                        htmlFor="agencia"
                                    >
                                        Seleccione una Caja
                                    </label>

                                    <select
                                        name='agecias'
                                        id='agencias'
                                        className='w-full mt-3 p-3 border-2 rounded-xl bg-gray-50 text-center'
                                        onChange={(e) => setIdAcaja(e.target.value)}
                                    >
                                        <option value="" className='text-gray-900 block text-md text-center'>--Seleccione una caja para continuarr--</option>

                                        <option value="1">Caja No. 1</option>
                                        <option value="2">Caja No. 2</option>
                                        <option value="3">Caja No. 3</option>
                                        <option value="4">Caja No. 4</option>
                                        <option value="5">Caja No. 5</option>
                                        {/*! Mapear las agencias aca de la DB*/}
                                    </select>
                                </div>
                            )
                        }

                        {
                            idAcaja && (
                                <div
                                    className='mt-6 justify-end flex'
                                >
                                    <BotonVolver ruta={"/dashboard/operaciones"} texto='Continuar' estilos='text-white text-sm bg-green-700 p-3 rounded-md uppercase font-bold hover:bg-green-900' />
                                </div>
                            )
                        }
                    </form>
                </div>
            </div>
            <div className="flex justify-center py-6 scroll-smooth">
                <BotonVolver ruta={"/dashboard/operaciones"} />
            </div>
        </>
    )
}

export default SeleccionarAgencia


/*

<input
                                type="select"
                                // placeholder="Un nombre y un apellido"
                                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                                id="agencia"
                                //value={nombreCompleto}
                                // onChange={(e) => setNombreCompleto(e.target.value)}
                            />
*/