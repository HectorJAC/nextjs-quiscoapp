import { useContext } from 'react';
import QuiscoContext from '../context/QuioscoContext';

const useQuiosco = () => {
    return useContext(QuiscoContext);
}

export default useQuiosco;