<template>
	<div class="container">
	<i class="fa fa-fw fa-sort"></i>
		<div class="row" id="content-wrapper">
			<div class="col-sm-12">
				<!-- page title -->
				<div class="row">
					<div class="col-sm-12">
						<div class="page-header" style="margin-bottom:10px !important;" id="pageTitle2">
							<h1 class="pull-left">
								<i class="icon-list-alt"></i>
								<span style="font-family:NanumGothic">쿼리 목록</span>
							</h1>
							<div class="pull-right">
								<ul class="breadcrumb">
									<li><a href="#"><i class="icon-home"></i></a></li>
									<li class="separator"><i class="icon-angle-right"></i></li>
									<li>쿼리 관리</li>
									<li class="separator"><i class="icon-angle-right"></i></li>
									<li class="active">쿼리 목록</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<!-- page title end -->
				<div class="box" style="margin-bottom:10px;">
					<div class="box-header">
						<div class="title"><i class="icon-double-angle-right text-red"></i> 조회</div>
					</div>
					<div class="box-content box-no-padding">
						<div class="responsive-table">
							<div class="scrollable-area">
								<form method="get" v-on:submit.prevent="searchLike">
<!-- 								<form method="get" v-on:submit.prevent="searchId"> -->
								<table class="table" style="margin-bottom:0;border-bottom:1px solid #ddd;" scrolling="auto">
									<tbody>
										<tr style="text-align: left;">
											<th width="100">쿼리 ID</th>
											<td width="200">
												<div class="col-md-15" style="padding-left: 0 !important;">
													<input class="form-control"  name="searchQueryId" v-model="searchQueryId" placeholder="쿼리 아이디" id="searchQueryId"/>
												</div>
											</td>
											<th width="100"></th>
											<td width="200">
												<div class="col-md-15" style="padding-left: 0 !important;">
												</div>
											</td>
										</tr>
										<tr style="text-align: left;">
											<th width="100">쿼리</th>
											<td width="200">
												<div class="col-md-15" style="padding-left: 0 !important;">
													<input class="form-control"  name="searchQueryString" v-model="searchQueryString" placeholder="쿼리" id="searchQueryString"/>
												</div>
											</td>
											<th width="100">세부 내용</th>
											<td width="200">
												<div class="col-md-15" style="padding-left: 0 !important;">
													<input class="form-control"  name="searchDescript" v-model="searchDescript" placeholder="세부 내용" id="searchDescript"/>
												</div>
											</td>
											<th width="100"></th>
											<td width="200">
												<div class="col-md-15" style="padding-left: 0 !important;">
												</div>
											</td>
										</tr>
										<tr style="text-align: left;">
											<th width="100">디비 타입</th>
											<td width="200">
												<div class="col-md-15" style="padding-left: 0 !important;">
<!-- 													<input class="form-control" name="searchSqlType" v-model="searchSqlType" placeholder="디비 타입" id="searchSqlType"/> -->
													<select class="form-control" v-model="searchSqlType" id="searchSqlType" name="searchSqlType">
														<option value="">ALL</option>
														<option>mysql</option>
														<option>oracle</option>
														<option>test</option>
													</select>
												</div>
											</td>
											<th width="100">권한 검색</th>
											<td width="200">
												<div class="col-md-15" style="padding-left: 0 !important;">
<!-- 													<input class="form-control" name="searchRole" v-model="searchRole" placeholder="권한 검색" id="searchRole"/> -->
													<select class="form-control" v-model="searchRole" id="searchRole" name="searchRole">
														<option value="">ALL</option>
														<option>scs</option>
														<option>test</option>
														<option>ms</option>
													</select>
												</div>
											</td>
											<td width="100">
												<button class="btn" style="width: 70px" type="submit"><i class="icon-search"></i> 조회</button>
											</td>
											<th width="100"></th>
											<td width="200">
												<div class="col-md-15" style="padding-left: 0 !important;">
												</div>
											</td>
										</tr>
									</tbody>
								</table>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div>
					<input type="hidden" name="pageIndex" value=""/>
				</div>
				<p>
					<!-- 목록-->
				<div class="row">
					<div class="col-sm-12">
						<div class="box" style="margin-bottom:10px;">
							<div class="box-header">
								<div class="title"><i class="icon-double-angle-right text-red"></i> 쿼리 목록</div>
								<div class="actions">
									<router-link :to="{name: 'queryinsertpage', params: {
														listSize: listSize,
														range: range,
														page: page,
														searchQueryString : searchQueryString,
														searchDescript: searchDescript,
														searchSqlType: searchSqlType,
														searchRole: searchRole,
														searchQueryId: searchQueryId,
														}}" tag="button" class="btn" style="width: 70px"><i class="icon-pencil"></i>등록</router-link>
								</div>
								<div class="actions">
								<select name="pageview" class="form-control" id="pageview" v-on:change="fn_goSearch($event);">
									<option value="10">10</option>
									<option value="20">20</option>
									<option value="50">50</option>
									<option value="100">100</option>
								</select>
								</div>
							</div>
							<div class="box-content box-no-padding" >
								<div class="responsive-table">
									<div class="scrollable-area" style="overflow-x: auto;" >
										<table v-if="queryString != false" class="data-table table table-bordered table-hover red-border" style="margin-bottom:0;" width="100%">
											<thead>
												<tr>
													<th scope="col" width="10%" align=center v-on:click="sorting('queryId', activeQueryId)" value="queryId" v-bind:class="activeQueryId"><i class="fa fa-fw fa-sort"></i>쿼리 ID</th>
													<th scope="col" width="45%" align=center v-on:click="sorting('queryString')" v-bind:class="activeQueryString">쿼리</th>
													<th scope="col" width="45%" align=center v-on:click="sorting('descript')" v-bind:class="activeDescript">세부 내용</th>
													<th scope="col" width="100px" align=center v-on:click="sorting('sqlType')" v-bind:class="activeSqlType">디비 타입</th>
													<th scope="col" width="160px" align=center v-on:click="sorting('role')" v-bind:class="activeRole">권한</th>
													<th scope="col" width="160px" align=center>삭제</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="(query, index) in queryString" v-bind:key="query.queryId">
													<td>{{query.queryId}}</td>
													<td class="ellipsis" style="text-align: left;">
														<router-link :to="{name: 'detailquerypage', params: {
														queryId: query.queryId,
														listSize: listSize,
														range: range,
														page: page,
														searchQueryString : searchQueryString,
														searchDescript: searchDescript,
														searchSqlType: searchSqlType,
														searchRole: searchRole,
														searchQueryId: searchQueryId,}}">
															{{query.queryString}}
														</router-link>
													</td>
													<td>{{query.descript}}</td>
													<td>{{query.sqlType}}</td>
													<td>{{query.role}}</td>
													<td>
														<button class="btn btn-danger btn-xs" type="button" style="width: 46px"
															name="queryId"
															v-bind:value="JSON.stringify(queryString[index])"
															v-on:click="deleteQuery(JSON.stringify(queryString[index]))"
														> <i class="icon-remove"></i> 삭제</button>
													</td>
												</tr>
											</tbody>
										</table>
										<table v-else class="data-table table table-bordered table-hover red-border" style="margin-bottom:0;" width="100%">
											<thead>
												<tr>
													<th scope="col" width="100%" align=center>쿼리</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>쿼리 내용이 없습니다</td>
												</tr>
											</tbody>
										</table>
										<input class="form-control" name="selectSystem"  type="hidden" value="${selectSystem }">
										<!-- pagination -->
<!-- 										<div id="pull-left"> -->
<!-- 											<ul v-if="queryString != false" class="pagination pagination-sm" > -->
<!-- 												<li>&#160;</li><li><span v-on:click="fn_first()"><i class='icon-angle-left'></i> First</span></li> -->
<!-- 												<li><span v-on:click="fn_prev()"><i class='icon-angle-left'></i> Prev</span></li> -->
<!-- 												<li v-for="(ar, index) in arr" v-bind:class="(ar == page)? 'active_page' : 'not_active_page'" v-bind:key="index"><span v-on:click="fn_pagination(ar)">{{ar}}</span></li> -->
<!-- 												<li>&#160;<span v-on:click="fn_next()">Next <i class='icon-angle-right'></i></span></li> -->
<!-- 												<li><span v-on:click="fn_last()">Last <i class='icon-angle-right'></i></span></li> -->
<!-- 											</ul> -->
<!-- 											<ul v-else></ul> -->
<!-- 										</div> -->
										<!-- // pagination -->
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- // IP 목록 -->
			</div>
		</div>
		<div>
			<div class="pagination">
				<ul v-if="queryString != false" class="pagination pagination-sm" >
					<li>&#160;</li><li><span v-on:click="fn_first()"><i class='icon-angle-left'></i> First</span></li>
					<li><span v-on:click="fn_prev()"><i class='icon-angle-left'></i> Prev</span></li>
					<li v-for="(ar, index) in arr" v-bind:class="(ar == page)? 'active_page' : 'not_active_page'" v-bind:key="index"><span v-on:click="fn_pagination(ar)">{{ar}}</span></li>
					<li>&#160;<span v-on:click="fn_next()">Next <i class='icon-angle-right'></i></span></li>
					<li><span v-on:click="fn_last()">Last <i class='icon-angle-right'></i></span></li>
				</ul>
				<ul v-else></ul>
			</div>
		</div>
		<footer id="footer">
			<div class="footer-wrapper">
				<div class="row">
					<div class="col-sm-6 text">
					&copy; Copyright 2020 CUDO
					</div>
				</div>
			</div>
		</footer>
	</div>
  <!-- <div>
    <div class="header">
      <router-link :to="{name: 'queryinsertpage'}" tag="button">insert query</router-link>
      <div class="searchQueryId">
        <span>query id 검색</span>
        <form method="get" v-on:submit.prevent="searchId">
          <input type="text" name="searchQueryId" v-model="searchQueryId" placeholder="쿼리 아이디" id="searchQueryId"/>
          <button type="submit">검색</button>
        </form>
      </div>
      <div class="searchLike">
        <span>쿼리 & 세부 내용 검색</span>
        <form method="post" v-on:submit.prevent="searchLike">
          <input type="text" name="searchQueryString" v-model="searchQueryString" placeholder="쿼리" id="searchLike1"/>
          <input type="text" name="searchDescript" v-model="searchDescript" placeholder="세부 내용" id="searchLike2"/>
          <button type="submit">검색</button>
        </form>
      </div>
      <div class="searchWhere">
        <span>디비 타입  & 권한 검색</span>
        <form method="post" v-on:submit.prevent="searchWhere">
          <input type="text" name="searchSqlType" v-model="searchSqlType" placeholder="디비 타입" id="searchWhere1"/>
          <input type="text" name="searchRole" v-model="searchRole" placeholder="권한 검색" id="searchWhere2"/>
          <button type="submit">검색</button>
        </form>
      </div>
    </div>
    <table border="1">
      <tr>
        <td>아이디</td>
        <td>쿼리</td>
        <td>세부 내용</td>
        <td>디비 타입</td>
        <td>권한</td>
        <td>삭제</td>
      </tr>
      <tr v-for="(query, index) in queryString" v-bind:key="query.queryId">
        <td>{{query.queryId}}</td>
        <router-link :to="{name: 'detailquerypage', params: {queryId: query.queryId}}">
          <td>{{query.queryString}}</td>
        </router-link>
        <td>{{query.descript}}</td>
        <td>{{query.sqlType}}</td>
        <td>{{query.role}}</td>
        <td>
          <button name="queryId" v-bind:value="[query.id, query.sqlType]" v-on:click="deleteQuery($event)">삭제</button>
          <button
            name="queryId"
            v-bind:value="JSON.stringify(queryString[index])"
            v-on:click="deleteQuery($event)"
          >삭제</button>
        </td>
      </tr>
    </table>
  </div> -->
</template>
<script>
/* eslint-disable */

export default {
  created() {
//     this.$http.get("/find").then(response => {
//       this.queryString = response.data.queryString;
//       this.pagination = response.data.pagination;
      
//       var temp = JSON.parse(response.data.pagination);
      
//       var start = temp.startPage;
//       var end = temp.endPage;
      
//       for(var i = start; i <= end ; i++){
    	
//       	this.arr.push(i);  
//       }
//       console.log("arrrrrr" + this.arr)
//     });
    // this.$http.get("/headerData").then(response => {
    //   console.log("ssssssssssssssssss" + JSON.stringify(response))
    //   var obj = response.data;
    //   this.magnetic = obj.magnetic;
    //   this.weather = obj.weather;
    //   this.queryLength = obj.queryString.count;

    //   console.log(this.magnetic);
    //   console.log(this.magnetic.kindex);
    // });
//     console.log(e);
// 	var pagination = JSON.parse(this.pagination);
	
// 	var pageNum = parseInt(e);
	
// 	var range = pagination.range;
	
// 	console.log("range is " + range + " pageNum is ====" + pageNum)
// 	var lis = this.listSize;

    this.listSize = this.$route.query.listSize;
    this.range = this.$route.query.range;
    this.page = this.$route.query.page;
    this.searchQueryString = this.$route.query.searchQueryString,
    this.searchDescript = this.$route.query.searchDescript,
    this.searchSqlType = this.$route.query.searchSqlType,
    this.searchRole = this.$route.query.searchRole,
    this.searchQueryId = this.$route.query.searchQueryId
    
	if(this.listSize == null){
		this.listSize = 10;
	} 
	
	if(this.range == null){
		this.range = 1;
	}
	
	if(this.page == null){
		this.page = 1;
	}
	
	if(this.searchSqlType == null){
		this.searchSqlType = '';
	}
	
	if(this.searchRole == null){
		this.searchRole = '';
	}
	
     var sortName = '';
     var sortOrder = '';
     var sort = this.sort;
     for(var i = 0; i < sort.length; i++){
   	  if(sort[i].value != 'default'){
   		  sortName = sort[i].name;
   		  sortOrder = sort[i].value;
   	  }
     }
     
	if(this.searchQueryString == null && this.searchDescript == null && this.searchSqlType == null && this.searchRole == null && this.searchQueryId == null ){
		
		console.log(this.listSize);
		this.$http.get("/find?listSize=" + this.listSize + "&range=" + this.range + "&page=" + this.page).then(response => {
	  		  this.queryString = response.data.queryString;
	  	      this.pagination = response.data.pagination;
	  	      
	  	      var temp = JSON.parse(response.data.pagination);
	  	      
	  	      var start = temp.startPage;
	  	      var end = temp.endPage;
	  	      this.arr = [];
	  	      
	  	      
	  	      for(var i = start; i <= end ; i++){
	  	    	console.log(i)
	  	      	this.arr.push(i);  
	  	      }
	        });
		
	
  	} else {

  	      var role = this.searchRole;
  	      var queryId = this.searchQueryId;
  	      var sqlType = this.searchSqlType;
  	      var descript = this.searchDescript;
  	      var queryString = this.searchQueryString;
  	      
  	      if(role != null){
  	    	  this.searchRole = role;
  	      } else {
  	    	  this.searchRole = '';

  	      }
  	      if(queryId != null){
  	    	  this.searchQueryId = queryId;
  	      }else {
  	    	  this.searchQueryId = '';

  	      }
  	      if(sqlType != null){
  	    	  this.searchSqlType = sqlType;
  	      } else {
  	    	  this.searchSqlType = '';
  	      }
  	      if(descript != null){
  	    	  this.searchDescript = descript;
  	      }else {
  	    	  this.searchDescript = '';

  	      }
  	      if(queryString != null){
  	    	  this.searchQueryString = queryString;
  	      }else {
  	    	  this.searchQueryString = '';
			  
  	      }
  	      
  	    //현재 페이지 표시
  	    
  	          console.log("entered, going to get conditional search  :::::::::::::::::::::::")

  	        this.$http
  	          .post("/querySearch",{
  	            headers: { "Content-Type": "application/json; charset=utf-8" },
  	            
  	              queryString: this.searchQueryString,
  	              descript: this.searchDescript,
  	              sqlType: this.searchSqlType,
  	              role: this.searchRole,
  	              listSize: this.listSize,
  	              queryId: this.searchQueryId,
  	              page: this.page,
  	              range: this.range,
  	              sortName: sortName,
  	              sortOrder : sortOrder,
  	            validateStatus: status => {
  	              return true; // I'm always returning true, you may want to do it depending on the status received
  	            }
  	          })
  	          .then(response => {
//  	             console.log("res" + JSON.stringify(res));
//  	             var tempo = JSON.stringify(res);
//  	             var queryS = JSON.parse(tempo);
  	  
//  	             this.queryString = queryS.data;
//  	             console.log("update success!");
  	            
  	              this.queryString = response.data.queryString;
  		  	      this.pagination = response.data.pagination;
  		  	      this.listSearch = response.data.listSearch;
  		  	      
  		  	      console.log("queryString value is  after search ::::: " + this.queryString);
  		  	      var temp = JSON.parse(response.data.pagination);
  		  	      
  		  	      var start = temp.startPage;
  		  	      var end = temp.endPage;
  		  	      this.arr = [];
  		  	      
  		  	      for(var i = start; i <= end ; i++){
  		  	    	console.log(i)
  		  	      	this.arr.push(i);  
  		  	      }
  	          })
  	          .catch(err => {
  	            console.error("update fali!");
  	          });
  	      
  	}
		
  },
  
  
  data() {
    return {
      queryLength: 0,
      queryString: [],
      magnetic: {},
      weather: {},
      searchQueryString: '',
      searchDescript: '',
      searchSqlType: '',
      searchRole: '',
      searchQueryId : '',
      page: 1,
      range: 1,
      listSize: 10,
      pagination: [],
	  arr: [],
	  listSearch: false,
	  activeQueryId: 'default',
	  activeQueryString: 'default',
	  activeDescript: 'default',
      activeSqlType: 'default',
      activeRole: 'default',
	  sort: [
		  {
			  'name': 'queryString',
			  'value': 'default',
		  },
		  {
			  'name': 'descript',
			  'value': 'default',
		  },
		  {
			  'name': 'sqlType',
			  'value': 'default',
		  },
		  {
			  'name': 'role',
			  'value': 'default',
		  },
		  {
			  'name': 'queryId',
			  'value': 'default',
		  }
	  	],
    };
  },
  methods: {
    deleteQuery: function(e) {
      var jsonValue = JSON.parse(e);
      var pagination = JSON.parse(this.pagination);
      
      var listCnt = parseInt(pagination.listCnt);
      
      console.log("listCnt " + listCnt);
      // var testing = JSON.parse("{" + buttonValue + );
      // console.log(testing);
      console.log(e);
      
//       this.$http
//       .post("/querySearch",{
//         headers: { "Content-Type": "application/json; charset=utf-8" },
        
//           queryString: this.searchQueryString,
//           descript: this.searchDescript,
//           sqlType: this.searchSqlType,
//           role: this.searchRole,
//           listSize: this.listSize,
//           queryId: this.searchQueryId,
//           page: 1,
//           range: 1,
//         validateStatus: status => {
//           return true; // I'm always returning true, you may want to do it depending on the status received
//         }
//       })
//       .then(
    		  
      this.$http
        .delete("/delete", {
          params: {
            queryId: jsonValue.queryId,
            listSize: this.listSize,
            listCnt: listCnt,
            range: this.range,
            page: this.page,
          },
          headers: { "Content-Type": "application/json; charset=utf-8" },
          data: jsonValue,
          
          validateStatus: status => {
            return true; // I'm always returning true, you may want to do it depending on the status received
          }
        })
        .then(response => {
          //go through queryString and find the id and delete from data
          
          console.log("hi");
          for (var i = 0; i < this.queryString.length; i++) {
            if (this.queryString[i].queryId == jsonValue.queryId) {
              console.log("queryString :::::: " + this.queryString[i]);
              console.log("about to delete index ==" + i);
              console.log("queryString data" + this.queryString[i]);

              this.queryString.splice(i, 1);
            }
          }
//           this.queryString = response.data.queryString;
  	      this.pagination = response.data.pagination;
  	      
  	      var temp = JSON.parse(response.data.pagination);
  	      console.log(temp)
  	      
  	      var start = temp.startPage;
  	      var end = temp.endPage;
  	      this.arr = [];
  	      
  	      for(var i = start; i <= end ; i++){
  	    	console.log(i)
  	      	this.arr.push(i);  
  	      }
          
        })
        .catch(function(error) {
          console.log(error.response);
        });
    },
    searchLike(flag) {

      var role = document.getElementById('searchRole');
      var queryId = document.getElementById('searchQueryId');
      var sqlType = document.getElementById('searchSqlType');
      var descript = document.getElementById('searchDescript');
      var queryString = document.getElementById('searchQueryString');
      
      if(role != null){
    	  this.searchRole = role.value;
      } else {
    	  this.searchRole = '';

      }
      if(queryId != null){
    	  this.searchQueryId = queryId.value;
      }else {
    	  this.searchQueryId = '';

      }
      if(sqlType != null){
    	  this.searchSqlType = sqlType.value;
      }else {
    	  this.searchSqlType = '';

      }
      if(descript != null){
    	  this.searchDescript = descript.value;
      }else {
    	  this.searchDescript = '';

      }
      if(queryString != null){
    	  this.searchQueryString = queryString.value;
      }else {
    	  this.searchQueryString = '';

      }

      var flag  = flag;
      var sortName = '';
      var sortOrder = '';
      if(flag == "noReset"){
    	  
          var sort = this.sort;
          for(var i = 0; i < sort.length; i++){
        	  if(sort[i].value != 'default'){
        		  sortName = sort[i].name;
        		  sortOrder = sort[i].value;
        	  }
          }
      } else {
    	  console.log("ENTERED WOW");
    	    this.activeQueryId = 'default';
			this.activeQueryString = 'default';
			this.activeDescript = 'default';
			this.activeSqlType = 'default';
			this.activeRole = 'default';
   	   
      }
      
      
      
      
      
    //현재 페이지 표시
  	this.page = 1;
      console.log("current value of role is :: " + this.searchRole);
      if(this.searchQueryString === "" && this.searchDescript === "" && this.searchSqlType === "" && this.searchRole === "" && this.searchQueryId === ""){
        console.log("entered, going to get all :::::::::::::::::::::::")
//         this.$http.get("/find").then(response => {
//         	sortName: sortName,
//             sortOrder: sortOrder,
//        		this.queryString = response.data.queryString;
//         	this.pagination = response.data.pagination;
// 	        this.listSearch = response.data.listSearch;

// 	        var temp = JSON.parse(response.data.pagination);
	  	      
// 	  	      var start = temp.startPage;
// 	  	      var end = temp.endPage;
// 	  	      this.arr = [];
	  	      
// 	  	      for(var i = start; i <= end ; i++){
// 	  	    	console.log(i)
// 	  	      	this.arr.push(i);  
// 	  	      }
//         });
        this.$http.get("/find?listSize=" + this.listSize + "&range=" + this.range + "&page=" + this.page + "&sortName=" + sortName + "&sortOrder=" + sortOrder).then(response => {
	  		  this.queryString = response.data.queryString;
	  	      this.pagination = response.data.pagination;
	  	      
	  	      var temp = JSON.parse(response.data.pagination);
	  	      
	  	      var start = temp.startPage;
	  	      var end = temp.endPage;
	  	      this.arr = [];
	  	      
	  	      
	  	      for(var i = start; i <= end ; i++){
	  	    	console.log(i)
	  	      	this.arr.push(i);  
	  	      }
	        });
      } else {
          console.log("entered, going to get conditional search  :::::::::::::::::::::::")

        this.$http
          .post("/querySearch",{
            headers: { "Content-Type": "application/json; charset=utf-8" },
            
              queryString: this.searchQueryString,
              descript: this.searchDescript,
              sqlType: this.searchSqlType,
              role: this.searchRole,
              listSize: this.listSize,
              queryId: this.searchQueryId,
              page: 1,
              range: 1,
              sortName: sortName,
              sortOrder: sortOrder,
            validateStatus: status => {
              return true; // I'm always returning true, you may want to do it depending on the status received
            }
          })
          .then(response => {
//             console.log("res" + JSON.stringify(res));
//             var tempo = JSON.stringify(res);
//             var queryS = JSON.parse(tempo);
  
//             this.queryString = queryS.data;
//             console.log("update success!");
            
              this.queryString = response.data.queryString;
	  	      this.pagination = response.data.pagination;
	  	      this.listSearch = response.data.listSearch;
	  	      
	  	      console.log("queryString value is  after search ::::: " + this.queryString);
	  	      var temp = JSON.parse(response.data.pagination);
	  	      
	  	      var start = temp.startPage;
	  	      var end = temp.endPage;
	  	      this.arr = [];
	  	      
	  	      for(var i = start; i <= end ; i++){
	  	    	console.log(i)
	  	      	this.arr.push(i);  
	  	      }
          })
          .catch(err => {
            console.error("update fali!");
          });
      }
    },
    searchId() {

      console.log('searchQueryId  ::: ' +searchQueryId);

      var queryId = this.searchQueryId;
      
      if("" === queryId){

        this.$http.get("/find").then(response => {
       		this.queryString = response.data.queryString;
        	this.pagination = response.data.pagination;
        });
      } else {

        this.$http.get(`/find/${queryId}`).then(response => {
          console.log(JSON.stringify(response));
          // this.queryString.queryId = response.data[0].queryId;
          // this.queryString.queryString = response.data[0].queryString;
          // this.queryString.descript = response.data[0].descript;
          // this.queryString.role = response.data[0].role;
          var beforeParse = JSON.stringify(response.data[0]);
          var afterParse = JSON.parse(beforeParse);
          var array = [response.data[0]];
          this.queryString = array;
  
          console.log("current queryString" + JSON.stringify(this.queryString));
        });
      }
    },
    fn_pagination(e){
    	console.log(e);
    	var pagination = JSON.parse(this.pagination);
		
		var pageNum = parseInt(e);
		this.page = pageNum;
		
// 		var rangeSize = pArr.rangeSize;
//     	if(e == 1){
// 			var range = 1;
// 		} else {
// 	    	var range = e * rangeSize + 1;
// 		}
		
		var range = pagination.range;
		
		console.log("range is " + range + " pageNum is ====" + pageNum)
		var lis = this.listSize;
		
		console.log("this is role value before sending to api : " + this.searchRole);
		
		var sortName = '';
	      var sortOrder = '';
	      var sort = this.sort;
	      for(var i = 0; i < sort.length; i++){
	    	  if(sort[i].value != 'default'){
	    		  sortName = sort[i].name;
	    		  sortOrder = sort[i].value;
	    	  }
	      }
	      
		this.$http.post("/find?listSize=" + this.listSize + "&range=" + range + "&page=" + pageNum,{
            headers: { "Content-Type": "application/json; charset=utf-8" },
            sortName: sortName,
            sortOrder: sortOrder,
            queryString: this.searchQueryString,
            descript: this.searchDescript,
            sqlType: this.searchSqlType,
            role: this.searchRole,
            queryId: this.searchQueryId,
          validateStatus: status => {
            return true; // I'm always returning true, you may want to do it depending on the status received
          }
        }).then(response => {
	  		  this.queryString = response.data.queryString;
	  	      this.pagination = response.data.pagination;
	  	      
	  	      var temp = JSON.parse(response.data.pagination);
	  	      
	  	      var start = temp.startPage;
	  	      var end = temp.endPage;
	  	      this.arr = [];
	  	      
	  	      for(var i = start; i <= end ; i++){
	  	    	console.log(i)
	  	      	this.arr.push(i);  
	  	      }
	        });
    },
    fn_next(e){
    	console.log(e);
    	var pagination = JSON.parse(this.pagination);
    	var page = (pagination.range * pagination.rangeSize) + 1;
    	var range = parseInt(pagination.range) + 1;
    	
    	console.log("page = " + page + " range = " + range);
    	
    	
    	
		var lis = this.listSize;
		var sortName = '';
	      var sortOrder = '';
	      var sort = this.sort;
	      for(var i = 0; i < sort.length; i++){
	    	  if(sort[i].value != 'default'){
	    		  sortName = sort[i].name;
	    		  sortOrder = sort[i].value;
	    	  }
	      }
	      
		if(pagination.endPage < pagination.pageCnt){

			//현재 페이지 표시
	    	this.page = page;
			
			this.$http.post("/find?listSize=" + this.listSize + "&range=" + range + "&page=" + page,{
	            headers: { "Content-Type": "application/json; charset=utf-8" },
	              sortName: sortName,
	              sortOrder: sortOrder,
	              queryString: this.searchQueryString,
	              descript: this.searchDescript,
	              sqlType: this.searchSqlType,
	              role: this.searchRole,
	              queryId: this.searchQueryId,
	            validateStatus: status => {
	              return true; // I'm always returning true, you may want to do it depending on the status received
	            }
	          })
				.then(response => {
		  		  this.queryString = response.data.queryString;
		  	      this.pagination = response.data.pagination;
		  	      
		  	      var temp = JSON.parse(response.data.pagination);
		  	      
		  	      var start = temp.startPage;
		  	      var end = temp.endPage;
		  	      this.arr = [];
		  	      
		  	      for(var i = start; i <= end ; i++){
		  	    	console.log(i)
		  	      	this.arr.push(i);  
		  	      }
	        });
		} 
		
    },
    fn_prev(e){
    	console.log(e);
    	var pagination = JSON.parse(this.pagination);
    	var page = ((parseInt(pagination.range) - 2)* pagination.rangeSize) + 1;
    	var range = parseInt(pagination.range) - 1;
    	
    	console.log("page = " + page + " range = " + range);
    	
    	
    	var lis = this.listSize;
		var sortName = '';
	      var sortOrder = '';
	      var sort = this.sort;
	      for(var i = 0; i < sort.length; i++){
	    	  if(sort[i].value != 'default'){
	    		  sortName = sort[i].name;
	    		  sortOrder = sort[i].value;
	    	  }
	      }
		var lis = this.listSize;
		
		if(pagination.range > 1){
		
			//현재 페이지 표시
	    	this.page = page;
			
			this.$http.post("/find?listSize=" + this.listSize + "&range=" + range + "&page=" + page,{
	            headers: { "Content-Type": "application/json; charset=utf-8" },
	            sortName: sortName,
	              sortOrder: sortOrder,
	            queryString: this.searchQueryString,
	            descript: this.searchDescript,
	            sqlType: this.searchSqlType,
	            role: this.searchRole,
	            queryId: this.searchQueryId,
	          validateStatus: status => {
	            return true; // I'm always returning true, you may want to do it depending on the status received
	          }
	        }).then(response => {
		  		  this.queryString = response.data.queryString;
		  	      this.pagination = response.data.pagination;
		  	      
		  	      var temp = JSON.parse(response.data.pagination);
		  	      
		  	      var start = temp.startPage;
		  	      var end = temp.endPage;
		  	      this.arr = [];
		  	      
		  	      for(var i = start; i <= end ; i++){
		  	    	console.log(i)
		  	      	this.arr.push(i);  
		  	      }
	        });
		} 
		
    },
    fn_first(e){
    	console.log(e);
    	var pagination = JSON.parse(this.pagination);
		var lastPage = parseInt(pagination.pageCnt);
		
    	//현재 페이지 표시
    	this.page = 1;
    	var sortName = '';
	      var sortOrder = '';
	      var sort = this.sort;
	      for(var i = 0; i < sort.length; i++){
	    	  if(sort[i].value != 'default'){
	    		  sortName = sort[i].name;
	    		  sortOrder = sort[i].value;
	    	  }
	      }
	    
	    var check = true;
	    if(parseInt(pagination.page) == parseInt(pagination.startPage)){
	    	check = false;
	    }
	    
	    if(check){

	    	this.$http.post("/find?listSize=" + this.listSize + "&range=" + 1 + "&page=" + 1,{
	            headers: { "Content-Type": "application/json; charset=utf-8" },
	            sortName: sortName,
	            sortOrder: sortOrder,
	            queryString: this.searchQueryString,
	            descript: this.searchDescript,
	            sqlType: this.searchSqlType,
	            role: this.searchRole,
	            queryId: this.searchQueryId,
	          validateStatus: status => {
	            return true; // I'm always returning true, you may want to do it depending on the status received
	          }
	        }).then(response => {
		  		  this.queryString = response.data.queryString;
		  	      this.pagination = response.data.pagination;
		  	      
		  	      var temp = JSON.parse(response.data.pagination);
		  	      
		  	      var start = temp.startPage;
		  	      var end = temp.endPage;
		  	      this.arr = [];
		  	      
		  	      for(var i = start; i <= end ; i++){
		  	    	console.log(i)
		  	      	this.arr.push(i);  
		  	      }
	      	});
	    }
		    
    },
    fn_last(e){
    	console.log(e);
    	
    	var pagination = JSON.parse(this.pagination);
		var lastPage = parseInt(pagination.pageCnt);
    	var lastRange = Math.ceil(parseInt(pagination.pageCnt)/parseInt(pagination.rangeSize));
    	
    	var sortName = '';
	      var sortOrder = '';
	      var sort = this.sort;
	      for(var i = 0; i < sort.length; i++){
	    	  if(sort[i].value != 'default'){
	    		  sortName = sort[i].name;
	    		  sortOrder = sort[i].value;
	    	  }
	      }
    	
	    var check = true;
	    if(parseInt(pagination.page) == lastPage){
	    	check = false;
	    }
	    
	    //현재 페이지 표시
    	this.page = lastPage;
	    
	    if(check){
	    	
	    	console.log(lastRange)
	    	this.$http.post("/find?listSize=" + this.listSize + "&range="+ lastRange +"&page=" + lastPage,{
	            headers: { "Content-Type": "application/json; charset=utf-8" },
	            sortName: sortName,
	            sortOrder: sortOrder,
	            queryString: this.searchQueryString,
	            descript: this.searchDescript,
	            sqlType: this.searchSqlType,
	            role: this.searchRole,
	            queryId: this.searchQueryId,
	          validateStatus: status => {
	            return true; // I'm always returning true, you may want to do it depending on the status received
	          }
	        }).then(response => {
		  		  this.queryString = response.data.queryString;
		  	      this.pagination = response.data.pagination;
		  	      
		  	      var temp = JSON.parse(response.data.pagination);
		  	      
		  	      var start = temp.startPage;
		  	      var end = temp.endPage;
		  	      this.arr = [];
		  	      
		  	      for(var i = start; i <= end ; i++){
		  	    	console.log(i)
		  	      	this.arr.push(i);  
		  	      }
	   		 });
	    	
	    }
	    
    	
    },
    fn_goSearch(e) {
        const listSize = e.target.value;
        this.listSize = listSize;
    	console.log("entered goSearch()?????????" + listSize);
    	
    	var pagination = JSON.parse(this.pagination);
		var lastPage = parseInt(pagination.pageCnt);
    	var lastRange = Math.ceil(parseInt(pagination.pageCnt)/parseInt(pagination.rangeSize));
    	
    	//현재 페이지 표시
    	this.page = 1;
    	
    	var sortName = '';
	      var sortOrder = '';
	      var sort = this.sort;
	      for(var i = 0; i < sort.length; i++){
	    	  if(sort[i].value != 'default'){
	    		  sortName = sort[i].name;
	    		  sortOrder = sort[i].value;
	    	  }
	      }
    	console.log("page is " + lastPage + " range is : " + lastRange + " listSize is : " + listSize);
    	this.$http.post("/find?listSize=" + this.listSize + "&range="+ 1 +"&page=" + 1,{
            headers: { "Content-Type": "application/json; charset=utf-8" },
            sortName: sortName,
            sortOrder: sortOrder,
            queryString: this.searchQueryString,
            descript: this.searchDescript,
            sqlType: this.searchSqlType,
            role: this.searchRole,
            queryId: this.searchQueryId,
          validateStatus: status => {
            return true; // I'm always returning true, you may want to do it depending on the status received
          }
        }).then(response => {
  		  this.queryString = response.data.queryString;
  	      this.pagination = response.data.pagination;
  	      
  	      var temp = JSON.parse(response.data.pagination);
  	      
  	      var start = temp.startPage;
  	      var end = temp.endPage;
  	      this.arr = [];
  	      
  	      for(var i = start; i <= end ; i++){
  	    	console.log(i)
  	      	this.arr.push(i);  
  	      }
        });
    },
    sorting(z, flag){
    	var which = z;
	  	var change = '';
	  	var sort = this.sort;
	  	var flag = flag;
	  	
// 	  	if(currentValue == "default" || currentValue == "asc"){
// 	  		change = 'desc';
// 	  	} else {
// 	  		change = 'asc';
// 	  	}
	  
	  	console.log("change" + change);
	  	for(var i = 0; i < sort.length; i++){
	  		if(sort[i].name == which){
	  			
				if(sort[i].value == 'default' || sort[i].value == 'asc'){
					change = 'desc';	  			
				} else {
					change = 'asc';
				}
				
	  			sort[i].value = change;
	
	  			switch(which){
	  				case 'queryId':
	  					this.activeQueryId = change;
	  					this.activeQueryString = 'default';
	  					this.activeDescript = 'default';
	  					this.activeSqlType = 'default';
	  					this.activeRole = 'default';
		  				break;
		  			case 'queryString' :
		  				this.activeQueryId = 'default';
		  				this.activeQueryString = change;
		  				this.activeDescript = 'default';
		  				this.activeSqlType = 'default';
		  				this.activeRole = 'default';
		  				break;
		  			case 'descript' :
		  				this.activeQueryId = 'default';
		  				this.activeQueryString = 'default';
		  				this.activeDescript = change;
		  				this.activeSqlType = 'default';
		  				this.activeRole = 'default';
		  				break;
		  			case 'sqlType' :
		  				this.activeQueryId = 'default';
		  				this.activeQueryString = 'default';
		  				this.activeDescript = 'default';
		  				this.activeSqlType = change;
		  				this.activeRole = 'default';
		  				break;
		  			case 'role' :
		  				this.activeQueryId = 'default';
		  				this.activeQueryString = 'default';
		  				this.activeDescript = 'default';
		  				this.activeSqlType = 'default';
		  				this.activeRole = change;
		  				break;
	  			}
	  			
	  		} else {
	  			sort[i].value = 'default';
	  		}
	  	}
	  	
	  	this.sort = sort;
	  	var flag = "noReset";
    	this.searchLike(flag);
//     	var tt = this.queryString;
//     	var n = tt.length;
    	
//     	this.queryIdActive = !this.queryIdActive;
    	
//     	//기준
//     	//order by ??? 
//     					// ASC or DESC
//     					//this.queryString = queryString;
    	
//     	//asc
//     	console.log("before sorting" + JSON.stringify(tt));
    	
//     	if(this.queryIdActive){
    		
//     		//desc

//             for(var i = 0; i < n - 1; i++)
//             {
//                 var max_idx = i; // max_idx instead of min_idx
//                 for(var j = i+1; j < n; j++)
//                     if(tt[j].queryId > tt[max_idx].queryId) // > instead of <
//                         max_idx = j;

//                 var temp = tt[max_idx];
//                 tt[max_idx] = tt[i];
//                 tt[i] = temp;
//             }
    	
//     	} else {
			
//     		//asc
    		
//     		for(var i = 0; i < n - 1; i++){
        		
//         		var min_idx = i;
//         		for(var j = i + 1; j < n; j++){
        			
//         			if(tt[j].queryId < tt[min_idx].queryId){
//         				min_idx = j;
//         			}
        			
//         		}
        		
//         		var temp = tt[min_idx];
//         		tt[min_idx] = tt[i];
//         		tt[i] = temp;
        	
//         	}
//     	}
    	
//     	this.queryString = tt;
        
//     	console.log("after sorting" + JSON.stringify(tt));

    	//기준
    	//order by ??? 
    					// ASC or DESC
    					//this.queryString = queryString;
//     	this.$http.post("/orderBy",{
//             headers: { "Content-Type": "application/json; charset=utf-8" },
			            
//           validateStatus: status => {
//             return true; // I'm always returning true, you may want to do it depending on the status received
//           }
//         }).then(response => {
//   		  this.queryString = response.data.queryString;
//   	      this.pagination = response.data.pagination;
  	      
//   	      var temp = JSON.parse(response.data.pagination);
  	      
//   	      var start = temp.startPage;
//   	      var end = temp.endPage;
//   	      this.arr = [];
  	      
//   	      for(var i = start; i <= end ; i++){
//   	    	console.log(i)
//   	      	this.arr.push(i);  
//   	      }
//         });
//     },
    // headerData(e) {
    //   this.$http
    //     .get("/headerData")
    //     .then(function(response) {
    //       console.log(JSON.stringify(response));
    //       magnetic = response.data.magnetic;
    //     })
    //     .catch(function(error) {
    //       console.log(error.response);
    //     });
  		},
	},
}
</script>
<style>
</style>