<template>
	<el-card>
        <el-table :data="list" v-loading="loading" size="mini">
            <el-table-column prop="id" label="ID" width="100"/>
            <el-table-column prop="title" label="标题"/>
            <el-table-column prop="tag" label="分类"/>
            <el-table-column prop="updated_at" label="更新时间"/>
            <el-table-column>
                <template slot-scope="{row}">
                    <router-link :to="`${row.id}`" append>
                        <el-button size="mini">编辑</el-button>
                    </router-link>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
import {Table, TableColumn, Pagination} from 'element-ui';

export default {
    components: {
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
        [Pagination.name]: Pagination,
    },
    data() {
        return {
            loading: false,
			list: [
				{
					id: 1,
				},
				{
					id: 2,
				}
			],
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

