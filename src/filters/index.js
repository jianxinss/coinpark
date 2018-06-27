import Vue from 'vue';
import moment from 'moment';
Vue.filter('parseTime',function (value, format) {
	if (!value) return '--/--';
	return moment(value).format(format || 'YYYY-MM-DD HH:mm:ss')
});