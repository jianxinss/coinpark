<template>
    <div class="card">
        <div class="card-header">
            <h2>用户委托</h2>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-striped table-vmiddle ">
                    <thead>
                    <tr>
                        <th>时间</th>
                        <th>市场</th>
                        <th>方向</th>
                        <th>委托/成交价格	</th>
                        <th>委托/成交数量</th>
                        <th>委托/成交金额	</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in list">
                        <td>{{item.createdAt | parseTime}}</td>
                        <td>{{item.pair}}</td>
                        <td>{{item.order_side == 1 ? '买' : '卖'}}</td>
                        <td>{{item.price}}<br/>{{item.deal_price}}</td>
                        <td>{{item.amount}}<br/>{{item.deal_amount}}</td>
                        <td>{{item.money}}<br/>{{item.deal_money}}</td>
                        <td><a @click="cancelOrder(item.id)">撤单</a></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from 'underscore'
	import service from '@/coinpark';
	import toastr from './toastr';
	export default {
		props: {
			_list : Array
		},

        data : function () {
            return {
                list : [],
                orderStatus: {
                    1: '待成交',
                    2: '部分成交',
                    3: '完全成交',
                    4: '部分撤销',
                    5: '完全撤销',
                    6: '待撤销'
                },
            };
        },

		watch: {
			_list (val) {
				this.list = val;
            }
        },

		methods: {
			cancelOrder(id) {
				var me = this;
				service.cancelOrder(id).then(function (res) {
					console.log('cancelOrder', res)
                    toastr.success('撤单成功');
					me.$emit('cancelOrder')
				});
			},

		},
        mounted () {

        }
	}
</script>

<style scoped="">
    a {
        cursor: pointer;;
    }
</style>
