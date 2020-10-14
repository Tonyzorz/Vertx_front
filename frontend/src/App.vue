<template>
	<div id="app">
		<header>
			<nav class="navbar navbar-default">
				<a class="navbar-brand">
					<i class="icon-desktop"></i>&nbsp;
					Vertx Manager
				</a>
				<a class="toggle-nav btn pull-left" href="#"><i class="icon-reorder"></i></a>
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
							<a class="dropdown-collapse" v-on:click="drop($event, 'query')"><i class="icon-desktop" v-bind:style="{color: array.query.color}"></i><span>쿼리 관리</span><i v-bind:style="{color: array.query.color}" class="icon-angle-down angle-down"></i></a>
							<ul class="nav nav-stacked" v-bind:style="{display: array.query.block}">
								<router-link :to="{name: 'querylistpage'}">
									<i class="icon-caret-right"></i>
									<span  class="menu_styles">쿼리 조회</span>
								</router-link>
							</ul>
						</li>
						<li>
							<a class="dropdown-collapse" v-on:click="drop($event, 'property')"><i class="icon-desktop"  v-bind:style="{color: array.property.color}"></i><span>프로퍼티 관리</span><i v-bind:style="{color: array.property.color}" class="icon-angle-down angle-down"></i></a>
							<ul class="nav nav-stacked" v-bind:style="{display: array.property.block}">
								<router-link :to="{name: 'propertylistpage'}">
									<i class="icon-caret-right"></i>
									<span class="menu_styles">프로퍼티 조회</span>
								</router-link>
							</ul>
						</li>
						<li>
							<a class="dropdown-collapse" v-on:click="drop($event, 'instance')" ><i class="icon-desktop" v-bind:style="{color: array.instance.color}"></i><span>인스턴스 관리</span><i v-bind:style="{color: array.instance.color}" v-bind:class="arrowPosition"></i></a>
							<ul class="nav nav-stacked" v-bind:style="{display: array.instance.block}" ref="instance">
								<router-link :to="{name: 'instancelistpage'}">
									<i class="icon-caret-right"></i>
									<span class="menu_styles">인스턴스 조회</span>
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
  name: "App",
  data() {
	  return {
/* 		  arrowPosition: 'icon-angle-right angle-right',
 */		  arrowPosition: 'icon-angle-down angle-down',
		  array : {
				"instance": {

					"block": "none",
					"color": "gray"
				},
				"property": {
					"block": "none",
					"color": "gray"
				},
				"query": {
					"block": "none",
					"color": "gray"
				}
			},
	      isBlockInstance : 'none',
	      isBlockProperty : 'none',
	      colorInstance: 'gray',
	      colorProperty: 'gray',
	  }
  },
  methods: {
	  drop(e, type){
		  console.log(e);
		  
		  var blockName = 'isBlock';
		  var colorName = '';
		  
		  
		  
		  switch(type){
		  case 'instance':
			  
// 			  if(e.target.innerHTML.includes("blue")){
// 				  this.isBlockInstance = "none";
// 				  this.colorInstance = 'gray';
// 			  } else {
// 				  this.isBlockInstance = 'block';
// 				  this.colorInstance = 'blue';
// 			  }
			  
			  if(this.array.instance.color == "#0080c0"){
				  this.array.instance.color = "gray";
				  
				  this.array.instance.block = "none";
			  } else {
				  this.array.instance.color = "#0080c0";
				  this.array.instance.block = "block"; 

                  this.array.property.color = "gray";
				  this.array.property.block = "none";
                  this.array.query.color = "gray";
				  this.array.query.block = "none";
			  }
			  console.log(this.array.instance.color)
			  break;
			  
		  case 'property':
			  
			  if(this.array.property.color == "#0080c0"){
				  this.array.property.color = "gray";
				  
				  this.array.property.block = "none";
			  } else {
				  this.array.property.color = "#0080c0";
				  this.array.property.block = "block"; 

                  this.array.instance.color = "gray";
				  this.array.instance.block = "none";
                  this.array.query.color = "gray";
				  this.array.query.block = "none";
			  }
			  break;
			  
		  case 'query':
			  
			  if(this.array.query.color == "#0080c0"){
				  this.array.query.color = "gray";
				  
				  this.array.query.block = "none";
			  } else {
				  this.array.query.color = "#0080c0";
				  this.array.query.block = "block"; 

                  this.array.instance.color = "gray";
				  this.array.instance.block = "none";
                  this.array.property.color = "gray";
				  this.array.property.block = "none";
			  }
			  break;
			  
// 		  case 'property':
			  
// 			  if(this.array.property.color == "blue"){
// 				  this.array.property.color = "gray";
				  
// 				  this.array.property.block = "none";
// 			  } else {
// 				  this.array.property.color = "blue";
// 				  this.array.property.block = "block"; 

//                   this.array.instance.color = "gray";
// 				  this.array.instance.block = "none";
//                   this.array.query.color = "gray";
// 				  this.array.query.block = "none";
// 			  }
// 			  break;
		  }
		  console.log(this.isBlock);
		  
	},
  } 
};
</script>

<style>
	@import './assets/css/bootstrap/bootstrap.css';
	@import './assets/css/light-theme.css';
</style>