import { xdai, dai, eth } from '@burner-wallet/assets';
import BurnerCore from '@burner-wallet/core';
import { LocalSigner } from '@burner-wallet/core/signers';
import { InfuraGateway, XDaiGateway, } from '@burner-wallet/core/gateways';
import { BurnerConnectBridge } from '@burner-wallet/burner-connect-wallet';

const core = new BurnerCore({
  signers: [new LocalSigner()],
  gateways: [
    new InfuraGateway('67531e96ca3842cdabf3147f5d2a3742'),
    new XDaiGateway(),
  ],
  assets: [xdai, dai, eth],
});

export default new BurnerConnectBridge(core);
