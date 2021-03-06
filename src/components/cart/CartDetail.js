import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import { Badge, Table, Button } from 'reactstrap';
import alertify from "alertifyjs";

class CartDetail extends Component {
    removeFromCart(product){
        this.props.actions.removeFromCart(product);
        alertify.error(product.productName + " deleted from cart" );
    }

    render() {
        return (
            <div>
                <Table hover>
                    <thead>
                        <tr>
                            <th> #</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>                       
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.cart.map(cartItem=>(
                            <tr key={cartItem.product.id}>
                                <th scope="row">{cartItem.product.id}</th>
                                <td>{cartItem.product.productName}</td>
                                <td>{cartItem.product.unitPrice}</td>
                                <td>{cartItem.quantity}</td>                                
                                <td>
                                    <Button color="danger" onClick={()=>this.removeFromCart(cartItem.product)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>     
                        ))}            
                    </tbody>
                </Table>
            </div>
        );
    }
}

// state e bağlanmak için
function mapStateToProps(state){
    return {
        cart: state.cartReducer
    }
}

// actions ı kullanmak için
function mapDispatchToProps(dispatch){
    return {
        actions:{
            removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch)
        }
    }
}

// state i props a aktardık
export default connect(mapStateToProps,mapDispatchToProps)(CartDetail);