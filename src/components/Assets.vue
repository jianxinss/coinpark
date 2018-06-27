<template>
    <div class="card">
        <div class="card-header">
            <h2>账户资产</h2>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-striped table-vmiddle ">
                    <thead>
                    <tr>
                        <th>币种</th>
                        <th>总额</th>
                        <th>冻结</th>
                        <th>估值BTC/CNY</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in list">
                        <td>{{item.coin_symbol}}</td>
                        <td>{{item.balance}}</td>
                        <td>{{item.freeze}}</td>
                        <td>{{item.BTCValue}}<br/>{{item.CNYValue}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from 'underscore'



	export default {
		props: {
			_list : Array
		},

        data : function () {
            return {
                list : [],
            };
        },

		watch: {
			_list (val) {
				this.list = val;
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
