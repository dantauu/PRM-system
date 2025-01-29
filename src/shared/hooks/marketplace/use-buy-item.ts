import { ethers } from 'ethers';
// import usdtAbi from './usdtAbi.json'; // ABI для контракта USDT
// import purchaseAbi from './purchaseAbi.json'; // ABI для вашего смарт-контракта

const useBuyItem = async (amount: string) => {

const USDT_ADDRESS = '0x...'; // Адрес контракта USDT
const PURCHASE_CONTRACT_ADDRESS = '0x...'; // Адрес вашего смарт-контракта

const usdtAbi: string[] = []
const purchaseAbi: string[] = []

  if (!window.ethereum) {
    console.error('MetaMask is not installed');
    return;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner();
    const usdtContract = new ethers.Contract(USDT_ADDRESS, usdtAbi, signer);
    const purchaseContract = new ethers.Contract(PURCHASE_CONTRACT_ADDRESS, purchaseAbi, signer);

    // Запрос разрешения на использование USDT
    const allowanceTx = await usdtContract.approve(PURCHASE_CONTRACT_ADDRESS, ethers.parseUnits(amount, 18));
    await allowanceTx.wait();
    console.log('USDT allowance granted');

    // Покупка через смарт-контракт
    const purchaseTx = await purchaseContract.buyItem(ethers.parseUnits(amount, 18));
    await purchaseTx.wait();
    console.log('Purchase successful');
  } catch (error) {
    console.error('Transaction failed:', error);
  }
};

export default useBuyItem;
