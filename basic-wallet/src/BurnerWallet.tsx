import React from 'react';
import { xdai, dai, eth } from '@burner-wallet/assets';
import BurnerCore from '@burner-wallet/core';
import { InjectedSigner, LocalSigner } from '@burner-wallet/core/signers';
import { InfuraGateway, InjectedGateway, XDaiGateway, } from '@burner-wallet/core/gateways';
import Exchange, { Uniswap, XDaiBridge } from '@burner-wallet/exchange';
import ModernUI from '@burner-wallet/modern-ui';
import ENSPlugin from '@burner-wallet/ens-plugin';
import MetamaskPlugin from '@burner-wallet/metamask-plugin';
import { BurnerConnectPlugin } from '@burner-wallet/burner-connect-wallet';
import { BurnerPluginContext, Plugin } from '@burner-wallet/types';
import { AddToMetamask } from "./AddToMetamask";

export default class AddtoMetamaskPlugin implements Plugin {
    private pluginContext?: BurnerPluginContext;
  
    initializePlugin(pluginContext: BurnerPluginContext) {
      this.pluginContext = pluginContext;
      pluginContext.addButton('apps', 'Add to Metamask' ,'/addtoMetamask');
      pluginContext.addPage('/addtoMetamask', AddToMetamask)
    }
  }

const core = new BurnerCore({
    signers: [
        new LocalSigner(),
        new InjectedSigner(),
    ],
    gateways: [
        new InjectedGateway(),
        new InfuraGateway('67531e96ca3842cdabf3147f5d2a3742'),
        new XDaiGateway(),
    ],
    assets: [xdai, dai, eth],
});

const exchange = new Exchange([new XDaiBridge(), new Uniswap('dai')]);

export const BurnerWallet = () =>
    <div>
        <ModernUI
            core={core}
            plugins={[
                exchange,
                new ENSPlugin(),
                new MetamaskPlugin(),
                new BurnerConnectPlugin('Basic Wallet'),
                new AddtoMetamaskPlugin()
            ]}
        />
    </div> 
