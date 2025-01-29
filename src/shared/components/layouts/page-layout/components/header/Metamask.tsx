import './style.scss'
import { MetamaskHeaderIcon } from '@/shared/assets'
import { $$alerts } from '@/shared/effector'
import { $$metamask } from '@/shared/effector/marketplace/metamask/metamask'
import { MetaMaskInpageProvider } from '@metamask/providers'
import { useUnit } from 'effector-react'
import React, { useCallback, useEffect } from 'react'

const Metamask = () => {
  const [showSuccess, showAllert] = useUnit([$$alerts.showSuccess, $$alerts.showDanger])
  const { ethereum } = window as unknown as { ethereum: MetaMaskInpageProvider }

  const [currentAddress, setCurrentAddress] = useUnit([
    $$metamask.$currentAccount,
    $$metamask.currentAccountChanged,
  ])

  // console.log("currentAddress", currentAddress)

  // const updateAccount = useCallback(async () => {
  //   if (window.ethereum) {
  //     try {
  //       const accounts = await window.ethereum.request({ method: 'eth_accounts' });
  //       if (accounts.length > 0) {
  //         setCurrentAddress(accounts[0]);
  //       } else {
  //         setCurrentAddress(null);
  //       }
  //     } catch (error) {
  //       console.error('Failed to get accounts', error?.message);
  //     }
  //   } else {
  //     console.log('MetaMask is not installed');
  //     showAllert('MetaMask is not installed')
  //   }
  // }, []);

  const handleAccountsChanged = useCallback((accounts: string[]) => {
    if (accounts.length > 0) {
      setCurrentAddress(accounts[0])
      // showSuccess(`MetaMask: подключен адрес ${accounts[0]}`)
    } else {
      setCurrentAddress(null)
    }
  }, [])

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged)
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
      }
    }
  }, [handleAccountsChanged])

  const handleMetamaskClick = async () => {
    if (!window.ethereum) {
      showAllert('MetaMask is not installed')
      return
    }

    try {
      const accounts: string[] = await ethereum.request({ method: 'eth_requestAccounts' })
      setCurrentAddress(accounts[0])
      showSuccess(`MetaMask: подключен адрес ${accounts[0]}`)
    } catch (error) {
      console.error(error)
      showAllert('Metamask: ' + error?.message)
    }
  }

  return (
    <div
      onClick={handleMetamaskClick}
      className={`header__icon header-icon header-icon--metamask ${
        currentAddress ? 'header-icon--connected' : ''
      }`}
    >
      <img src={MetamaskHeaderIcon} />
    </div>
  )
}

export default Metamask
