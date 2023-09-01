<template>
    <div class="navtop">
        <el-menu
            router
            default-active="/articles"
            class="el-menu-vertical-demo">
            <el-menu-item index="/articles">
                <i class="el-icon-document"></i>
                <span slot="title">articles</span>
            </el-menu-item>
            <el-menu-item index="/pixiv">
                <i class="el-icon-picture"></i>
                <span slot="title">pixiv</span>
            </el-menu-item>
            <el-menu-item index="/friend">
                <i class="el-icon-phone"></i>
                <span slot="title">harems</span>
            </el-menu-item>
            <el-menu-item index="/comment">
                <i class="el-icon-phone"></i>
                <span slot="title">comments</span>
            </el-menu-item>
            <el-submenu index="/setting">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>设置</span>
                </template>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
import {Menu, MenuItem, Submenu, MenuItemGroup} from 'element-ui';

export default {
    components: {
        [Menu.name]: Menu,
        [MenuItem.name]: MenuItem,
        [Submenu.name]: Submenu,
        [MenuItemGroup.name]: MenuItemGroup,
    },
    data() {
        return {
		};
    },
    computed: {},
    watch: {},
    methods: {},
    mounted() {
    },
    beforeDestroy() {
    },
};
</script>

<style scoped>
.navtop {
    position: fixed;
    width: 100%;
    z-index: 9999;
}
.navbar {
    font-family: 'Source Han Serif SC','Source Han Serif','source-han-serif-sc','PT Serif','SongTi SC','MicroSoft Yahei',Georgia,serif;
    display: flex;
    justify-content: center;
}
</style>
<style lang="scss">
.el-menu--popup {
    min-width: 80px;
    border-radius: 8px;
    overflow: hidden;
    .el-menu-item {
        text-align: center;
    }
}
</style>

