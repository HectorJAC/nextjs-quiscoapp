import { useEffect, useCallback } from "react";
import Layout from "../layout/Layout";
import useQuiosco from "../hooks/useQuiosco";
import { formatearDinero } from "../helpers";

export default function Total() {

    const { pedido, nombre, setNombre, colocarOrden, total } = useQuiosco();

    const comprobarPedido = useCallback(() => {
        return pedido.length === 0 || nombre === '' || nombre.length < 3;
    }, [pedido, nombre]);

    useEffect(() => {
        comprobarPedido();
    }, [comprobarPedido]);

    return (
        <Layout pagina='Total'>
            <h1 className="text-4xl font-black">Total y Confirmar Pedido</h1>
            <p className="text-2xl my-10">Confirma tu Pedido a continuación</p>

            <form
                onSubmit={colocarOrden}
            >
                <div>
                    <label 
                        className="block uppercase text-slate-800 font-bold text-xl" 
                        htmlFor="nombre"
                    >
                        Nombre
                    </label>

                    <input 
                        type="text" 
                        name="nombre" 
                        id="nombre" 
                        className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="mt-10">
                    <p className="text-2xl">
                        Total a pagar: {''} <span className="font-bold">{formatearDinero(total)}</span>
                    </p>
                </div>

                <div className="mt-5">
                    <input 
                        type="submit"
                        value="Confirmar Pedido" 
                        disabled={comprobarPedido()}
                        className={`${comprobarPedido() ? 'bg-amber-100' : 'bg-amber-500 cursor-pointer hover:bg-amber-600'} w-full lg:w-auto text-white text-center uppercase font-bold text-lg px-5 py-2 rounded-md transition-all duration-200`}
                    />
                </div>
            </form>
        </Layout>
    )
};