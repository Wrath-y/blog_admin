<template>
	<el-card>
        <form @submit.prevent="fetchList()">
            <div style="display:inline-block">
                <router-link to="form" append>
                    <el-button size="mini">添加</el-button>
                </router-link>
            </div>
        </form>
        <el-table :data="list" v-loading="loading" size="mini">
            <el-table-column label="图片">
                <template slot-scope="{row}">
                    <img :src="`https://gilgamesh.oss-cn-hongkong.aliyuncs.com/${row.Key}`" width="100" />
                </template>
            </el-table-column>
            <el-table-column prop="updated_at" label="更新时间"/>
            <el-table-column>
                <template slot-scope="{row}">
                    <el-button type="danger" size="mini" @click="deleteHandler(row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align: center">
            <el-pagination layout="prev, next"
                           @current-change="fetchList"
                           :page-size="pagination.page_size">
            </el-pagination>
        </div>
    </el-card>
</template>

<script>
import {Table, TableColumn, Pagination, Form} from 'element-ui';

export default {
    middleware: 'check-auth',
    components: {
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
        [Pagination.name]: Pagination,
        [Form.name]: Form,
    },
    data() {
        return {
            loading: false,
            pagination: {
                page_size: 15,
                next_marker: "",
            },
            form: {
                page: 1,
            },
			list: [],
		};
    },
    computed: {},
    watch: {},
    methods: {
        async fetchList() {
            this.loading = true;
            await this.$axios.get('admin/pixivs?' + this.toQuery(this.pagination)).then((res) => {
                if (res) {
                    this.list = res.Data.Objects.map((i) => {
                        i.Key = this.encodeUrl(i.Key);
                        return i;
                    });
                    this.pagination.next_marker = res.Data.NextMarker
                }
            }).finally(() => {
                this.loading = false;
            });
        },
        async deleteHandler(id) {
            this.loading = true;
            await this.$axios.delete('admin/articles/'+id).finally(() => {
                this.loading = false;
                this.fetchList();
            });
        },
        encodeUrl(str) {
            str = encodeURI(str);
            str = str.replace(/\+/g, '%2B');
            return str;
        },
        toQuery(json) {
            return Object.keys(json).map(function (key) {
                return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
            }).join("&");
        }
    },
    created() {
        this.fetchList();
    },
    beforeDestroy() {
    },
};
</script>

