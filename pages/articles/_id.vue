<template>
	<el-card>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
        </el-form>
        <div style="text-align: center">
            <el-button size="mini" @click="save">保存</el-button>
        </div>
    </el-card>
</template>

<script>
import {Form, FormItem, Input} from 'element-ui';

export default {
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
            await this.$axios.$get('articles/'+this.$route.params.id).then((res) => {
                if (res) {
                    this.form = res.Data;
                }
            }).finally(() => {
                this.loading = false;
            });
        },
        save() {
            this.loading = true;
            this.$axios.$put('articles/'+this.$route.params.id, this.form).then((res) => {
                if (res.Message == 'Success') {
                    this.$message.success('保存成功');
                } else {
                    this.$message.error('保存失败');
                }
            }).finally(() => {
                this.loading = false;
            });
        },
    },
    created() {
        this.fetchData();
    },
    beforeDestroy() {
    },
};
</script>

