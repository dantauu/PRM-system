import { chainRoute, RouteInstance, RouteParamsAndQuery, redirect } from 'atomic-router';
import { routes } from "@/shared/router";
import { createEvent, createStore, sample } from "effector";
import { flattenDiagnosticMessageText } from 'typescript';

const $isAdmin = createStore(false)

const setIsAdmin = createEvent<boolean>()
$isAdmin.on(setIsAdmin, (_state, value) => value)

function chainAdmin<Params>(route: RouteInstance<Params>) {

    const checkAdminAccess = createEvent<RouteParamsAndQuery<Params>>();

    const userIsAdmin = sample({
        clock: checkAdminAccess,
        filter: $isAdmin,
    });

    const userIsNotAdmin = sample({
        clock: checkAdminAccess,
        filter: $isAdmin.map(($isAdmin) => !$isAdmin)
    });

    redirect({
        clock: userIsNotAdmin,
        route: routes.account.main
    })

    return chainRoute({
        route,
        beforeOpen: checkAdminAccess,
        openOn: [userIsAdmin],
        cancelOn: [userIsNotAdmin]
    });

}

export { $isAdmin, setIsAdmin, chainAdmin }