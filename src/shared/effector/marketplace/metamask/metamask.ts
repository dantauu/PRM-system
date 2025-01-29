import { $$alerts } from '@/shared/effector';
import { $$session } from '@/shared/effector';
import { createEvent, createStore, sample } from "effector";

const $currentAccount = createStore<string | null>(null)

const currentAccountChanged = createEvent<string>()
$currentAccount.on(currentAccountChanged, (_, value) => value)

// sample({
//     clock: $$session.authed,
//     filter: () => !!window.ethereum === false,
//     fn: () => 'MetaMask is not installed',
//     target: $$alerts.showDanger
// })

// sample({
//     clock: $$session.authed,
//     filter: () => !!window.ethereum === true,
//     fn: () => `Метамакс: подключен адрес ${$currentAccount}`,
//     target: $$alerts.showSuccess
// })

export const $$metamask = {
    $currentAccount,
    currentAccountChanged
}