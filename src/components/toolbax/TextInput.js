import React from 'react';

// hooks     object özellikleri olarak yazdığımız parametreler props tarafından geliyorsa hooks ile eşleştiriyor ve fonksiyon içinde kullanabiliyoruz
const TextInput = ({name,label,onChange,placeHolder,value,error}) => {       // arrow functionı değişkene atıyoruz
    let wrapperClass = "form-group";
    
    if(error && error.length > 0){
        wrapperClass += " has error";
    }

    return (
        <div className={wrapperClass}>
            <label htmlFor={name}>{label}</label>
            <div className='field'>
                <input type="text" name={name} className="form-control" placeholder={placeHolder} value={value} onChange={onChange}/>
                {error&&<div className='alert alert-danger'> {error} </div>}
            </div>
        </div>
    )
        
    
}

export default TextInput;