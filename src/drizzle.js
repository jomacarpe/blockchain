
// importar funciones de drizzle
import { Drizzle, generateStore } from "drizzle";

// Importar la abstraccion del contrato
import Contador from './contracts/Contador.json';

// Opciones de Drizzle:
const options = {
    contracts: [ Contador ],
    web3: {
    	fallback: {
    		type: "ws",
    		url: "ws://127.0.0.1:7545"
    	}
    }
};

// Crear el store de drizzle
const drizzleStore = generateStore(options);

// Crear el objeto drizzle
const drizzle = new Drizzle(options, drizzleStore);

export default drizzle;
