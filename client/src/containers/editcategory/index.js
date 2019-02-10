import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import CategoryForm from '../../components/categoryForm'
import CategoryItem from '../../components/categoryItem'
import {
    addCategory,
    deleteCategory,
    updateCategory
} from './../../actions'

class EditCategory extends PureComponent{

    constructor(props){
        super(props);

        this.onAdd =this.onAdd.bind(this);
        this.onSave =this.onSave.bind(this);
        this.onDelete =this.onDelete.bind(this);
    }

    onAdd(value){
        const id = String(Date.now());
        addCategory({id,value});
    }

    onSave(id,value){
        updateCategory({id,value});
    }

    onDelete(id){
        deleteCategory(id);
    }

    render(){

        const { items }= this.props;

        return (
            <div>
                <CategoryForm onAdd={this.onAdd}/>
                {items && items.map(item =>{
                    <CategoryItem
                        item={item}
                        onSave={this.onSave}
                        onDelete={this.onDelete}
                    />
                })}
            </div>
        )
    }
}

const mapStateToProps = state =>{
    items:state.categorys;
};
const mapDispatchToProps ={

};

export default connect(
    null,
    null
    )(EditCategory)
