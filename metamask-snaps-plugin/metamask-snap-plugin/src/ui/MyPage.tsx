import React from 'react';
import { PluginPageContext } from '@burner-wallet/types';
import { default as Web3 } from 'web3'

const btnprimary = {
  'justify-content': 'center',
  'border': 'none',
  'outline': 'none',
  'color': '#eeeeee',
  'background': '#4E3FCE',
  'text-decoration': 'none',
  'padding': '8px 16px',
  'text-align': 'center',
  'font-size': '16px',
  'min-height': '48px',
  'line-height': '1.5',
  'border-radius': '4px',
  'margin': '0 var(--page-margin)',
  'display': 'flex',
  'align-items': 'center',
}

const MyPage: React.FC<PluginPageContext> = ({ burnerComponents, defaultAccount, actions }) => {
  const { Page } = burnerComponents;

  const snapId = 'http://localhost:8081/package.json'

    const getAccount = async () => {
        let account = null;
        try {
            if (
                typeof (window as any).ethereum !== "undefined" ||
                typeof (window as any).web3 !== "undefined"
            ) {
                account = await (window as any).ethereum.enable();
                (window as any).web3 = new Web3((window as any).ethereum);
                (window as any).readOnly = false;
            } else {
                (window as any).web3 = new Web3(
                    new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws")
                );
                (window as any).readOnly = true;
            }
        } catch (error) {
            console.log(error);
        }
        return account;
    };

    const installPlugin = async () => {
      await getAccount()
      await (window as any).ethereum.send({
          method: 'wallet_enable',
          params: [{
              wallet_plugin: { [snapId]: {} },
          }]
      })
  }

  const addAccountToMetamask = async () => {
      try {
          const response = await (window as any).ethereum.send({
              method: 'wallet_invokePlugin',
              params: [snapId, {
                  method: 'addAccount',
                  key: actions.callSigner('readKey', defaultAccount),
                  address: defaultAccount
              },]
          })
      } catch (err) {
          console.error(err)
          alert('Problem happened: ' + err.message || err)
      }
  }

  const removeAccountfromMetamask = async () => {
      try {
          const response = await (window as any).ethereum.send({
              method: 'wallet_invokePlugin',
              params: [snapId, {
                  method: 'removeAccount',
                  address: defaultAccount
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
            <button style={btnprimary} onClick={installPlugin} >Connect To Metamask</button> <br/>
            <h2>Actions</h2>
            <button style={btnprimary} onClick={addAccountToMetamask} >Add Wallet To Metamask</button> <br/>
            {/* <button className="btn-primary" onClick={removeAccountfromMetamask} >Remove Wallet To Metamask</button> <br/> */}
        </div>
        </Page>
  );
};

export default MyPage;
