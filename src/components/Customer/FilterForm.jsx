import React from 'react';

class FilterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerName: '',
            customerCategory: '',
            deliveryMethod: ''
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => {
            // Llamar a la función de filtro del padre automáticamente después de actualizar el estado
            this.props.onFilterChange(this.state);
        });
    };

    handleReset = () => {
        this.setState({
            customerName: '',
            customerCategory: '',
            deliveryMethod: ''
        });
        // Restablecer los filtros en el padre
        this.props.onFilterChange({
            customerName: '',
            customerCategory: '',
            deliveryMethod: ''
        });
    };

    render() {
        return (
            <form className="mb-4">
                <div className="row">
                    <div className="col">
                        <input
                            type="text"
                            name="customerName"
                            className="form-control"
                            placeholder="Nombre del cliente"
                            value={this.state.customerName}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            name="customerCategory"
                            className="form-control"
                            placeholder="Categoría"
                            value={this.state.customerCategory}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            name="deliveryMethod"
                            className="form-control"
                            placeholder="Método de entrega"
                            value={this.state.deliveryMethod}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-secondary mx-2" onClick={this.handleReset}>Restaurar filtros</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default FilterForm;