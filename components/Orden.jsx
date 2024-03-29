import Image from "next/image";
import axios from "axios";
import { toast } from 'react-toastify';
import { formatearDinero } from '../helpers/index';

const Orden = ({orden}) => {
    
    const { id, nombre, total, pedido } = orden;

    const completarOrden = async () => {
        try {
            await axios.post(`/api/ordenes/${id}`);
            toast.success('Orden Completada');
        } catch (error) {
            toast.error('Hubo un error al completar la orden');
        }
    };
    
    return (
        <div className="border p-10 space-y-5">
            <h3 className="text-2xl font-bold">Orden: {id}</h3>
            <p className="text-lg font-bold">Cliente: {nombre}</p>

            <div>
                {
                    pedido.map((platillo) => (
                        <div 
                            key={platillo.id} 
                            className="py-3 flex border-b last-of-type:border-0 items center"
                        >
                            <div className="w-32">
                                <Image
                                    src={`/assets/img/${platillo.imagen}.jpg`}
                                    alt={`Imagen de ${platillo.nombre}`}
                                    width={300}
                                    height={400}
                                />
                            </div>

                            <div className="p-5 space-y-2">
                                <h4 className="text-xl font-bold text-amber-500">{platillo.nombre}</h4>
                                <p className="text-lg font-bold">Cantidad: {platillo.cantidad}</p>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="md:flex md:items-center md:justify-between my-10">
                <p className="mt-5 font-black text-3xl text-amber-500">
                    Total a Pagar: {formatearDinero(total)}
                </p>

                <button
                    type="button"
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg uppercase w-full md:w-auto text-center"
                    onClick={completarOrden}
                >
                    Completar Orden
                </button>
            </div>
        </div>
    )
}

export default Orden;