
import { useRef, useState } from 'react';
import Cookies from 'universal-cookie/cjs/Cookies';
import './App.css';
import Auth from './components/Auth';
import Chat from './components/Chat';
const cookies= new Cookies

function App() {

  const [room,setRoom]=useState(null);
  const [isAuth, setIsAuth] =useState(cookies.get('auth-token'));
  const roomInputRef=useRef();

  if(!isAuth){
    return (
      <div className="App">
        <Auth setIsAuth={setIsAuth}/>
      </div>
    );
  }

  return (<div>
    {room ?(<div><Chat room={room}/> {room} {isAuth}</div>):
          (<div> 
            <label>Enter Room No.:</label>
            <input ref={roomInputRef}/>
            <button onClick={(e)=>{setRoom(roomInputRef.current.value)}}>Enter</button>
          </div>)}
  </div>)
 
}

export default App;
