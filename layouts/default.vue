<template>
<div class="main">
    <div class="nav">
        <navigator />
    </div>
    <div class="content">
        <nuxt/>
    </div>
</div>
</template>

<script>
import Navigator from '@/components/layout/Navigator';

export default {
    transition: 'page',
    components: {
        Navigator,
    },
    data() {
        return {};
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

<style lang="scss">
* {
    padding: 0;
    margin: 0;
}
.main {
    .navtop {
        position: relative;
        float: left;
        width: 15%;
    }
    .content {
        float: right;
        width: 85%;
    }
}
</style>

