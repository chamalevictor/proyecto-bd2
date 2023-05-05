import React, { useEffect, useState } from 'react'
import BotonVolver from '../../componentes/BotonVolver'
import Titulo from '../../componentes/Titulo'
import Alerta from '../../componentes/Alerta'

const Depositos = () => {

    const [retiro, setIretiro] = useState(false)
    const [disponible, setDisponible] = useState(true)
    const [documento, setDocumento] = useState(0)
    const [monto, setMonto] = useState(0)
    const [cuentaDestino, setCuentaDestino] = useState(0)

    useEffect(() => {
        if (documento && monto && cuentaDestino > 0) {
            setDisponible(false)
        } else {
            setDisponible(true)
        }
    }, [documento, monto, cuentaDestino])

    const onSubmitRetiro = (e) => {
        e.preventDefault()
        //setIretiro(true)

        //! Parsear los string a numeros

        setTimeout(() => {
            setIretiro(true)
            setCuentaDestino("")
            setMonto("")
            setDocumento("")
        }, 2500)

        //! Redireccionar al User una vez se completa la transaccion
    }

    useEffect(() => {
        setTimeout(() => {
            setIretiro(false)
        }, 2500)
    }, [retiro])

    return (

        <>

            <Titulo textoClaro={"Depositos"} textoOscuro={""} />

            <div className="flex justify-center">
                <div className="md:w-2/3 lg:w-2/5 mt-6 rounded-lg" >
                    {
                        //! Retornar la alerta exitosa o error
                        retiro && <Alerta alerta={{ error: false, msg: "Deposito Exitoso xD" }} />
                    }
                    <form
                        className="mb-5 bg-white rounded-lg shadow-lg px-10 py-10"
                        onSubmit={onSubmitRetiro}
                    >
                        <div
                            className='flex w-full flex-row align-bottom justify-center'
                        >
                            <label
                                className="uppercas mt-3 md:w-3/5 text-gray-600 block text-xl font-bold"
                                htmlFor="nodocu"
                            >Ingrese la Cuenta destino</label>
                            <input
                                type="text"
                                placeholder="Ej. 25491"
                                className="w-full mt-3 p-3 border md:w-2/5 rounded-xl bg-gray-50 border-black"
                                id="nodocu"
                                pattern="[0-9]+"
                                value={cuentaDestino}
                                onChange={(e) => setCuentaDestino(e.target.value)}
                            />
                        </div>
                        <div
                            className='flex w-full flex-row align-bottom justify-center mt-2'
                        >
                            <label
                                className="uppercas mt-4 md:w-3/5 text-gray-600 block text-xl font-bold"
                                htmlFor="monto"
                            >Ingrese el Monto</label>
                            <input
                                type="number"
                                placeholder="Ej. 450.50"
                                className="w-full mt-3 p-3 border md:w-2/5 rounded-xl bg-gray-50 border-black"
                                id="monto"
                                pattern='[^(\d*\.)?\d+$]'
                                //onkeypress="return (event.charCode !=8 && event.charCode ==0 || ( event.charCode == 46 || (event.charCode >= 48 && event.charCode <= 57)))"
                                value={monto}
                                //min={10}
                                onChange={(e) => { setMonto(e.target.value) }}
                            />
                        </div>
                        <div
                            className='flex w-full flex-row align-bottom justify-center mt-2'
                        >
                            <label
                                className="uppercas mt-4 md:w-3/5 text-gray-600 block text-xl font-bold"
                                htmlFor="nodocu"
                            >Ingrese el No. de documento</label>
                            <input
                                type="text"
                                placeholder="Ej. 25491"
                                className="w-full mt-3 p-3 border md:w-2/5 rounded-xl bg-gray-50 border-black"
                                id="nodocu"
                                pattern="[0-9]+"
                                value={documento}
                                onChange={(e) => setDocumento(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-center pt-8">
                            <button
                                disabled={disponible}
                                type='submit'
                                className={`text-white text-sm bg-green-800 p-3 rounded-md uppercase font-bold hover:bg-green-700 ${disponible ? "cursor-not-allowed" : "cursor-auto"}`}
                            >Depositar</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="flex justify-center py-6 scroll-smooth">
                <BotonVolver ruta={"/dashboard/operaciones"} />
            </div>
        </>
    )
}

export default Depositos
