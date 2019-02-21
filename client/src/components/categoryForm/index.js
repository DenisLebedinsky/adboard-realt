import React, { PureComponent } from 'react';

class CategoryForm extends PureComponent{

    constructor(props){
        super(props);
        this.state = {
            value: ''
        };
        this.onAdd = this.onAdd.bind(this);
        this.changeValue = this.changeValue.bind(this);
    }

    onAdd(e){
        e.preventDefault();
        const { onAdd } = this.props;
        const { value } = this.state;

        if( typeof onAdd === 'function' ){
            onAdd(value);
            this.setState({value: ''});
        }
    }

    changeValue(e){

        const newValue = e.target.value;

        this.setState({value: newValue})
    }

    render(){

        const { value } = this.state;

        return(
            <form onSubmit={this.onAdd} className="input-group mb-3 ">
                <input type="text"
                       className="form-control"
                       value={value}
                       onChange={this.changeValue}/>
            <div className="input-group-append">
                <button className="btn btn-outline-secondary">Добавить</button>
            </div>
            </form>
        )
    }

}

export default CategoryForm;
