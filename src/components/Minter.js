import { useEffect, useState } from "react";
import Web3 from "web3";
import { ethers } from "ethers";
import contract from "../contracts/contract.json";
import Hero from "../assets/hero.png";
import Logo from "../assets/logo.png";
import LaunchBtn from "./launchBtn";

const initialInfoState = {
  connected: false,
  status: null,
  account: null,
  web3: null,
  contract: null,
  address: null,
  contractJSON: null,
};

const initialMintState = {
  loading: false,
  status: `Mint your ${contract.name} NFT`,
  amount: 0,
  supply: "1000",
  cost: "0.25",
  paused: 1,
};

function Minter() {
  const [info, setInfo] = useState(initialInfoState);
  const [mintInfo, setMintInfo] = useState(initialMintState);

  console.log(info);

  const init = async (_request, _contractJSON) => {
    if (window.ethereum.isMetaMask) {
      try {
        const accounts = await window.ethereum.request({
          method: _request,
        });
        const networkId = await window.ethereum.request({
          method: "net_version",
        });
        if (networkId === _contractJSON.chain_id) {
          let web3 = new Web3(window.ethereum);
          setInfo((prevState) => ({
            ...prevState,
            connected: true,
            status: null,
            account: accounts[0],
            web3: web3,
            contract: new web3.eth.Contract(
              _contractJSON.abi,
              _contractJSON.address
            ),
            contractJSON: _contractJSON,
          }));
        } else {
          setInfo(() => ({
            ...initialInfoState,
            status: `Change network to ${_contractJSON.chain}.`,
          }));
        }
      } catch (err) {
        console.log(err.message);
        setInfo(() => ({
          ...initialInfoState,
        }));
      }
    } else {
      setInfo(() => ({
        ...initialInfoState,
        status: "Please install metamask.",
      }));
    }
  };

  const initListeners = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }
  };

  const getSupply = async () => {
    const params = {
      to: info.contractJSON.address,
      from: info.account,
      data: info.contract.methods.totalSupply().encodeABI(),
    };
    try {
      const result = await window.ethereum.request({
        method: "eth_call",
        params: [params, "latest"],
      });
      console.log(info.web3.utils.hexToNumberString(result));
      setMintInfo((prevState) => ({
        ...prevState,
        supply: info.web3.utils.hexToNumberString(result),
      }));
    } catch (err) {
      setMintInfo((prevState) => ({
        ...prevState,
        supply: 1000,
      }));
    }
  };

  const getCost = async () => {
    const params = {
      to: info.contractJSON.address,
      from: info.account,
      data: info.contract.methods.cost().encodeABI(),
    };
    try {
      const result = await window.ethereum.request({
        method: "eth_call",
        params: [params, "latest"],
      });
      console.log(info.web3.utils.hexToNumberString(result));
      setMintInfo((prevState) => ({
        ...prevState,
        cost: info.web3.utils.hexToNumberString(result),
      }));
    } catch (err) {
      setMintInfo((prevState) => ({
        ...prevState,
        cost: "0",
      }));
    }
  };

  const getPaused = async () => {
    const params = {
      to: info.contractJSON.address,
      from: info.account,
      data: info.contract.methods.paused().encodeABI(),
    };
    try {
      const result = await window.ethereum.request({
        method: "eth_call",
        params: [params, "latest"],
      });
      console.log(info.web3.utils.hexToNumber(result));
      setMintInfo((prevState) => ({
        ...prevState,
        paused: info.web3.utils.hexToNumber(result),
      }));
    } catch (err) {
      setMintInfo((prevState) => ({
        ...prevState,
        paused: 1,
      }));
    }
  };

  const mint = async () => {
    var weiAmount = ethers.utils.parseEther("0.25");
    const params = {
      to: info.contractJSON.address,
      from: info.account,
      gas: String(
        info.web3.utils.toHex(
          contract.gas_limit + contract.gas_multiplier * mintInfo.amount
        )
      ),
      value: String(
        info.web3.utils.toHex(Number(weiAmount) * mintInfo.amount)
      ),
      data: info.contract.methods
        .mint(info.account, mintInfo.amount)
        .encodeABI(),
    };
    try {
      setMintInfo((prevState) => ({
        ...prevState,
        loading: true,
        status: `Minting ${mintInfo.amount}...`,
      }));
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [params],
      });
      setMintInfo((prevState) => ({
        ...prevState,
        loading: false,
        status:
          "Nice!",
      }));
    } catch (err) {
      setMintInfo((prevState) => ({
        ...prevState,
        loading: false,
        status: err.message,
      }));
    }
  };

  const updateAmount = (newAmount) => {
    if (newAmount <= 5 && newAmount >= 1) {
      setMintInfo((prevState) => ({
        ...prevState,
        amount: newAmount,
      }));
    }
  };

  const connectToContract = (_contractJSON) => {
    init("eth_requestAccounts", _contractJSON);
  };

  useEffect(() => {
    connectToContract(contract);
    initListeners();
  }, []);

  useEffect(() => {
    if (info.connected) {
      getSupply();
      getCost();
      getPaused();
    }
  }, [info.connected]);

  return (
    <div className="page">
      <div className="card">
        <div className="card_header colorGradient">
          <img className="card_header_image ns" alt={"banner"} src={Hero} />
        </div>
        {mintInfo.paused === 1 || mintInfo.paused === 0 ? (
          <div className="card_body">
            {!info.connected ? (
              <p className="statusText">{info.status}</p>
            ) : (
              <p style={{ color: "var(--statusText)", textAlign: "center" }}>
                You can not mint yet. Please wait for the announcement to start
                minting.
              </p>
            )}
          </div>
        ) : mintInfo.supply < contract.total_supply ? (
          <div className="card_body">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ width: 10 }}></div>
              <button
                disabled={!info.connected || mintInfo.cost === "0"}
                className="button"
                onClick={() => mint()}
              >
                Mint {mintInfo.amount}
              </button>
              <div style={{ width: 10 }}></div>
            </div>

            {info.connected ? (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ color: "var(--statusText)", textAlign: "center" }}>
                  {Number((0.25) * mintInfo.amount).toFixed(2)}{" "}
                  {contract.chain_symbol}
                </p>
                <div style={{ width: 20 }}></div>
                <p style={{ color: "var(--statusText)", textAlign: "center" }}>
                  |
                </p>
                <div style={{ width: 20 }}></div>
                <p style={{ color: "var(--statusText)", textAlign: "center" }}>
                  {mintInfo.supply}/{contract.total_supply}
                </p>
              </div>
            ) : null}

            {mintInfo.status ? (
              <p className="statusText">{mintInfo.status}</p>
            ) : null}

            {info.status ? (
              <p className="statusText" style={{ color: "var(--error)" }}>
                {info.status}
              </p>
            ) : null}
          </div>
        ) : (
          <div className="card_body">
            <p style={{ color: "var(--statusText)", textAlign: "center" }}>
              {mintInfo.supply}/{contract.total_supply}
            </p>
            <p className="statusText">
              We've sold out!. Wait for the next round!.
            </p>
          </div>
        )}
        <div className="card_footer colorGradient">
          <button
            className="button"
            style={{
              backgroundColor: info.connected
                ? "var(--success)"
                : "var(--warning)",
            }}
            onClick={() => connectToContract(contract)}
          >
            {info.account ? "Connected" : "Connect Wallet"}
          </button>
          {info.connected ? (
            <span className="accountText">
              {String(info.account).substring(0, 6) +
                "..." +
                String(info.account).substring(38)}
            </span>
          ) : null}
        </div>
        <a
          style={{
            position: "absolute",
            bottom: 85,
            left: -90,
          }}
          className="_90 contractText"
          target="_blank"
          href={contract.scan}
        >
          {contract.symbol} Contract
        </a>
      </div>
      <img className="card_logo_image ns" alt={"banner"} src={Logo} />
      <LaunchBtn />
    </div>   
  );
}

export default Minter;
