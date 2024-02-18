import { useState, useEffect, createContext } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import axios from 'axios';

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [producto, setProducto] = useState({});
    const [modal, setModal] = useState(false);
    const [pedido, setPedido] = useState([]);
    const [nombre, setNombre] = useState('');
    const [total, setTotal] = useState('');

    const router = useRouter();

    const obtenerCategorias = async () => {
        const {data} = await axios.get('/api/categorias');
        setCategorias(data);
    };

    useEffect(() => {
        obtenerCategorias();
    }, []);

    useEffect(() => {
        setCategoriaActual(categorias[0]);
    }, [categorias]);

    const handleClickCategoria = (id) => {
        const categoria = categorias.filter(cat => cat.id === id);
        setCategoriaActual(categoria[0]);
        router.push('/'); // Redirecciona a la página principal
    };

    const handleSetProducto = (producto) => {
        setProducto(producto);
    };

    const handleChangeModal = () => {
        setModal(!modal);
    };

    const handleAgregarPedido = ({categoriaId, ...producto}) => { // Elimina las propiedades que no se necesitan
        if (pedido.some(productoState => productoState.id === producto.id)) {
            // Actualizar la cantidad
            const pedidoActualizado = pedido.map((productoState) => (
                productoState.id === producto.id ? producto : productoState
            ));
            setPedido(pedidoActualizado);
            toast.success('Pedido Guardado Correctamente');
        } else {
            setPedido([...pedido, producto]);
            toast.success('Pedido Agregado al Pedido');
        };

        setModal(false);
    };

    const handleEditarCantidades = (id) => {
        const productoActualizar = pedido.filter((producto) => producto.id === id);
        setProducto(productoActualizar[0]);
        setModal(!modal);
    };

    const handleEliminarProducto = (id) => {
        const pedidoActualizado = pedido.filter((producto) => producto.id !== id);
        setPedido(pedidoActualizado);
        toast.success('Producto Eliminado del Pedido Correctamente');
    };

    return (
        <QuioscoContext.Provider value={{
            categorias,
            categoriaActual,
            producto,
            modal,
            pedido,
            nombre,
            handleClickCategoria,
            handleSetProducto,
            handleChangeModal,
            handleAgregarPedido,
            handleEditarCantidades,
            handleEliminarProducto,
            setNombre
        }}>
            {children}
        </QuioscoContext.Provider>
    );
};

export {
    QuioscoProvider
};

export default QuioscoContext;
