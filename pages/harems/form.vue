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
            form: {
                name: '',
                email: '',
                url: '',
            },
        };
    },
    computed: {},
    watch: {},
    methods: {
        save() {
            this.loading = true;
            if (this.form.id) {
                this.$axios.put('friend_links/' + this.form.id, this.form).then((res) => {
                    if (res.code == 200) {
                        this.$message.success('保存成功');
                        this.form.id = res.Data.id;
                    } else {
                        this.$message.error('保存失败');
                    }
                }).finally(() => {
                    this.loading = false;
                });

                return
            }
            this.$axios.post('friend_links', this.form).then((res) => {
                if (res.message == 'success') {
                    this.$message.success('保存成功');
                    this.form.id = res.Data.id;
                } else {
                    this.$message.error('保存失败');
                }
            }).finally(() => {
                this.loading = false;
            });
        },
    },
};
</script>

