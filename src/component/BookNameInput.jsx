import React,{useState, useRef, useEffect} from 'react';
    import {fetchBookData} from '../http.js';

function BookNameInput({setInputData}) {
    const [inputQuery, setInputQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [bookData, setBookData] = useState({});
    const shouldFetchRef=useRef(true);

    useEffect(()=>{

            if(!shouldFetchRef.current){
               shouldFetchRef.current = true;
               return;
            }

           if(inputQuery.length < 3 ){
            setSuggestions([]);
            return;
           }
           
          setTimeout(async()=>{
            const response = await fetchBookData(inputQuery);
            setBookData(response);
            const finalResponse = response.map((book)=>book.title);
            setSuggestions(finalResponse);
            console.log(response);
          },200);

    },[inputQuery])


  console.log(inputQuery);

    function handleSuggestionClick(title){
        console.log("clicked");
        console.log(title);
        setInputQuery(title);
        handleCreateBook(title);
        
        setSuggestions([]);
        shouldFetchRef.current = false;
    }

    function handleCreateBook(title){
      const selectedBook = bookData.find((book)=>book.title === title);
      setInputData((prev)=>({...prev, title: title, author: selectedBook.author, cover: selectedBook.cover}));
    }
    
  return (
    <div className="input-block">
        <label>Please enter the book title</label>
        <input type="text" name='title' value={inputQuery} onChange={(e)=>{setInputQuery(e.target.value)}} />
       {suggestions.length >0 && (
        <ul className='suggestion-box'>
            {suggestions.map((title, idx)=><li key={idx} onClick={()=>handleSuggestionClick(title)}>{title}</li>)}
        </ul>
       )}
      
    </div>
  )
}

export default BookNameInput