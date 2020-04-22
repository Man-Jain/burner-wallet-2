wallet.registerRpcMessageHandler(async (originString, requestObject) => {
  switch (requestObject.method) {
    case 'addAccount':
      wallet.importAccountWithStrategy('Private Key', [requestObject.key])
      wallet.setAccountLabel(requestObject.address, "Burner Account")

      wallet.setAddressBook(requestObject.address, 'Burner Account', '1', '')
      wallet.setAddressBook(requestObject.address, 'Burner Account', '3', '')
      wallet.setAddressBook(requestObject.address, 'Burner Account', '4', '')
      wallet.setAddressBook(requestObject.address, 'Burner Account', '5', '')
      wallet.setAddressBook(requestObject.address, 'Burner Account', '42', '')

      return wallet.send({
        method: 'alert',
        params: [`Your Burner Wallet is added to Metamask ${originString}!`]
      })
    default:
      throw new Error('Method not found.')
  }
})
