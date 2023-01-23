import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
import getConfig from './config'
import { parseNearAmount } from "near-api-js/lib/utils/format";
const nearConfig = getConfig("testnet");

const GAS = 100000000000000; // gas fee

export async function initContract() {
  const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))

  window.walletConnection = new WalletConnection(near)

  window.accountId = window.walletConnection.getAccountId()

  // Initializing our contract APIs by contract name and configuration
  window.contract = await new Contract(window.walletConnection.account(), nearConfig.contractName, {
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ['fetch_quotes', 'total_quotes'],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ['create_quote', 'tip_author', 'delete_quote'],
  })
}

export function logout() {
  window.walletConnection.signOut()
  window.location.replace(window.location.origin + window.location.pathname)
}

export function login() {
  window.walletConnection.requestSignIn(nearConfig.contractName)
}

export async function fetch_quotes(from_index, limit){
  let quotes = await window.contract.fetch_quotes({
    args:{from_index, limit}
  })
  return quotes
}

export async function total_quotes(){
  let quote_count = await window.contract.total_quotes()
  return quote_count
}


export async function create_quote(payload){
  let create_quote = await window.contract.create_quote(payload, GAS)
  return create_quote
}

export async function tip_author(id){
  let tip = await window.contract.tip_author(id, GAS, parseNearAmount(1 + "") )
  return tip
}

export async function delete_quote(id){
  let delete_quote = await window.contract.delete_quote(id, GAS)
  return delete_quote
}