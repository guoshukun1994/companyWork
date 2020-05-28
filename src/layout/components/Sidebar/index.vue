<template>
    <div :class="{ 'has-logo': showLogo }">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <logo />
            <div
                style="height:50px;color:rgba(105, 105, 100);text-align:center;font-size:24px;line-height:50px"
            >
                -{{
                    userType == 0
                        ? '一般操作员'
                        : userType == 1
                        ? '企业管理员'
                        : userType == 2
                        ? '超级管理员'
                        : '注册用户'
                }}-
            </div>

            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :background-color="variables.menuBg"
                :text-color="variables.menuText"
                :unique-opened="false"
                :active-text-color="variables.menuActiveText"
                :collapse-transition="false"
                mode="vertical"
            >
                <sidebar-item
                    v-for="route in routes"
                    :key="route.index"
                    :item="route"
                    :base-path="route.path"
                />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Logo from './Logo';
import SidebarItem from './SidebarItem';
import variables from '@/styles/variables.scss';

export default {
    components: { SidebarItem, Logo },
    data() {
        return {
            userType: ''
        };
    },
    created() {
        this.userType = localStorage.getItem('user_Type');
    },
    computed: {
        ...mapGetters(['sidebar']),
        routes() {
            return this.$router.options.routes;
        },
        activeMenu() {
            const route = this.$route;
            const { meta, path } = route;
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        },
        showLogo() {
            return this.$store.state.settings.sidebarLogo;
        },
        variables() {
            return variables;
        },
        isCollapse() {
            return !this.sidebar.opened;
        }
    }
};
</script>
