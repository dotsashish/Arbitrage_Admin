import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import * as CONTRACTS from "../../Contract"
import Web3Modal from 'web3modal';
import Web3 from 'web3';
import { injectModels } from "../../Redux/injectModels";
import { routes } from "../../Constants/routes";
import { Link } from "react-router-dom";

//import WalletConnectProvider from '@walletconnect/web3-provider';
//import { walletconnect } from 'web3modal/dist/providers/connectors';

function TradeFee(props) {
  const [isBalance, setIsBalance] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [fee, setFee] = useState('');
  const [tradeFee, setTradeFee] = useState(0);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const address = process.env.REACT_APP_CONTRACT_ADDRESS;
  const BLOCKCHAIN_NETWORK = process.env.REACT_APP_BLOCKCHAIN_NETWORK;
  const BLOCKCHAIN_ID = process.env.REACT_APP_BLOCKCHAIN_ID;
  const ownerAddress = process.env.REACT_APP_OWNER_ADDRESS;

  useEffect(() => {
    fetchTransactionFee();
    onAccountChange();
    getBNBBalance();
  }, []);

  const fetchTransactionFee = async () => {
    try {
      props.application.setLoading(true);
      const provider =
        window.ethereum && window.ethereum.isMetaMask ? window.ethereum : new Web3.providers.HttpProvider(BLOCKCHAIN_NETWORK);
      const web3 = new Web3(provider);
      const contract = new web3.eth.Contract(CONTRACTS.Arbitrage.abi, address);
      const receipt = await contract.methods.getTradeFee().call();
      const fee = ethers.utils.formatUnits(receipt, 'ether');
      setTradeFee(fee);
      // setTradeFee(parseFloat(fee));
      props.application.setLoading(false);
    } catch (error) {
      console.error(error);
      props.application.setLoading(false);
      toast.error('Something went wrong!', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const onAccountChange = () => {
    if (window.ethereum !== undefined) {
      window.ethereum.on('networkChanged', function (networkId) {
        if (networkId !== BLOCKCHAIN_ID) {
          toast.error('Unsupported ChainId Error. Please connect BSC test network!', {
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

  const handleFee = (e) => {
    e.preventDefault();
    const val = e.target.value.replace(/[^\d.]/g, '');
    if (val.trim() === '' || val.trim() <= 0) {
      setError('Trade fee must be greater than zero!');
    } else {
      setError('');
    }
    setFee(val.trim());
  };

  const handleEdit = async () => {
    handleShow();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    if (fee === '') {
      setError('Trade fee is required!');
      valid = false;
    } else if (fee <= 0) {
      setError('Trade fee must be greater than zero!');
      valid = false;
    } else {
      setError('');
    }
    if (!valid) {
      return;
    }
    try {
      onAccountChange();
      if (isBalance === true) {
        if (window.ethereum) {
          props.application.setLoading(true);
          const web3Modal = new Web3Modal({
            cacheProvider: false,
            providerOptions: {},
          });
          const web3ModalInstance = await web3Modal.connect();
          const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInstance);
          const signer = web3ModalProvider.getSigner();
          const bnbPrice = Web3.utils.toWei(fee, 'ether');
          const dotContract = new ethers.Contract(address, CONTRACTS.Arbitrage.abi, signer);
          const transaction = await dotContract.setTradeFee(bnbPrice);
          await transaction.wait();
        
          const data = {
            fee: fee.trim()
          };
          //const responce = await props.admin.tradeFeeLog(data);

          toast.success('Trade fee updated successfully!', {
            position: toast.POSITION.TOP_CENTER,
          });
          props.application.setLoading(false);
          fetchTransactionFee();
          handleClose();
        } else {
          toast.warning('Please install MetaMask!', {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } else {
        // const paramWC = {
        //   rpc: {
        //     [process.env.REACT_APP_BLOCKCHAIN_ID] : `${process.env.REACT_APP_BLOCKCHAIN_NETWORK}` 
        //   }
        // };
       // const projectId = '2599217e88bbbd704416ab788b59a9b2'

        // const web3Modal = new Web3Modal({
        //   network: `${process.env.REACT_APP_BLOCKCHAIN_NETWORK}`,
        //   cacheProvider: true,
        //   providerOptions,
        // });

        // const provider = await web3Modal.connect();
        // const web3Instance = new Web3(provider);

        // const provider = await web3Modal.connect();
        // const web3Instance = new Web3(provider);

        toast.error('You have insufficient balance in BNB!', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (err) {
      console.log(err)
      if (err.code === 'ACTION_REJECTED') {
        toast.error('User rejected the transaction!', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      else if (err.message == "User Rejected"){ 
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

  return (
    <React.Fragment>
      <div className="pagetitle">
        <h1>Trade Fee</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={routes.DASHBOARD}>Home</Link></li>
            <li className="breadcrumb-item active">Trade Fee</li>
          </ol>
        </nav>
      </div>
      <table id="faq" className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Trade Fee</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>{tradeFee}</td>
            <td><a className="btn btn-primary mr-3 fee-button" onClick={handleEdit}>Edit</a></td>
          </tr>
        </tbody>
      </table>
      <Modal show={showModal} onHide={handleClose}>      
        <Modal.Header closeButton className="modal-main-header">
          <Modal.Title>Update Trade Fee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="searchformfld">
              <input
                type="number"
                className="form-control mb-3"
                placeholder="BNB*"
                maxLength={8}
                value={fee}
                onChange={handleFee}
                required
                onInput={(e) => {
                  if (e.target.value.length > e.target.maxLength) {
                    e.target.value = e.target.value.slice(0, e.target.maxLength);
            }
          }}
        />
        </div>
        <div className='d-flex align-items-center justify-content-center'>
        {/* <Button variant="secondary" onClick={handleClose}>
        Close
      </Button> */}
      <Button type="submit" variant="primary custom-button-colour" onClick={handleSubmit}>
        Save Changes
      </Button>
        </div>
      </form>
    </Modal.Body>
    {error && (
      <div className="col-xs-12 col-md-12 col-lg-12">
        <div className="alert alert-danger">{error}</div>
      </div>
    )}
    {/* <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button type="submit" variant="primary custom-button-colour" onClick={handleSubmit}>
        Save Changes
      </Button>
    </Modal.Footer> */}
      </Modal>
</React.Fragment>
);
}
export default injectModels(["admin", 'application'])(TradeFee);




