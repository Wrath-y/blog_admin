<template>
	<el-card>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="图片">
                <file-upload v-model="form.image">
                    <img :src="form.image" alt="" class="missing" height="150">
                </file-upload>
            </el-form-item>
        </el-form>
        <div style="text-align: center">
            <el-button size="mini" @click="save">保存</el-button>
        </div>
    </el-card>
</template>

<script>
import {Form, FormItem, Input, Upload} from 'element-ui';
import FileUpload from '@/components/FileUpload';

export default {
    components: {
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [Input.name]: Input,
        [Upload.name]: Upload,
        FileUpload,
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
        handleAvatarSuccess(res, file) {
            this.form.image = URL.createObjectURL(file.raw);
        },
    },
    created() {
        this.fetchData();
    },
    beforeDestroy() {
    },
};
</script>

<style scope>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    min-height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    min-height: 178px;
    display: block;
  }
  img.missing {
    min-height: 3em;
    min-width: 3em;
    position: relative;
}
</style>
