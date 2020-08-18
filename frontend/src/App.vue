<template>
	<div id="app">
		<header>
			<nav class="navbar navbar-default">
				<a class="navbar-brand">
					<i class="icon-desktop"></i>&nbsp;
					Vertx Manager
				</a>
				<ul class="nav">
					<li class="dropdown dark user-menu">
						<a class="dropdown-toggle" data-toggle="dropdown" href="">
							<i class="icon-user"></i>&nbsp;
							<span>관리자</span>
							<b class="caret"></b>
						</a>
						<ul class="dropdown-menu">
							<li>
								<a href="">
									<i class="icon-signout"></i>
									Logout
								</a>
							</li>
						</ul>
					</li>
					<!-- // 로그아웃 -->
				</ul>
			</nav>
		</header>

		<div id="wrapper">
			<div id="main-nav-bg"></div>
			<nav id="main-nav">
				<div class="navigation">
					<ul class="nav nav-stacked">
						<li>
							<a class="dropdown-collapse" href="#"><i class="icon-desktop"></i><span>쿼리 관리</span><i class="icon-angle-down angle-down"></i></a>
							<ul class="nav nav-stacked" style="display:block;">
								<router-link :to="{name: 'querylistpage'}">
									<i class="icon-caret-right"></i>
									<span>쿼리 조회</span>
								</router-link>
							</ul>
						</li>
						<li>
							<a class="dropdown-collapse" href="#"><i class="icon-desktop"></i><span>프로퍼티 관리</span><i class="icon-angle-down angle-down"></i></a>
							<ul class="nav nav-stacked" style="display:block;">
								<router-link :to="{name: 'propertylistpage'}">
									<i class="icon-caret-right"></i>
									<span>프로퍼티 조회</span>
								</router-link>
							</ul>
						</li>
						<li>
							<a class="dropdown-collapse" href="#"><i class="icon-desktop"></i><span>인스턴스 관리</span><i class="icon-angle-down angle-down"></i></a>
							<ul class="nav nav-stacked" style="display:block;">
								<router-link :to="{name: 'instancelistpage'}">
									<i class="icon-caret-right"></i>
									<span>인스턴스 조회</span>
								</router-link>
							</ul>
						</li>
					</ul>
				</div>
			</nav>
		</div>
		<router-view />
	</div>
</template>

<script>
/* eslint-disable */

export default {
  name: "App"
};
</script>

<style>
	@import './assets/css/bootstrap/bootstrap.css';
	@import './assets/css/light-theme.css';
</style>