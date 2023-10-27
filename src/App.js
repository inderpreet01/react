import { useEffect, useRef, useState } from 'react';
import './App.css';
import { useCallback } from 'react';

function App() 
{
  const [length,setLength]=useState(8)
  const [number,setnumber]=useState(false)
  const [char,setchar]=useState(false)
  const [Password,setpassword]=useState("")
//useref hook
const passwordref=useRef(null);

  const PasswordGenerator =useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number){
      str+="0123456789"
    }
    if(char){
      str+="@!#$%^&*{}[]?"
    }
    for(let i=1;i<= length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setpassword(pass)
  },[length,number,char,setpassword])
  const copyPasswordClipboard=useCallback(()=>{
    passwordref.current?.select()
    passwordref.current?.setSelectionRange(0,99)
    window.navigator.clipboard.writeText(Password)
  },[Password])
useEffect(()=>{
  PasswordGenerator()
},[length,number,char,PasswordGenerator])
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8  text-orange-500 bg-gray-700 '>
    <h1 className='text-white text-center my-3 '>password generator</h1>
      <div className="flex-shadow rounded-lg overflow-hidden mb-4">
        <input type='text'
        value={Password}
        className='outline-none w-5/6 py-1 px-3'
        placeholder='password'
        readOnly
          ref={passwordref}
        />
        <button 
        onClick={copyPasswordClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-1 shrink-0'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type='range' min={6} max={100} value={length}
          className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
          />
          <label>length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
        <input type="checkbox" defaultChecked={number}
          id='number-input'
            onChange={()=>{setnumber((prev)=>!prev);}}
          />
          <label htmlFor='number-input'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
        <input type="checkbox" defaultChecked={char}
          id='char-input'
            onChange={()=>{setchar((prev)=>!prev);}}
          />
          <label htmlFor='char-input'>Characters</label>
          </div>
      </div>
    </div>

    </>
  );
}

export default App;
