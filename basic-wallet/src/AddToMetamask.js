import React from 'react';
import { default as Web3 } from 'web3'
import './css/App.css'

export const AddToMetamask = props => {
    const { Page } = props.BurnerComponents;

    const snapId = 'http://localhost:8081/package.json'

    const getAccount = async () => {
        let account = null;
        try {
            if (
                typeof window.ethereum !== "undefined" ||
                typeof window.web3 !== "undefined"
            ) {
                account = await window.ethereum.enable();
                window.web3 = new Web3(window.ethereum);
                window.readOnly = false;
            } else {
                window.web3 = new Web3(
                    new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws")
                );
                window.readOnly = true;
            }
        } catch (error) {
            console.log(error);
        }
        return account;
    };

    const installPlugin = async () => {
        await getAccount()
        await window.ethereum.send({
            method: 'wallet_enable',
            params: [{
                wallet_plugin: { [snapId]: {} },
            }]
        })
    }

    const addAccountToMetamask = async () => {
        try {
            const response = await window.ethereum.send({
                method: 'wallet_invokePlugin',
                params: [snapId, {
                    method: 'addAccount',
                    key: props.actions.callSigner('readKey', props.defaultAccount),
                    address: props.defaultAccount
                },]
            })
        } catch (err) {
            console.error(err)
            alert('Problem happened: ' + err.message || err)
        }
    }

    const removeAccountfromMetamask = async () => {
        try {
            const response = await window.ethereum.send({
                method: 'wallet_invokePlugin',
                params: [snapId, {
                    method: 'removeAccount',
                    address: props.defaultAccount
                },]
            })
        } catch (err) {
            console.error(err)
            alert('Problem happened: ' + err.message || err)
        }
    }

    return (
        <Page title="Add Burner Wallet to Metamask">
        <div>
            <h2>Connect to Metamask and Install Plugin</h2>
            <button className="btn-primary btn-metamask" onClick={installPlugin} >Connect To Metamask</button> <br/>
            <h2>Actions</h2>
            <button className="btn-primary" onClick={addAccountToMetamask} >Add Wallet To Metamask</button> <br/>
            {/* <button className="btn-primary" onClick={removeAccountfromMetamask} >Remove Wallet To Metamask</button> <br/> */}
        </div>
        </Page>
    )
}
