import React from 'react';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import Color from 'color';
import { BurnerContext, withBurner, DataProviders } from '@burner-wallet/ui-core';

import Button from '../../components/Button';
import Page from '../../components/Page';
import { SCAN_QR_DATAURI } from '../../constants';
import BalanceRow from './BalanceRow';
import HistoryListEvent from './HistoryListEvent';

const styles = (theme: any) => ({
  balances: {
    padding: 0,
  },
  buttons: {
    display: 'flex',
    padding: 0,
    flexWrap: 'wrap',
  },
  buttonContainer: {
    display: 'block',
    width: '50%',
    padding: 4,
    boxSizing: 'border-box',
    flex: '0 0 50%',
  },
  homeButton: {
    backgroundColor: theme.homeButtonColor,
  },
  scanBtn: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    height: 60,
    width: 60,
    borderRadius: 100,
    backgroundImage: `url("${SCAN_QR_DATAURI}")`,
    backgroundSize: '60%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundColor: Color(theme.accentColor).lighten(0.2).hsl().string(),
  },
  advancedLink: {
    color: Color(theme.paperBackground).isLight() ? '#333333' : '#cccccc',
  },
});

interface HomeButtonProps {
  path: string;
  title: string;
  classes: any;
}

const HomeButton: React.FC<HomeButtonProps> = ({ path, title, classes }) => (
  <li className={classes.buttonContainer}>
    <Button to={path} className={classes.homeButton}>{title}</Button>
  </li>
)

const { PluginElements } = DataProviders;

const HomePage: React.FC<BurnerContext & { classes: any }> = ({ defaultAccount, actions, assets, pluginData, classes }) => (
  <Page>
    <button className={classes.scanBtn} onClick={actions.openDefaultQRScanner} />

    <PluginElements position="home-top" />

    <ul className={classes.balances}>
      {assets.map(asset =>
        <DataProviders.AccountBalance
          key={asset.id}
          asset={asset.id}
          account={defaultAccount}
          render={(data: any/*AccountBalanceData | null*/) => (
            <BalanceRow
              asset={asset}
              usdBalance={data && data.usdBalance}
              balance={data && data.displayBalance}
            />
          )}
        />
      )}
    </ul>

    <PluginElements position="home-middle" />

    <ul className={classes.buttons}>
      <HomeButton path="/receive" title="Receive" classes={classes} />
      <HomeButton path="/send" title="Send" classes={classes} />
      {pluginData.homeButtons.map(({ title, path }) => (
        <HomeButton title={title} path={path} key={title} classes={classes} />
      ))}
    </ul>

    <DataProviders.History
      account={defaultAccount}
      render={(events: any[]) => events.map(event => (
        <HistoryListEvent
          key={JSON.stringify(event)}
          event={event}
          account={defaultAccount}
          navigateTo={actions.navigateTo}
        />
      ))}
    />

    <PluginElements position="home-bottom" />

    <Link to="/advanced" className={classes.advancedLink}>Advanced</Link>
  </Page>
);

export default injectSheet(styles)(withBurner(HomePage));
