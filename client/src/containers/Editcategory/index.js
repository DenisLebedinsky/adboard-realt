import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class EditCategory extends PureComponent{


    render(){
        return (
            <div>   
                hello, category!
            </div>
        )
    }
}

const mapStateToProps = state =>{

}
const mapDispatchToProps ={

}

export default connect(
    null,
    null
    )(EditCategory)