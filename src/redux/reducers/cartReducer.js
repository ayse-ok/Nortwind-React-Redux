import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState'

export default function cartReducer(state=initialState.cart,action){
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            var addedItem = state.find(c=>c.product.id === action.payload.product.id);  // urun daha once sepette varsa state(sepet) te bul.
            if(addedItem){          // sepette o urun varsa
                var newState = state.map(cartItem=>{        // map le arrayi gez aynı urun varsa oluşan yeni array ı newState ye ata
                    if(cartItem.product.id === action.payload.product.id){
                        return Object.assign({},addedItem,{quantity:addedItem.quantity+1})          // sepette varsa o urununun quantitysini 1 arttır
                    }
                    return cartItem;
                })  
                return newState;               
            }else{          // sepette o urun yoksa
                return [...state,{...action.payload}]       // state in bir copyasını al ve o kopyaya action ile gelen payload ı ekle yani array e eleman ekliyoruz ancak arrayın kopyasını alarak eleman ekliyoruz
            }
         
        case actionTypes.REMOVE_FROM_CART: 
            const newState2 = state.filter(cartItem=>cartItem.product.id !== action.payload.id);     // parametreden farklı id olanlar filter ile yeni array yap böylece referans değişecek
            return newState2;

        default:
            return state;
    }
}