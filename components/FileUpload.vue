<template>
    <div @click="click" class="file-upload">
        <slot></slot>
        <input type="file" ref="file" @change="onChange"
               :accept="input.accept"
               :disabled="input.disabled"
               :multiple="input.multiple">
        <div class="progress" v-if="upload_progress!==null">
            <div>{{ upload_progress }}%</div>
        </div>
    </div>
</template>

<script>
import FileUpload from '@/api/FileUpload';

export default {
    props: ['value', 'crop', 'max', 'disabled', 'multiple', 'accept'],
    name: 'file-upload',
    data() {
        return {
            input: {
                accept: '',
                disabled: false,
                multiple: false,
            },
            upload_progress: null,
            options: {
                maxWidth: 2000,
                maxHeight: 2000,
                crop: !!this.crop,
            },
            upload_res: null,
        };
    },
    computed: {},
    watch: {
        accept: {
            handler(val) {
                this.input.accept = val || '.jpg,.png,.jpeg';
            },
            immediate: true,
        },
        disabled: {
            handler(val) {
                this.input.disabled = val || false;
            },
            immediate: true,
        },
        multiple: {
            handler(val) {
                this.input.multiple = val || false;
            },
            immediate: true,
        },
    },
    created() {
        if (this.max) {
            this.options.maxWidth = this.max.width || this.options.maxWidth;
            this.options.maxHeight = this.max.height || this.options.maxHeight;
        }
    },
    methods: {
        click() {
            if (this.upload_progress || this.disabled) return;
            this.$refs.file.click();
            if (!this.upload_res) {
                this.$axios.get('uploads').then((res) => {
                    this.upload_res = res.Data;
                })
            }
        },
        async onChange(event) {
            this.input.disabled = true;
            const filesUrl = await (new FileUpload())
                .uploadParameter(this.upload_res)
                .uploadStart(event.target.files);
            for (const fileUrl of filesUrl) {
                this.$emit('input', fileUrl);
            }
            event.target.value = '';
            this.input.disabled = false;
            this.upload_progress = null;
        },
    },
};
</script>

<style lang="scss" scoped>
    .file-upload {
        display: inline-block;
        cursor: pointer;
        position: relative;

        > input {
            opacity: 0;
            position: absolute;
            left: 0;
            top: 0;
            width: 0;
            height: 0;
            padding: 0;
            margin: 0;
            z-index: -1;
            display: none;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
        }

        > .progress {
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(255, 255, 255, .8);
            color: #000;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
        }
    }
</style>
