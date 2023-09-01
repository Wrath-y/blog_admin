<template>
    <el-card>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="title">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="keywords">
                <el-input v-model="form.keywords"></el-input>
            </el-form-item>
            <el-form-item label="description">
                <el-input v-model="form.description"></el-input>
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
            await this.$axios.get('seo/' + this.$route.params.id).then((res) => {
                if (res) {
                    this.form = res.data;
                }
            }).finally(() => {
                this.loading = false;
            });
        },
        save() {
            this.loading = true;
            this.form.article_id = Number(this.$route.params.id);
            if (!this.form.create_time) {
                this.form.create_time = this.getCurrentISO8601Time()
            }
            this.$axios.post('seo/' + this.$route.params.id, this.form).then((res) => {
                if (res.code == 200) {
                    this.$message.success('保存成功');
                }
            }).finally(() => {
                this.loading = false;
            });
        },
        getCurrentISO8601Time() {
            const now = new Date();
            const offsetHours = 8; // +8 小时的时区偏移
            const offsetMilliseconds = offsetHours * 60 * 60 * 1000;
            const adjustedTime = new Date(now.getTime() + offsetMilliseconds);
            const isoString = adjustedTime.toISOString();

            return isoString;
        }
    },
    created() {
        this.fetchData();
    },
};
</script>
