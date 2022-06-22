import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge, ListGroup, ListGroupItem } from 'reactstrap';
import { bindActionCreators} from 'redux';
import * as categoryActions from '../../redux/actions/categoryActions';
import * as productActions from '../../redux/actions/productActions';


class CategoryList extends Component {

    //uygulama açıldığında categorileri bir kere getir
    componentDidMount(){
        this.props.actions.getCategories()
    }

    selectCategory=(category)=>{
        this.props.actions.changeCategory(category);
        this.props.actions.getProducts(category.id);
    }

    render() {
        return (
            <div>
                <h3>
                    <Badge color='warning'>Categories</Badge>
                </h3>
                
                <ListGroup>
                    {this.props.categories.map(category=>(
                        <ListGroupItem 
                            key={category.id} 
                            onClick={()=> this.selectCategory(category)} 
                            active={category.id===this.props.currentCategory.id}
                        >
                            {category.categoryName}
                        </ListGroupItem>
                    ))}                    
                </ListGroup>               
            </div>
        );
    }
}

// state i props a bağla  state=reducer
function mapStateToProps(state){
    return {
        //changeCategoryReducer ın ortaya çıkardığı state datasına bağlanmak istiyoruz
        currentCategory:state.changeCategoryReducer,
        categories:state.categoryListReducer
    }
}

//aksiyonları props a bağla
function mapDispatchToProps(dispatch){
    return{
        actions:{
            getCategories: bindActionCreators(categoryActions.getCategories,dispatch),
            changeCategory: bindActionCreators(categoryActions.changeCategory,dispatch),
            getProducts: bindActionCreators(productActions.getProducts, dispatch)
        }
    }
}

// state i ve action u redux a bağlıyoruz
export default connect(mapStateToProps,mapDispatchToProps)(CategoryList);