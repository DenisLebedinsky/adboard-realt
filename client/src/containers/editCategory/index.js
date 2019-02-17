import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import CategoryForm from '../../components/categoryForm'
import CategoryItem from '../../components/categoryItem'
import {
    addCategory,
    deleteCategory,
    updateCategory
} from './../../actions'
import categories from "../../reducers/categories";
import {getCategories} from "../../selectors";

class EditCategory extends PureComponent{

    constructor(props){
        super(props);

        this.onAdd =this.onAdd.bind(this);
        this.onSave =this.onSave.bind(this);
        this.onDelete =this.onDelete.bind(this);
    }

    onAdd(value){
        const id = String(Date.now());
       this.props.addCategory({id,value});
    }

    onSave(id,value){
        this.props.updateCategory({id,value});
    }

    onDelete(id){
        this.props.deleteCategory(id);
    }

    render(){

        return (
            <div>
                <CategoryForm onAdd={this.onAdd}/>
                {this.props.items && this.props.items.map(item => <CategoryItem key={item.id} item={item} onSave={this.onSave} onDelete={this.onDelete} />)}
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        items: getCategories(state)
    }
};
const mapDispatchToProps ={
    addCategory,
    deleteCategory,
    updateCategory
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(EditCategory)
