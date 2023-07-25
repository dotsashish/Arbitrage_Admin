import React, { useEffect, useState } from "react";
import { injectModels } from "../Redux/injectModels";
import { Routes } from '../Constants';
import { Link } from "react-router-dom";
//import { ethers } from 'ethers';
import Web3 from "web3";
import * as CONTRACTS from "../Contract";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Web3Modal from 'web3modal'
import { ethers } from "ethers";
const { providers } = ethers;

function Dashboard(props) {
  const [usersCount, setUsersCount] = useState(0);
  const [videosCount, setVideosCount] = useState(0);
  const [videosActiveCount, setVideosActiveCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [balance, setBalance] = useState(0);
  const [usersblockCount, setUsersblockCount] = useState(0)

  const address = process.env.REACT_APP_TOKEN_ADDRESS;
  const BLOCKCHAIN_NETWORK = process.env.REACT_APP_BLOCKCHAIN_NETWORK;
  const ownerAddress = process.env.REACT_APP_OWNER_ADDRESS;
  const BLOCKCHAIN_ID = process.env.REACT_APP_BLOCKCHAIN_ID;

useEffect(() => {
  onAccountChange();
  getData();
  getContarctData();
}, []);

const onAccountChange = () => {
  if (window.ethereum !== undefined) {
    window.ethereum.on("networkChanged", function (networkId) {
      if (networkId !== BLOCKCHAIN_ID) {
        toast.error("Unsupported Chain Id Error. Please Connect BSC test Network!", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        window.location.reload();
      }
    });
  }
};

const getData = async () => {
  props.application.setLoading(true);
  try {
    const res = await props.admin.getDashboardData();
    if(res.data){
      setUsersCount(res.data.users);
      setVideosCount(res.data.videos);
      setVideosActiveCount(res.data.videoActiveCount)
      setUsersblockCount(res.data.usersblockCount)
      props.application.setLoading(false);
    }
    else {
      props.application.setLoading(false);
    }
  } catch (error) {
    props.application.setLoading(false);
  }
};

const getContarctData = async () => {
  try {
    props.application.setLoading(true);
    const provider =
      window.ethereum && window.ethereum.isMetaMask
        ? window.ethereum
        : new Web3.providers.HttpProvider(BLOCKCHAIN_NETWORK);
    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(CONTRACTS.Viddly.abi, address);
    const receiptRevenue = await contract.methods.getTotalEarning().call();
    const price = ethers.utils.formatUnits(receiptRevenue, "ether");
    setRevenue(parseFloat(price));
    const balance = await web3.eth.getBalance(address);
    setBalance(web3.utils.fromWei(balance, 'ether'));
    props.application.setLoading(false);
  } catch (error) {
    console.error(error);
    props.application.setLoading(false);
    toast.error("Something went wrong!", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
};

const confirmationWithdrawal = async () => {
  Swal.fire({
    title: 'Confirmation',
    text: 'Are you sure you want to withdrawal?',
    showCancelButton: true,
    confirmButtonColor: "#3f6dcf",
    cancelButtonColor: "#373737",
    confirmButtonText: `Yes`,
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        props.application.setLoading(true);
        if(balance > 0){
        let response = await withdrawal();
        props.application.setLoading(false);
        if (window.ethereum) {
          if(response === true){
            Swal.fire("Withdrawal!", "Withdrawal successful!", "success");
            getContarctData();
          }
          else {
            Swal.fire("Withdrawal!", "Something went wrong!", "error");
          }
        }
        else {
          Swal.fire("Install!", "Please install metamask!", "warning");
        }
      }
      else{
        toast.error("Insuficient balance to withdrawal!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      } catch (err) {
        props.application.setLoading(false);
        console.log(err);
        return Promise.reject(err);
      }
    }
  });
};



const providerOptions = {
  // coinbasewallet: {
  //   package: CoinbaseWalletSDK,
  //   options: {
  //     appName: "Vidlly",
  //     infuraId: {97: "https://data-seed-prebsc-1-s1.binance.org:8545/"}
  //   }
  // }
}

// const paramWC = {
//   rpc: {
//     [process.env.REACT_APP_BLOCKCHAIN_ID] : `${process.env.REACT_APP_BLOCKCHAIN_NETWORK}` 
//   }
// };

const withdrawal = async () => {
  let message = "";
  onAccountChange();
  try
  {
    props.application.setLoading(true);
    let transaction;
    if (window.ethereum) {
      let web3Modal = new Web3Modal({
        cacheProvider:false,
        providerOptions,
        });
        const web3ModalInstance = await web3Modal.connect();
        const web3ModalProvider = new providers.Web3Provider(web3ModalInstance)
        const signer = web3ModalProvider.getSigner();
        const dotContract = new ethers.Contract(
          address,
          CONTRACTS.Viddly.abi,
          signer
        );
        transaction = await dotContract.withdraw(ownerAddress);
        await transaction.wait();
        props.application.setLoading(false);
        return true;
    }
    else {
      return true;
    }
  }
  catch(err){
    console.log(err);
    if (err.code === "ACTION_REJECTED") {
      toast.error("User Rejected The Transaction", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    else if (err.message == "User Rejected"){ 
      toast.error('User rejected the request!', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    else if (err.data && err.data.message === "execution reverted: Only the contract owner can call this function.") {
      toast.error("Only the contract owner can call this function", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    else if (err.message.includes("Only the contract owner can call this function")) {
      toast.error("Only the contract owner can call this function", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    else{
      toast.error("You don`t have required amount of tokens", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    props.application.setLoading(false);
    
  }
  return false;
};

  return (
  <React.Fragment>

  <div className="pagetitle">
    <h1>Dashboard</h1>
    <nav>
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href="">Home</a></li>
        <li className="breadcrumb-item active">Dashboard</li>
      </ol>
    </nav>
  </div>
  <section className="section dashboard">
    <div className="row">
      <div className="col-lg-12">
        <div className="row">
          <div className="col-xxl-3 col-md-6">
          <Link to={Routes.USER}>
            <div className="card info-card sales-card card-pointer brdr-c">
              <div className="card-body">
                <h5 className="card-title">Registered Users <span>| Total</span></h5>
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    {/* <i className="fa-solid fa-cart-shopping" /> */}
                    <i className="fa-solid fa-user-group" />
                  </div>
                  <div className="ps-3">
                    <h6>{usersCount}</h6>
                    {/* <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
                  </div>
                </div>
              </div>
            </div>
            </Link>
          </div>
          <div className="col-xxl-3 col-md-6">
          <Link to={Routes.Videos}>
            <div className="card info-card revenue-card card-pointer brdr-c">
              <div className="card-body">
                <h5 className="card-title">Active Trades <span>| Total</span></h5>
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    {/* <i className="fa-solid fa-dollar-sign" /> */}
                    <i className="fa fa-line-chart"></i>
                  </div>
                  <div className="ps-3">
                    <h6>{15}</h6>
                    {/* <span className="text-success small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
                  </div>
                </div>
              </div>
            </div>
          </Link>
          </div>
          <div className="col-xxl-3 col-md-6">
            <div className="card info-card customers-card card-pointer brdr-c">
              <div className="card-body">
                <h5 className="card-title">Revenue <span>| Total</span></h5>
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    {/* <i className="fa-solid fa-user-group" /> */}
                    <i className="fa-solid fa-dollar-sign" />
                  </div>
                  <div className="ps-3">
                    <h6>{revenue}</h6>
                    {/* <span className="text-danger small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">decrease</span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-md-6">
            <div className="card info-card wallet-card card-pointer brdr-c">
              <div className="card-body">
                <h5 className="card-title">Wallet <span>| Balance</span></h5>
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    {/* <i className="fa-solid fa-user-group" /> */}
                    <Link  
                        onClick={(e) => {
                          e.preventDefault();
                          confirmationWithdrawal();
                    }}>
                    <i className="fa-solid fa-wallet"></i>
                    </Link>
                  </div>
                  <div className="ps-3">
                    <h6>{balance}</h6>
                    {/* <span className="text-danger small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">decrease</span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </React.Fragment>
  )
}

export default injectModels(["admin", 'application'])(Dashboard);
