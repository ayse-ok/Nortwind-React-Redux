import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import {getCategories} from "../../redux/actions/categoryActions";
import {saveProduct} from "../../redux/actions/productActions";
import ProductDetail from "./ProductDetail";

function AddOrUpdateProduct({
    products, 
    categories, 
    getProducts, 
    getCategories, 
    saveProduct,
    history,
    ...props            // mevcut propsları genişletiyoruz yani mevcut componentin props ına yukardaki parametreleri de ekliyoruz
}){
    // state deki product ı setProduct fonksiyonu ile set edebilirim
    //set state yerine react hooks da bu şekilde kullanılıyor
    const [product, setProduct] = useState({...props.product});

    const [errors, setErrors] = useState({});

    // categoiler yüklenmeden geldiyse önce onları yükle
    useEffect(()=>{
        if(categories.length === 0){
            getCategories();
        }

        // state deki product nesnesini set ettik
        setProduct({...props.product});
    },[props.product]);  // props.product ı izle dom a yerleştiğinde bitir yoksa sonsuz döngü oluyor

    function handleChange(event){
        const {name, value} = event.target;
        setProduct(previousProduct=>({
            ...previousProduct,
            [name]: name === "categoryId" ? parseInt(value, 10) : value
        }));

        validate(name,value);
                
    }

    function handleSave(event){
        event.preventDefault();
        saveProduct(product).then(()=>{
            history.push("/")
        });
    }


    function validate(name,value){
        if(name === "productName" && value === ""){
            setErrors(previousErrors=>({
                ...previousErrors,
                productName: "product name is required!"
            }));
        }else{
            setErrors(previousErrors=>({
                ...previousErrors,
                productName: ""
            }));
        }        
    }

    return(
        <ProductDetail 
            product={product} 
            categories={categories} 
            onChange={handleChange} 
            onSave={handleSave}
            errors={errors}
        />
    )
}

// uygulamayı redux a bağladık
const mapDispatchToProps = {
    getCategories,saveProduct
}

// state i redux a bağladık
function mapStateToProps(state,ownProps){
    const productId = ownProps.match.params.productId;
    const product = productId && state.productListReducer.length > 0 
        ? getProductById(state.productListReducer,productId) 
        : {}
        return {
            product,
            products: state.productListReducer,
            categories: state.categoryListReducer
        } 
}

export function getProductById(products,productId){
    let product = products.find( product => product.id == productId) || null ;
    return product;
}

export default connect(mapStateToProps,mapDispatchToProps)(AddOrUpdateProduct)