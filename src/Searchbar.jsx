import React, { useEffect, useState, useRef } from 'react'

const Searchbar = () => {
    const [searchitem, setSearchitem] = useState('')
    const [searchresults, setSearchresults] = useState([])

    const cache = useRef({});
    //useRef is used to store the cache object, which will persist across renders without causing re-renders
    //useRef is used to store the cache object, which will persist across renders without causing re-renders
    
    useEffect(()=>{
        const controller = new AbortController();
        const {signal} = controller.signal;
        //both line used for aborting the fetch request jab tak user kuch type karega tab tak

        const fetched=async()=>{
          if(cache.current[searchitem]){
            setSearchresults(cache.current[searchitem])
            console.log("cache")
          }
          try{
              const res = await fetch(`https://dummyjson.com/products/search?q=${searchitem}&limit=10 `,{signal})
              const data = await res.json()
              console.log(data)
              cache.current[searchitem] = data.products
              setSearchresults(data.products);
          }
          catch(error){
              console.log(error)
          }
      }
        //fetching data
       if(searchitem.length>0){
        //debounce
        
       const timerid =  setTimeout(fetched, 1000)

        return ()=>{
          //cleartimeout used for debounce
            // when the searchitem changes, the previous timer will be cleared
            clearTimeout(timerid);
            
            controller.abort()
            // used for cleanup
            // when the component unmounts or when the searchitem changes
        }
        
        
       }
    },[searchitem]);
  return (
    <div className="main" >
        <h1>Searchbar</h1>
      <input type="text" width={300} height={200} onChange={(e)=>setSearchitem(e.target.value)}/>

      <div>
        <h5>Searched</h5>
        {
            searchresults.map((item)=>{
                return(
                    <li key={item.id}>{item.title} </li>
                )
            })
        }
      </div>
    </div>
  )
}

export default Searchbar
