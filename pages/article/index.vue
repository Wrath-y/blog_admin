<template>
    <el-card>
        <form @submit.prevent="fetchList()">
            <div style="width: 240px;display:inline-block">
                <el-input placeholder="搜索" v-model="form.keyword" size="mini" />
            </div>
            <div style="display:inline-block">
                <el-button native-type="submit" size="mini">筛选</el-button>
            </div>
            <div style="display:inline-block">
                <router-link to="form" append>
                    <el-button size="mini">添加</el-button>
                </router-link>
            </div>
        </form>
        <el-table :data="list" v-loading="loading" size="mini">
            <el-table-column prop="id" label="ID" width="100" />
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="tags" label="分类" />
            <el-table-column label="是否显示">
                <template slot-scope="{row}">
                    <p v-if="row.status == 0">否</p>
                    <p v-if="row.status == 1">是</p>
                </template>
            </el-table-column>
            <el-table-column prop="source" label="来源">
                <template slot-scope="{row}">
                    <p v-if="row.source == 0">自己</p>
                    <p v-if="row.source == 1">外部</p>
                </template>
            </el-table-column>
            <el-table-column prop="update_time" label="更新时间" />
            <el-table-column>
                <template slot-scope="{row}">
                    <router-link :to="`${row.id}`" append>
                        <el-button size="mini">编辑</el-button>
                    </router-link>
                    <router-link :to="`/articles/seo/${row.id}`" append>
                        <el-button size="mini">编辑seo</el-button>
                    </router-link>
                    <el-button type="danger" size="mini" @click="deleteHandler(row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align: center">
            <el-pagination layout="total, prev, pager, next" @current-change="fetchList" :page-size="pagination.page_size"
                :total="pagination.total">
            </el-pagination>
        </div>
    </el-card>
</template>

<script>
import { Table, TableColumn, Pagination, Form } from 'element-ui';

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
                total: 0,
                page_size: 6,
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
        async fetchList(page = null) {
            this.loading = true;
            if (page) {
                this.form.page = page;
            }
            await this.$axios.get('articles?' + this.toQuery(this.form)).then((res) => {
                if (res) {
                    this.list = res.data.list;
                    this.pagination.total = res.data.count;
                }
            }).finally(() => {
                this.loading = false;
            });
        },
        async deleteHandler(id) {
            this.loading = true;
            await this.$axios.delete('articles/' + id).finally(() => {
                this.loading = false;
                this.fetchList();
            });
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
};
</script>

