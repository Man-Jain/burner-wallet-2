import { BurnerPluginContext, Plugin, Actions } from '@burner-wallet/types';
import MyPage from './ui/MyPage';

interface PluginActionContext {
  actions: Actions;
}

export default class AddToMetamask implements Plugin {
  private pluginContext?: BurnerPluginContext;

  initializePlugin(pluginContext: BurnerPluginContext) {
    this.pluginContext = pluginContext;

    pluginContext.addPage('/addtoMetamask', MyPage)
    pluginContext.addButton('apps', 'Add to Metamask' ,'/addtoMetamask');
  }
}
