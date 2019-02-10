import React, { PureComponent } from 'react';

class CategoryItem extends PureComponent{

    getDerivedStateFromProps(item,prevOriginalValue) {

        if (item.value !== prevOriginalValue) {
            return {
                originalValue: item.value,
                value
            };
        }

        return null;
    }

    constructor(props){
        super(props);
        this.state = {
            value: this.props.item.value
        };

        this.onSave = this.onSave.bind(this);
        this.changeValue = this.changeValue.bind(this);
    }


    onSave(){

        const { onSave, item } = this.props;
        const { value } = this.state;

        const id = item.id;

        if( typeof onSave === 'function' ){
            onSave(value, id);
            this.setState({value: this.props.item.value});
        }
    }

    onDelete(){
        const { onDelete, item } = this.props;

        if( typeof onDelete === 'function' ){
            const id = item.id;
            onDelete(id)
        }
    }

    changeValue(e){

        const newValue = e.target.value;

        this.setState({value: newValue})
    }

    render(){

        const { value } = this.state;

        return(
            <li>
                <input value={value} onChange={this.changeValue}/>
                <button onClick={this.onSave}>Сохранить</button>
                <button onClick={this.onDelete}>Удалить</button>
            </li>
        )
    }

}

export default CategoryItem;
