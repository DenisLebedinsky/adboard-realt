import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import CategoryForm from '../../components/categoryForm'
import CategoryItem from '../../components/categoryItem'
import {
    addCategory,
    deleteCategory,
    updateCategory,
    fetchCategories
} from './../../actions'
import {getCategories, getToken} from "../../selectors";

class EditCategory extends PureComponent{

    constructor(props){
        super(props);

        this.onAdd =this.onAdd.bind(this);
        this.onSave =this.onSave.bind(this);
        this.onDelete =this.onDelete.bind(this);
    }

    onAdd(value){

        const id = String(Date.now());
        const {token} = this.props;
        
       this.props.addCategory({id:id,value:value},token);
       this.props.fetchCategories();
    }

    onSave(id,value){

        const {token} = this.props;

        this.props.updateCategory({id,value},token);
    }

    onDelete(id){
       
        const {token} = this.props;
       
        this.props.deleteCategory(id,token);
    }

    componentDidMount() {
        if(this.props.items && this.props.items.length === 0 ){
            this.props.fetchCategories();
        }
    }

    render(){

        return (
            <div className="d-flex flex-column justify-content-center mt-4">
                <div className="col-md-6">
                    <h2>Категории</h2>
                <CategoryForm onAdd={this.onAdd}/>
                {this.props.items && this.props.items.map(item =>{
                    return(
                        <CategoryItem
                            key={item.id}
                            item={item}
                            onSave={this.onSave}
                            onDelete={this.onDelete}
                        />)}
                )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        items: getCategories(state),
        token: getToken(state)
    }
};
const mapDispatchToProps ={
    addCategory,
    deleteCategory,
    updateCategory,
    fetchCategories
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(EditCategory)
