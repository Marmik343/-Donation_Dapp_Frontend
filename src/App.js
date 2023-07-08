import abi from "./contract/chai.json";
import {useState,useEffect} from "react";
import './App.css';
// import { BrowserProvider } from "ethers";
import Buy from "./components/Buy";
import Memos from "./components/Memos";
const ethers = require("ethers")

function App() {
  const[state,setState] = useState({
    provider:null,
    signer:null,
    contract:null
  }
  )

    //Initialise the useSatate variables using useEffect
  const [account, setAccount] = useState("None");
    useEffect(() => {
      const connectWallet = async() =>{
          const contractAddress = "0x9F253e9CD0eA2B8dcb4552aaD7BBdB480E8F48e2";
          const contractABI = abi.abi;
          try{
            const {ethereum} = window;
            if(ethereum){
              const account = await ethereum.request({method:"eth_requestAccounts",})

              window.ethereum.on("chainChange", () =>{
                window.location.reload();
              })

              window.ethereum.on("accountsChange", () =>{
                window.location.reload();
              })

            const provider  = new ethers.providers.Web3Provider(ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress,contractABI,signer);
            setAccount(account);
            setState({provider,signer,contract})
            }else{
              alert("Please install Metamask");
            }

          }catch(e){
            console.log(e);
          }
      };
      connectWallet();
  },[])
  console.log(state);
  return (
    <div className="App">
      <p>Connected Account: {account}</p>
      <Buy state={state}></Buy>  
      <Memos state={state}></Memos>  


    </div>
  );
}

export default App;
