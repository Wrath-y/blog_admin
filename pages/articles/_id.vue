<template>
	<el-card>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
        </el-form>
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
    },
    mounted() {
    },
    beforeDestroy() {
    },
};
</script>

