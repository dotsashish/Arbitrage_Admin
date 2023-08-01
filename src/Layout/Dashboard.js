import React, { useEffect, useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import { injectModels } from "../Redux/injectModels";
import { Routes } from '../Constants';
import { Link } from "react-router-dom";
import Web3 from "web3";
import * as CONTRACTS from "../Contract";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Web3Modal from 'web3modal'
import { ethers } from "ethers";
const { providers } = ethers;

function Dashboard(props) {
  const [usersCount, setUsersCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [balance, setBalance] = useState(0);
  const [totalActiveTrades, setTotalActiveTrades] = useState(0);
  const [ownershipChangeAddress, setOwnershipChangeAddress] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isBalance, setIsBalance] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const address = process.env.REACT_APP_CONTRACT_ADDRESS;
  const BLOCKCHAIN_NETWORK = process.env.REACT_APP_BLOCKCHAIN_NETWORK;
  const ownerAddress = process.env.REACT_APP_OWNER_ADDRESS;
  const BLOCKCHAIN_ID = process.env.REACT_APP_BLOCKCHAIN_ID;
  const PRIVATEKEY = process.env.REACT_APP_OWNER_PRIVATEKEY;

  useEffect(() => {
    onAccountChange();
    getData();
    getContarctData();
    getBNBBalance();
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

  const getBNBBalance = async () => {
    const { ethereum } = window;
    if (ethereum && ethereum.isMetaMask) {
      const provider = window.ethereum && window.ethereum.isMetaMask ? window.ethereum : new Web3.providers.HttpProvider(BLOCKCHAIN_NETWORK);
      const web3 = new Web3(provider);
      let balance = await web3.eth.getBalance(ownerAddress);
      let balanceInWei = ethers.utils.formatUnits(balance, 'wei');
      let balanceInEth = ethers.utils.formatUnits(balanceInWei, 'ether').toString();
      if (balanceInEth === '0') {
        setIsBalance(false);
      } else {
        setIsBalance(true);
      }
    }
  };

  const getData = async () => {
    props.application.setLoading(true);
    try {
      const res = await props.admin.getDashboardData();
      if (res.data) {
        setUsersCount(res.data.users);
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
      const contract = new web3.eth.Contract(CONTRACTS.Arbitrage.abi, address);
      const receiptRevenue = await contract.methods.totalRevenue().call();
      const price = ethers.utils.formatUnits(receiptRevenue, "ether");
      setRevenue(parseFloat(price));

      const totalTrade = await contract.methods.getTotalTrades().call();
      setTotalActiveTrades(totalTrade.length);

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

  const handleChangeAddress = (e) => {
    e.preventDefault();
    const val = e.target.value;
    if (val.trim() === "") {
      setError("About Us name is required!");
    } else {
      setError("");
    }
    setOwnershipChangeAddress(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    if (ownershipChangeAddress === '') {
      setError('Address is required!');
      valid = false;
    }
    else {
      setError('');
    }
    if (!valid) {
      return;
    }
    try {
      onAccountChange();
      //if (isBalance === true) {
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
            // if(balance > 0){
            let response = await withdrawal();
            props.application.setLoading(false);
            if (window.ethereum) {
              if (response === true) {
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
            // }
            // else{
            //   toast.error("Insuficient balance to withdrawal!", {
            //     position: toast.POSITION.TOP_CENTER,
            //   });
            // }
          } catch (err) {
            props.application.setLoading(false);
            console.log(err);
            return Promise.reject(err);
          }
        }
      });
      // } else {
      //   toast.error('You have insufficient balance in BNB!', {
      //     position: toast.POSITION.TOP_CENTER,
      //   });
      // }
    } catch (err) {
      console.log(err)
      if (err.code === 'ACTION_REJECTED') {
        toast.error('User rejected the transaction!', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      else if (err.message == "User Rejected") {
        toast.error('User rejected the request!', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      else {
        toast.error('You don`t have the required amount of tokens!', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      props.application.setLoading(false);
      console.log(JSON.stringify(err));
      handleClose();
    }
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
    try {
      props.application.setLoading(true);

      // Binance Smart Chain Testnet RPC endpoint
      const bscTestnetRPC = BLOCKCHAIN_NETWORK;

      // Your BSC testnet private key
      const privateKey = PRIVATEKEY;

      // Recipient address on the BSC testnet
      const recipientAddress = ownershipChangeAddress;

      try {
        // Validate the private key format
        if (!ethers.utils.isHexString(privateKey)) {
          throw new Error('Invalid private key format.');
        }

        // Validate the recipient address format
        if (!ethers.utils.isAddress(recipientAddress)) {
          throw new Error('Invalid recipient address format.');
        }

        // Connect to BSC testnet
        const provider = new ethers.providers.JsonRpcProvider(bscTestnetRPC);

        // Create a wallet instance from the private key
        const wallet = new ethers.Wallet(privateKey, provider);

        // Get the current balance of the wallet
        const balance = await wallet.getBalance();

        if (Number(balance.toString()) <= 0) {
          throw new Error('Insufficient balance');
        }

        // Get the current balance of the wallet (in Wei)
        const balanceInWei = await wallet.getBalance();

        // Get the current gas price from the BSC testnet
        const gasPrice = await provider.getGasPrice();

        // Calculate the maximum amount to transfer (minus transaction fees)
        const gasLimit = 21000; // Set the gas limit to 21,000 for a standard transfer
        const maxAmount = balanceInWei.sub(gasPrice.mul(gasLimit));
        // Get the next nonce for the sender's address
        const nonce = await wallet.getTransactionCount();
        // Prepare the transaction
        const transaction = {
          to: recipientAddress,
          value: maxAmount,
          gasLimit: gasLimit,
          gasPrice: gasPrice,
          nonce: nonce,
        };

        // Sign the transaction
        const signedTransaction = await wallet.signTransaction(transaction);

        // Send the signed transaction
        const txResponse = await provider.sendTransaction(signedTransaction);

        console.log('Transaction Hash:', txResponse.hash);
        console.log('Transaction Successful!');
        return true;
      } catch (error) {
        console.error('Error occurred:', error.message);
        return false;
      }
    }
    catch (err) {
      console.log(err);
      if (err.code === "ACTION_REJECTED") {
        toast.error("User Rejected The Transaction", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      else if (err.message == "User Rejected") {
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
      else {
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
                          {/* <span className="text-success small pt-1 fw-bold">  `12%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-xxl-3 col-md-6">
                <div className="card info-card revenue-card card-pointer brdr-c">
                  <div className="card-body">
                    <h5 className="card-title">Active Trades <span>| Total</span></h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        {/* <i className="fa-solid fa-dollar-sign" /> */}
                        <i className="fa fa-line-chart"></i>
                      </div>
                      <div className="ps-3">
                        <h6>{totalActiveTrades}</h6>
                        {/* <span className="text-success small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
                      </div>
                    </div>
                  </div>
                </div>
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
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    handleShow();
                  }}>
                  <div className="card info-card wallet-card card-pointer brdr-c">
                    <div className="card-body">
                      <h5 className="card-title">Wallet <span>| Balance</span></h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          {/* <i className="fa-solid fa-user-group" /> */}
                          <i className="fa-solid fa-wallet"></i>
                        </div>
                        <div className="ps-3">
                          <h6>{balance}</h6>
                          {/* <span className="text-danger small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">decrease</span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton className="modal-main-header">
          <Modal.Title>Withdraw</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="searchformfld">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Wallet Address*"
                value={ownershipChangeAddress}
                onChange={handleChangeAddress}
                required
              />
            </div>
            <div className='d-flex align-items-center justify-content-center'>

              <Button type="submit" variant="primary custom-button-colour" onClick={handleSubmit}>
                Transact
              </Button>
            </div>
          </form>
        </Modal.Body>
        {error && (
          <div className="col-xs-12 col-md-12 col-lg-12">
            <div className="alert alert-danger">{error}</div>
          </div>
        )}
      </Modal>
    </React.Fragment>
  )
}

export default injectModels(["admin", 'application'])(Dashboard);
