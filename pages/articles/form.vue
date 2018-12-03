<template>
	<el-card>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="标签">
                <el-input v-model="form.tag"></el-input>
            </el-form-item>
            <el-form-item label="图片">
                <el-input v-model="form.image"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <el-input v-model="form.html"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <el-input v-model="form.con"></el-input>
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
			form: {
                title: '',
                image: '',
                tag: '',
                html: '',
                con: '',
            },
		};
    },
    computed: {},
    watch: {},
    methods: {
        save() {
            this.loading = true;
            if (this.form.id) {
                this.$axios.$put('articles/'+this.form.id, this.form).then((res) => {
                    if (res.Message == 'Success') {
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
            this.$axios.$post('articles', this.form).then((res) => {
                if (res.Message == 'Success') {
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
    beforeDestroy() {
    },
};
</script>

