import { asyncRoutes, constantRoutes, otherRoutes } from '@/router';

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some((role) => route.meta.roles.includes(role));
    } else {
        return true;
    }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
    const res = [];

    routes.forEach((route) => {
        const tmp = { ...route };
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles);
                // console.log(tmp.children);
            }
            res.push(tmp);
        }
    });

    return res;
}

const state = {
    routes: [],
    addRoutes: []
};

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes;
        state.routes = constantRoutes.concat(routes);
    }
};

const actions = {
    generateRoutes({ commit }, data) {
        return new Promise((resolve) => {
            let accessedRoutes;

            if (data == 2) {
                accessedRoutes = asyncRoutes || [];
            } else if (data == 3) {
                accessedRoutes = filterAsyncRoutes(otherRoutes, [data]);
            } else {
                accessedRoutes = filterAsyncRoutes(asyncRoutes, [data]);
            }
            commit('SET_ROUTES', accessedRoutes);
            resolve(accessedRoutes);
        });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};