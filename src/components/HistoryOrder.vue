<template>
    <div class="card">
        <div class="card-header">
            <h2>用户成交记录(最新50条)</h2>
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
                        <th>委托/成交数量	</th>
                        <th>委托/成交金额	</th>
                        <th>状态	</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in list">
                        <td>{{item.createdAt | parseTime}}</td>
                        <td>{{_pair}}</td>
                        <td :class="{'c-red' : item.order_side==2, 'c-green' : item.order_side==1}">
                            {{item.order_side == 1 ? '买' : '卖'}}
                        </td>
                        <td>{{item.price}}<br/>{{item.deal_price}}</td>
                        <td>{{item.amount}}<br/>{{item.deal_amount}}</td>
                        <td>{{item.money}}<br/>{{item.deal_money}}</td>
                        <td>{{orderStatus[item.status]}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from 'underscore'

	function compare(a, b) {

		let comparison = 0;
		a = a.createdAt;
		b = b.createdAt;

		if (a > b) {
			comparison = -1;
		} else if (b > a) {
			comparison = 1;
		}

		return comparison;
	}


	export default {
		props: {
			_list : Array,
			_pair  : '',
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
				var list = _.extend([], val, true);
                list.sort(compare);
				this.list = list;
            }
        },

		methods: {

		},
        mounted () {

        }
	}
</script>

<style>

</style>
