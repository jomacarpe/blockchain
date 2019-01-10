import React from 'react';

class AppData extends React.Component {

  state = { dataKey: null };

  componentDidMount() {
    const { drizzle } = this.props;

    // Decirle a drizzle que queremos observar el metodo valor().
    const instance = drizzle.contracts.Contador;
    const dataKey = instance.methods["valor"].cacheCall();

    // Guardar `dataKey` en el estado local del componente.
    // Usaremos `dataKey` para recuperar el resultado del metodo.
    this.setState({ dataKey });
  }

  render() {

    // Obtener el estado del contrato desde drizzleState
    const { Contador } = this.props.drizzleState.contracts;

    // Usamos el resultado del metodo "valor()" usando la clave
    // `dataKey` guardada en el estado local del componente.
    const valor = Contador.valor[this.state.dataKey];

    return (
        <div className="appCounter-data">
            Valor = <span className="appCounter-data-value">
                      {valor && valor.value }
                    </span>
        </div>
      );
  }
};

export default AppData;
