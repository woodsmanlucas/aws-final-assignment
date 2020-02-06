import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {useParams} from "react-router"


export function Item(props){
    const [item, setItem] = useState([])
    const {id} = useParams()

    useEffect(() => {Load()}, [])

    async function Load(){
        const response = await fetch(`https://sliewqf2ye.execute-api.us-east-1.amazonaws.com/Prod/items/${id}`);
        const data = await response.json()
        console.log(data.body);
        setItem(data.body)
    }

    if(props.auth.isAuth){
        return (
            <div>
                <h1>Item</h1>
                <div key={item.id}><p>{item.name}</p><img src={item.URL} /></div>
            </div>
        )
    }else{
        return (
            <Redirect to="/" />
        )
    }
}