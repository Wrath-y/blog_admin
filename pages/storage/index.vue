<template>
	<el-upload
    class="upload-demo"
    drag
    name="files"
    action="https://wrath.cc/go/upload"
    multiple
    :on-success="onSuccess"
    list-type="picture">
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
</template>

<script>
import {Upload} from 'element-ui';

export default {
    middleware: 'check-auth',
    components: {
        [Upload.name]: Upload,
    },
    data() {
        return {
		};
    },
    computed: {},
    watch: {},
    methods: {
        onSuccess(res,file,fileList) {
            if (res.code != 0) {
                this.$message({
                    showClose: true,
                    message: res.message,
                    type: 'error'
                });
                file.status = 'fail'
            }
        }
    },
};
</script>

