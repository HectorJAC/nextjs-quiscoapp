import Image from "next/image";
import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";

const Producto = ({producto}) => {

    const { handleSetProducto, handleChangeModal } = useQuiosco();
    const { nombre, imagen, precio } = producto;

    return (
        <div className="border p-3">
            <Image 
                src={`/assets/img/${imagen}.jpg`}
                alt={`Imagen Platillo ${nombre}`}
                width={300}
                height={400}
            />

            <div>
                <h3 className="text-2xl font-bold">{nombre}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">
                    {formatearDinero(precio)}
                </p>

                <button
                    type="button"
                    className="bg-amber-500 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-amber-600 transition-all duration-200 ease-in-out"
                    onClick={() => {
                        handleChangeModal();
                        handleSetProducto(producto);
                    }}
                >
                    Agregar
                </button>
            </div>
        </div>
    );
};

export default Producto;