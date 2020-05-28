import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/* Layout */
import Layout from '@/layout';

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/login/Register')
    },
    {
        path: '/reset',
        name: 'reset',
        component: () => import('@/views/reset/Reset.vue')
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('@/views/test.vue')
    }
];
export const asyncRoutes = [
    {
        path: '/',
        component: Layout,
        hidden: true,
        redirect: '/visualisation/businessinfo',
        meta: { roles: ['2', '1', '0'] }
    },
    {
        path: '/dashboard',
        component: Layout,
        redirect: '/dashboard/infomanagement',
        // name: 'Code',
        // meta: { title: '密码修改', icon: 'dashboard' },
        hidden: true,
        children: [
            {
                path: 'infomanagement',
                name: 'Dashboard',
                component: () => import('@/views/dashboard/index'),
                meta: { title: '个人中心', icon: 'user' }
            }
        ]
    },
    {
        path: '/tags',
        component: Layout,
        name: 'Tags',
        meta: { title: '标签管理', icon: 'tag', roles: ['2', '1', '0'] },
        children: [
            {
                path: 'tagsdir',
                name: 'tagsDir',
                component: () => import('@/views/tags/tagsDir'),
                meta: {
                    title: '标签直接生成',
                    icon: 'add',
                    roles: ['2', '1', '0']
                }
            },
            {
                path: 'tagsbind',
                name: 'TagsBind',
                component: () => import('@/views/tags/TagsBind'),
                meta: {
                    title: '商品标签绑定',
                    icon: 'bind',
                    roles: ['2', '1', '0']
                }
            },
            {
                path: 'tagspro',
                name: 'TagsPro',
                component: () => import('@/views/tags/index'),
                meta: {
                    title: '商品标签生成',
                    icon: 'add',
                    roles: ['2', '1', '0']
                }
            },
            {
                path: 'codemanagement',
                name: 'CodeManagement',
                component: () => import('@/views/code/index'),
                meta: {
                    title: '历史标签查询',
                    icon: 'search',
                    roles: ['2', '1', '0']
                }
            }
        ]
    },
    {
        path: '/goods',
        component: Layout,
        name: 'Goods',
        alwaysShow: true,
        meta: { title: '商品管理', icon: 'goods', roles: ['2', '1', '0'] },
        children: [
            {
                path: 'goodsmanagement',
                name: 'GoodsManagement',
                component: () => import('@/views/goods/index'),
                meta: {
                    title: '商品信息维护',
                    icon: 'setting',
                    roles: ['2', '1', '0']
                }
            }
        ]
    },
    {
        path: '/business',
        component: Layout,
        name: 'Business',
        alwaysShow: true,
        meta: { title: '企业管理', icon: 'company', roles: ['2', '1', '0'] },
        children: [
            {
                path: 'businessinfomanagement',
                name: 'BusinessinfoManagement',
                component: () => import('@/views/business/BusinessInfo'),
                meta: {
                    title: '企业信息维护',
                    icon: 'setting',
                    roles: ['2', '1', '0']
                }
            },
            {
                path: 'examine',
                name: 'Examine',
                component: () => import('@/views/examine/index'),
                meta: { title: '企业注册审核', icon: 'ver', roles: ['2'] }
            }
        ]
    },
    // {
    //   path: '/codemanagement',
    //   component: Layout,
    //   name: 'Code',
    //   meta: { title: '条码维护', icon: 'example' },
    //   children: [
    //     {
    //       path: 'codeenv',
    //       name: 'CodeEnv',
    //       component: () => import('@/views/code/CodeEnv'),
    //       meta: { title: '条码存证', icon: 'table' }
    //     },
    //     {
    //       path: 'codemanagement',
    //       name: 'CodeManagement',
    //       component: () => import('@/views/code/index'),
    //       meta: { title: '条码查询', icon: 'table' }
    //     }

    //   ]
    // },

    // {
    //   path: '/form',
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'index',
    //       name: 'Form',
    //       component: () => import('@/views/form/index'),
    //       meta: { title: 'Form', icon: 'form' }
    //     }
    //   ]
    // },
    // {
    //   path: '/examine',
    //   component: Layout,
    //   name: 'Examine',
    //   meta: { title: '企业审核', icon: 'example' },
    //   children: [
    //     {
    //       path: 'examine',
    //       name: 'Examine',
    //       component: () => import('@/views/examine/index'),
    //       meta: { title: '企业审核', icon: 'table' }
    //     }
    //   ]
    // },
    {
        path: '/usermanagement',
        component: Layout,
        name: 'UserInfo',
        alwaysShow: true,
        meta: { title: '用户管理', icon: 'user', roles: ['2', '1', '0'] },
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import('@/views/dashboard/index'),
                meta: {
                    title: '个人信息中心',
                    icon: 'userInfo',
                    roles: ['2', '1', '0']
                }
            },
            {
                path: 'userinfomanagement',
                name: 'UserManagement',
                component: () => import('@/views/userInfo/index'),
                meta: {
                    title: '用户信息维护',
                    icon: 'setting',
                    roles: ['2', '1', '0']
                }
            }
        ]
    },
    {
        path: '/visualisation',
        component: Layout,
        name: 'Visualisation',
        alwaysShow: true,
        meta: { title: '溯源管理', icon: 'trace', roles: ['2', '1', '0'] },
        children: [
            {
                path: 'businessinfo',
                name: 'Businessinfo',
                component: () => import('@/views/visualisation/index'),
                meta: {
                    title: '溯源监控管理',
                    icon: 'see',
                    roles: ['2', '1', '0']
                }
            }
        ]
    },
    // {
    //     path: '/box',
    //     component: Layout,
    //     name: 'box',
    //     alwaysShow: true,
    //     meta: { title: '装箱管理', icon: 'trace', roles: ['2', '1', '0'] },
    //     children: [
    //         {
    //             path: 'box',
    //             name: 'box',
    //             component: () => import('@/views/boxing/Box'),
    //             meta: {
    //                 title: '商品装箱管理',
    //                 icon: 'see',
    //                 roles: ['2', '1', '0']
    //             }
    //         }
    //     ]
    // },
    // {
    //     path: '/companyregister',
    //     component: Layout,
    //     name: 'companyregister',
    //     alwaysShow: true,
    //     // meta: { title: '装箱管理', icon: 'trace', roles: ['2', '1', '0'] },
    //     meta: { title: '企业注册', icon: 'trace', roles: ['3'] },

    //     children: [
    //         {
    //             path: 'addcompanyinfo',
    //             name: 'addcompanyinfo',
    //             component: () => import('@/views/companyRegister/index.vue'),
    //             roles: ['3'],
    //             meta: {
    //                 title: '企业注册',
    //                 icon: 'see',
    //                 roles: ['3']
    //             }
    //         }
    //     ]
    // },
    // {
    //     path: '/companyregister',
    //     component: Layout,
    //     name: 'companyregister',
    //     alwaysShow: true,
    //     // meta: { title: '装箱管理', icon: 'trace', roles: ['2', '1', '0'] },
    //     meta: { title: '企业注册', icon: 'trace' },

    //     children: [
    //         {
    //             path: 'companyregister',
    //             name: 'companyregister',
    //             component: () => import('@/views/companyRegister/index.vue'),
    //             roles: ['3', '2', '1', '0'],

    //             meta: {
    //                 title: '企业注册',
    //                 icon: 'see',
    //                 roles: ['3', '2', '1', '0']
    //             }
    //         }
    //     ]
    // },
    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },

    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }

    // 404 page must be placed at the end !!!
];

export const otherRoutes = [
    {
        path: '/',
        component: Layout,
        hidden: true,
        redirect: '/companyregister/addcompanyinfo',
        meta: { roles: ['3'] }
    },
    {
        path: '/companyregister',
        component: Layout,
        name: 'companyregister',
        alwaysShow: true,
        // meta: { title: '装箱管理', icon: 'trace', roles: ['2', '1', '0'] },
        meta: { title: '企业注册', icon: 'trace', roles: ['3'] },

        children: [
            {
                path: 'addcompanyinfo',
                name: 'addcompanyinfo',
                component: () => import('@/views/companyRegister/index.vue'),
                roles: ['3'],
                meta: {
                    title: '企业注册',
                    icon: 'see',
                    roles: ['3']
                }
            }
        ]
    }
];

const createRouter = () =>
    new Router({
        // mode: 'history', // require service support
        scrollBehavior: () => ({ y: 0 }),
        routes: constantRoutes
    });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;
