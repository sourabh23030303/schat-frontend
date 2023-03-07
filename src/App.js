
// import  socketIO from "socket.io-client"
import Chat from './component/chat/chat';
import './App.css';
import { BrowserRouter as Router , Routes,Route } from "react-router-dom";
import Join from "./component/join/join";

// //socket's end point is created 
// const ENDPOINT ="http://localhost:4500/"
// const socket=socketIO( ENDPOINT,{transports:['websocket']})//this is making connection bwt server and front end with socket bexause we have given the endpoint

function App() {

 

  return (
  <>
 
  <Router>
  <Routes>
<Route exact path="/"  element={<Join/>}/>
<Route  exact path="/Chat" element={<Chat/>} />
</Routes>
  </Router>
  </>
  );
}

export default App;
