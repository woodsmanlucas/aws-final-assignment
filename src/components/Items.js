import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';

export function Items(props){
    const [items, setItems] = useState([])

    useEffect(() => {Load()}, [])

    async function Load(){
        const response = await fetch("https://sliewqf2ye.execute-api.us-east-1.amazonaws.com/Prod/items");
        const data = await response.json()
        console.log(data.Items);
        setItems(data.Items)
    }

    if(props.auth.isAuth){
        return (
            <div>
                <h1>Items</h1>
                {items.map((item) => {
                    return <div key={item.id} ><p>{item.name}</p><img src={item.URL} /><div/>
                })}
            </div>
        )
    }else{
        return (
            <Redirect to="/" />
        )
    }
}