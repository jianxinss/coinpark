<template>
    <div>
        <header id="header" data-current-skin="blue">
            <ul class="header-inner clearfix">

                <li class="hidden-xs">
                    <a href="#/" class="m-l-10">{ API }</a>
                </li>

                <li class="pull-right">
                    <ul class="top-menu">

                        <router-link tag="li" to="/coinpark" class="item hidden-xs" :class="{active: isActive('coinpark')}" ><a> <span class="tm-label">CoinPark</span></a></router-link>
                        <router-link tag="li" to="/fcoin" class="item" :class="{active: isActive('fcoin')}" ><a> <span class="tm-label">Fcoin</span></a></router-link>
                        <router-link tag="li" to="/fcoin" class="item" :class="{active: isActive('fcoin')}" ><a> <span class="tm-label">BigOne</span></a></router-link>
                    </ul>
                </li>
            </ul>





        </header>
        <section id="main">
            <router-view></router-view>
        </section>

        <section id="footer">
            Copyright &copy; 2018-2019 Jan ETH: 0x67230200357f5A8B72259923239a12d3D487CE21

            <!--<ul class="f-menu">-->
                <!--<li><a href="">Home</a></li>-->
                <!--<li><a href="">Dashboard</a></li>-->
                <!--<li><a href="">Reports</a></li>-->
                <!--<li><a href="">Support</a></li>-->
                <!--<li><a href="">Contact</a></li>-->
            <!--</ul>-->
        </section>
    </div>
</template>

<script>
	export default {
		name: 'App',
        methods : {
			isActive(name) {
				return this.$route.path.indexOf(name) === 1;
			},

		},
        watch :{

        }
	}
</script>

<style scoped="">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        /*color: #2c3e50;*/
        margin-top: 60px;
    }
    .ha-menu a {
        color: #fff;
        display: block;
        /*font-size: 16px;*/
        text-transform: none;
    }

    .ha-menu > ul > li > *:not(ul) {
        text-transform: none;
    }

    #header {
        min-height: 50px;
    }

    #main {
        padding-top: 70px;
    }


    a {
        color: #FFFFFF;
        display: inline-block;
        text-decoration: none;
        font-size: 21px;
        font-weight: bolder;
    }


    [data-current-skin="coinpark"] {
        background-color: #24293d;
    }
</style>
