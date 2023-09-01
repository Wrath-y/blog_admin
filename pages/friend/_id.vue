<template>
    <el-card>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="昵称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="email">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="url">
                <el-input v-model="form.url"></el-input>
            </el-form-item>
        </el-form>
        <div style="text-align: center">
            <el-button size="mini" @click="save">保存</el-button>
        </div>
    </el-card>
</template>

<script>
import { Form, FormItem, Input } from 'element-ui';

export default {
    middleware: 'check-auth',
    components: {
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [Input.name]: Input,
    },
    data() {
        return {
            loading: false,
            form: {},
        };
    },
    computed: {},
    watch: {},
    methods: {
        async fetchData() {
            this.loading = true;
            await this.$axios.get('friend_links/' + this.$route.params.id).then((res) => {
                if (res) {
                    this.form = res.data;
                }
            }).finally(() => {
                this.loading = false;
            });
        },
        save() {
            this.loading = true;
            this.$axios.put('friend_links/' + this.$route.params.id, this.form).then((res) => {
                if (res.code == 200) {
                    this.$message.success('保存成功');
                }
            }).finally(() => {
                this.loading = false;
            });
        },
    },
    created() {
        this.fetchData();
    },
};
</script>
