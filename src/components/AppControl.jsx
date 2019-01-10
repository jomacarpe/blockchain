import React from 'react';

import Updating from './common/Info';
import Error from './common/Info';
import IncrControl from './common/Button';
import DecrControl from './common/Button';
import HandleSetValue from './common/Button';

class AppControl extends React.Component {

  state = { stackId: null };

  increment = () => {
    const { drizzle, drizzleState } = this.props;

    // Usar cacheSend para lanzar una transaccion que 
    // ejecutara el metodo  incr del contrato inteligente.
    const instance = drizzle.contracts.Contador;
    const stackId = instance.methods.incr.cacheSend({
      from: drizzleState.accounts[0]
    });

    // Guardar stackId en el estado local
    this.setState({ stackId });
  }

  decrement = () => {
    const { drizzle, drizzleState } = this.props;

    // Usar cacheSend para lanzar una transaccion que 
    // ejecutara el metodo  incr del contrato inteligente.
    const instance = drizzle.contracts.Contador;
    const stackId = instance.methods.decr.cacheSend({
      from: drizzleState.accounts[0]
    });

    // Guardar stackId en el estado local
    this.setState({ stackId });
  }

  handleSetValue = e => {
		const value = document.getElementById('inputText').value;

		this.setValue(value);
		
		e.preventDefault();
	};

	setValue = value => {
		const {drizzle, drizzleState } = this.props;

		// Usar cacheSend para lanzar una transaccion que ejecutara el metodo set del contrato inteligente
		const instance = drizzle.contracts.Contador;
		const stackId = instance.methods["setValue"].cacheSend(value, {
			from: drizzleState.accounts[0]
		});

		// Guardar stackId en el estado local
		this.setState({ stackId });
	};


  getTxInfo = () => {

  	// Si no he pulsado nunca el boton incrementar;
  	if (this.state.stackId === null) return {status: null, error: null};;

    // Obtener el estado de las transacciones desde el estado de drizzle
    const { transactions, transactionStack } = this.props.drizzleState;

    // Obtener el hash de la transaccion asociada a stackId.
    // stackId se guardo en el estado local al crear la transaccion.
    const txHash = transactionStack[this.state.stackId];

    // El hash de la transaccion no existe hasta que se envia a la red.
    if (!txHash) return {status: "Pendiente de envio", error: null};

    // Si la transaccion existe, devolvemos su status
    return { status: transactions[txHash].status, 
             error: transactions[txHash].error};
  };

  render() {
  	const {status, error} = this.getTxInfo();

	const errorMsg = error ? `${error.message || error}` : "";

    return (
        <div className="appCounter-control">
            <input type="number" id="inputText" />
            <HandleSetValue className="appCounter-control-handleSetValue"
                         text="Set Value"
                         onClick={this.handleSetValue}
                         disabled={status === 'pending'} />
            <br />
            <IncrControl className="appCounter-control-incr"
                         text="Incrementar"
                         onClick={this.increment}
                         disabled={status === 'pending'} /> 
            <DecrControl className="appCounter-control-decr"
                         text="Decrementar"
                         onClick={this.decrement}
                         disabled={status === 'pending'} /> 
            <Updating className="appCounter-control-updating"
                      msg={status}
                      visible={true} />
            <Error className="appCounter-control-error"
                   msg={errorMsg}
                   visible={!!error} />
        </div>
    );
  }

}

export default AppControl;
