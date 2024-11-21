"use client"

import { useEffect, useState, FormEvent } from "react";

function useTypeIn() {
    
    const [text, setText] = useState([]);
    const [error, setError] = useState<Error | null>(null);

    /*useEffect(() => {
        (async () => {

        }
        
        )
    })*/

    return {text, setText, error,}
}
 
export default function SearchBar() {

  const { text, setText, error } = useTypeIn()
  const contentClass = [text !== "" && "visible", "content"].join(" ")

  function onSubmit(e: FormEvent)
  {
    e.preventDefault()
    console.log("sent")
  }

  return (
    <div className="justify-self-center rounded-sm w-42">
      <form onSubmit={onSubmit}>
        <input 
          type="text" 
          placeholder="search books or authors"
          className="search-bar__input"
          onChange={e => setText(e.target.value)} 
          value={text} 
        />
        <button type="submit" className="justify-self-center background-slate-300 border-solid border border-slate-400">Search</button>
      </form>
    </div>
  )
}