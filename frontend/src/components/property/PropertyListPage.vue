<template>
<!--   <div> -->
<!--     <div class="header"> -->
<!--     </div> -->
<!--     <table border="1"> -->
<!--       <button v-on:click="headerData">headerData</button> -->
<!--       <router-link :to="{name: 'propertyinsertpage'}" tag="button">insert property</router-link> -->
<!--       <tr> -->
<!--         <td>아이디</td> -->
<!--         <td>아이피</td> -->
<!--         <td>포트</td> -->
<!--         <td>권한/역할</td> -->
<!--         <td>삭제</td> -->
<!--       </tr> -->
<!--       <tr v-for="prop in property" v-bind:key="prop.id"> -->
<!--         <td>{{prop.id}}</td> -->
<!--         <router-link :to="{name: 'detailpropertypage', params: {id: prop.id}}"> -->
<!--           <td>{{prop.ip}}</td> -->
<!--         </router-link> -->
<!--         <td>{{prop.port}}</td> -->
<!--         <td>{{prop.roles}}</td> -->
<!--         <td> -->
<!--           <button name="propId" v-bind:value="prop.id" v-on:click="deleteQuery($event)">삭제</button> -->
<!--         </td> -->
<!--       </tr> -->
<!--     </table> -->
<!--   </div> -->
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
								<span style="font-family:NanumGothic">프로퍼티 목록</span>
							</h1>
							<div class="pull-right">
								<ul class="breadcrumb">
									<li><a href="#"><i class="icon-home"></i></a></li>
									<li class="separator"><i class="icon-angle-right"></i></li>
									<li>프로퍼티 관리</li>
									<li class="separator"><i class="icon-angle-right"></i></li>
									<li class="active">프로퍼티 목록</li>
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
											<th width="100">아이디</th>
											<td width="200">
												<div class="col-md-15" style="padding-left: 0 !important;">
													<input class="form-control"  name="searchPropertyId" v-model="searchPropertyId" placeholder="아이디" id="searchPropertyId"/>
												</div>
											</td>
											<th width="100"></th>
											<td width="200">
												<div class="col-md-15" style="padding-left: 0 !important;">
												</div>
											</td>
										</tr>
										<tr style="text-align: left;">
											<th width="100">아이피</th>
											<td width="200">
												<div class="col-md-15" style="padding-left: 0 !important;">
													<input class="form-control"  name="searchIp" v-model="searchIp" placeholder="아이피" id="searchIp"/>
												</div>
											</td>
											<th width="100"></th>
											<td width="200">
												<div class="col-md-15" style="padding-left: 0 !important;">
												</div>
											</td>
										</tr>
										<tr style="text-align: left;">
											<th width="100">포트</th>
											<td width="200">
												<div class="col-md-15" style="padding-left: 0 !important;">
													<input class="form-control"  name="searchPort" v-model="searchPort" placeholder="포트" id="searchPort"/>
												</div>
											</td>
											<th width="100"></th>
											<td width="200">
												<div class="col-md-15" style="padding-left: 0 !important;">
												</div>
											</td>
										</tr>
										<tr style="text-align: left;">
											<th width="100">권한/역할</th>
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
				<!-- 목록-->
				<div class="row">
					<div class="col-sm-12">
						<div class="box" style="margin-bottom:10px;">
							<div class="box-header">
								<div class="title"><i class="icon-double-angle-right text-red"></i>프로퍼티 목록</div>
								<div class="actions">
									<router-link :to="{name: 'propertyinsertpage', params: {propId: propId, listSize: listSize, range: range, page: page, searchPort: searchPort, searchIp: searchIp, searchRole: searchRole, searchPropertyId: searchPropertyId}}" tag="button" class="btn" style="width: 70px">
									<i class="icon-pencil"></i>등록</router-link>
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
										<table v-if="property != false" class="data-table table table-bordered table-hover red-border" style="margin-bottom:0;" width="100%">
											<thead>
												<tr>
													<th scope="col" width="10%" align=center v-on:click="sorting('id', activeQueryId)" value="prodId" v-bind:class="activePropertyId"><i class="fa fa-fw fa-sort"></i>아이디</th>
													<th scope="col" width="45%" align=center v-on:click="sorting('ip')" v-bind:class="activeIp">아이피</th>
													<th scope="col" width="45%" align=center v-on:click="sorting('port')" v-bind:class="activePort">포트</th>
													<th scope="col" width="45%" align=center v-on:click="sorting('`desc`')" v-bind:class="activeDescript">세부 내용</th>
													<th scope="col" width="100px" align=center v-on:click="sorting('roles')" v-bind:class="activeRole">권한/역할</th>
													<th scope="col" width="160px" align=center>삭제</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="(prop, index) in property" v-bind:key="prop.id">
													<td>{{prop.id}}</td>
													<td class="ellipsis" style="text-align: left;">
														<router-link :to="{name: 'detailpropertypage', params: {propId: prop.id, listSize: listSize, range: range, page: page, searchPort: searchPort, searchIp: searchIp, searchRole: searchRole, searchPropertyId: searchPropertyId}}">
															{{prop.ip}}
														</router-link>
													</td>
													<td>{{prop.port}}</td>
													<td>{{prop.desc}}</td>
													<td>{{prop.roles}}</td>
													<td>
														<button class="btn btn-danger btn-xs" type="button" style="width: 46px"
															name="propId"
															v-bind:value="prop.id"
															v-on:click="deleteQuery(JSON.stringify(property[index]))"
														> <i class="icon-remove"></i> 삭제</button>
													</td>
												</tr>
											</tbody>
										</table>
										<table v-else class="data-table table table-bordered table-hover red-border" style="margin-bottom:0;" width="100%">
											<thead>
												<tr>
													<th scope="col" width="100%" align=center>프로퍼티</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>프로퍼티 내용이 없습니다</td>
												</tr>
											</tbody>
										</table>
										<input class="form-control" name="selectSystem"  type="hidden" value="${selectSystem }">
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div>
			<div class="pagination">
				<ul v-if="property != false" class="pagination pagination-sm" >
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
</template>
<script>
/* eslint-disable */

export default {
  created() {
	  
	this.listSize = this.$route.query.listSize;
	this.range = this.$route.query.range;
	this.page = this.$route.query.page;
	this.searchPort = this.$route.query.searchPort,
	this.searchIp = this.$route.query.searchIp,
	this.searchRole = this.$route.query.searchRole,
	this.searchPropertyId = this.$route.query.searchPropertyId,
	this.propId = this.$route.query.propId 
	
	if(this.listSize == null){
		this.listSize = 10;
	} 
	
	if(this.range == null){
		this.range = 1;
	}
	
	if(this.page == null){
		this.page = 1;
	}

	
// 	if(this.searchRole == null){
// 		this.searchRole = '';
// 	}
	
	var sortName = '';
    var sortOrder = '';
    var sort = this.sort;
    for(var i = 0; i < sort.length; i++){
  	  if(sort[i].value != 'default'){
  		  sortName = sort[i].name;
  		  sortOrder = sort[i].value;
  	  }
    }
    
	if(this.searchPort == null && this.searchIp == null && this.searchRole == null && this.searchPropertyId == null){
	
	    console.log("entereed property list ");
	    this.$http
	      .get("/propertyfind?listSize=" + this.listSize + "&range=" + this.range + "&page=" + this.page)
	      .then(response => {
	        console.log("?L!L!L!L!L!L???????????");
// 	        this.property = response.data;
	        this.property = response.data.property;
	  	      this.pagination = response.data.pagination;
	  	      
	  	      var temp = JSON.parse(response.data.pagination);
	  	      
	  	      var start = temp.startPage;
	  	      var end = temp.endPage;
	  	      this.arr = [];
	  	      
	  	      
	  	      for(var i = start; i <= end ; i++){
	  	    	console.log(i)
	  	      	this.arr.push(i);  
	  	      }
	      })
	      .catch(error => {
	        console.log("/propertyfind ==== " + error);
	      });
	    
	} else {
		
		  var roles = this.searchRole;
	      var id = this.searchPropertyId;
	      var port = this.searchPort;
	      var ip = this.searchIp;
	      
	      if(roles != null){
	    	  this.searchRole = roles;
	      } else {
	    	  this.searchRole = '';

	      }
	      if(id != null){
	    	  this.searchPropertyId = id;
	      }else {
	    	  this.searchPropertyId = '';

	      }
	      if(port != null){
	    	  this.searchPort = port;
	      } else {
	    	  this.searchPort = '';
	      }
	      if(ip != null){
	    	  this.searchIp = ip;
	      }else {
	    	  this.searchIp = '';

	      }
	      
	    //현재 페이지 표시
	    
	          console.log("entered, going to get conditional search  :::::::::::::::::::::::")
// 		searchPort: '',
// 		  searchIp: '',
// 		  searchRole: 'drone',
// 		  searchPropertyId: '',
	        this.$http
	          .post("/propertyfind",{
	            headers: { "Content-Type": "application/json; charset=utf-8" },
	              port: this.searchPort,
	              ip: this.searchIp,
	              roles: this.searchRole,
	              id: this.searchPropertyId,
	              listSize: this.listSize,
	              page: this.page,
	              range: this.range,
	              sortName: sortName,
	              sortOrder : sortOrder,
	            validateStatus: status => {
	              return true; // I'm always returning true, you may want to do it depending on the status received
	            }
	          })
	          .then(response => {
//	             console.log("res" + JSON.stringify(res));
//	             var tempo = JSON.stringify(res);
//	             var queryS = JSON.parse(tempo);
	  
//	             this.queryString = queryS.data;
//	             console.log("update success!");
	            
	              this.property = response.data.property;
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
      property: [],
      listSize: 10,
	  range: 1,
	  page: 1,
	  searchPort: '',
	  searchIp: '',
	  searchRole: 'drone',
	  searchPropertyId: '',
	  propId : '',
	  arr: [],
      pagination: [],
      listSearch: false,
	  activePropertyId: 'default',
	  activePort: 'default',
	  activeIp: 'default',
      activeRole: 'default',
      activeDescript: 'default',
	  sort: [
		  {
			  'name': 'id',
			  'value': 'default',
		  },
		  {
			  'name': 'ip',
			  'value': 'default',
		  },
		  {
			  'name': 'port',
			  'value': 'default',
		  },
		  {
			  'name': 'roles',
			  'value': 'default',
		  },
		  {
			  'name': '`desc`',
			  'value': 'default',
		  },
	  	],
    };
  },
  methods: {
    deleteQuery: function(e) {
      
   	  var jsonValue = JSON.parse(e);
      var pagination = JSON.parse(this.pagination);
       
      var listCnt = parseInt(pagination.listCnt);
       
      console.log("listCnt " + listCnt);
//       const buttonValue = e.target.value;
      this.$http
        .delete("/propertyDelete", {
          params: {
            id: jsonValue.id,
            listSize: this.listSize,
            listCnt: listCnt,
            range: this.range,
            page: this.page,
          },
          validateStatus: status => {
            return true; // I'm always returning true, you may want to do it depending on the status received
          }
        })
        .then(response => {
          //go through queryString and find the id and delete from data
          for (var i = 0; i < this.property.length; i++) {
            if (this.property[i].id == jsonValue.id) {
              this.property.splice(i, 1);
            }
          }
          
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

    	var roles = this.searchRole;
	      var id = this.searchPropertyId;
	      var port = this.searchPort;
	      var ip = this.searchIp;
	      
        var roles = document.getElementById('searchRole');
        var id = document.getElementById('searchPropertyId');
        var port = document.getElementById('searchPort');
        var ip = document.getElementById('searchIp');
        
        if(roles != null){
      	  this.searchRole = roles.value;
        } else {
      	  this.searchRole = '';

        }
        if(id != null){
      	  this.searchPropertyId = id.value;
        }else {
      	  this.searchPropertyId = '';

        }
        if(port != null){
      	  this.searchPort = port.value;
        }else {
      	  this.searchPort = '';

        }
        if(ip != null){
      	  this.searchIp = ip.value;
        }else {
      	  this.searchIp = '';

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
      	    this.activePropertyId = 'default';
  			this.activePort = 'default';
  			this.activeIp = 'default';
  			this.activeRole = 'default';
     	   
        }
        
      //현재 페이지 표시
    	this.page = 1;
        if(this.searchQueryString === "" && this.searchDescript === "" && this.searchSqlType === "" && this.searchRole === "" && this.searchQueryId === ""){
          console.log("entered, going to get all :::::::::::::::::::::::")
//           this.$http.get("/find").then(response => {
//           	sortName: sortName,
//               sortOrder: sortOrder,
//          		this.queryString = response.data.queryString;
//           	this.pagination = response.data.pagination;
//   	        this.listSearch = response.data.listSearch;

//   	        var temp = JSON.parse(response.data.pagination);
  	  	      
//   	  	      var start = temp.startPage;
//   	  	      var end = temp.endPage;
//   	  	      this.arr = [];
  	  	      
//   	  	      for(var i = start; i <= end ; i++){
//   	  	    	console.log(i)
//   	  	      	this.arr.push(i);  
//   	  	      }
//           });
          this.$http.get("/propertyfind?listSize=" + this.listSize + "&range=" + this.range + "&page=" + this.page + "&sortName=" + sortName + "&sortOrder=" + sortOrder).then(response => {
  	  		  this.queryString = response.data.property;
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
            .post("/propertyfind",{
              headers: { "Content-Type": "application/json; charset=utf-8" },
              port: this.searchPort,
              ip: this.searchIp,
              roles: this.searchRole,
              id: this.searchPropertyId,
                listSize: this.listSize,
                page: 1,
                range: 1,
                sortName: sortName,
                sortOrder: sortOrder,
              validateStatus: status => {
                return true; // I'm always returning true, you may want to do it depending on the status received
              }
            })
            .then(response => {
//               console.log("res" + JSON.stringify(res));
//               var tempo = JSON.stringify(res);
//               var queryS = JSON.parse(tempo);
    
//               this.queryString = queryS.data;
//               console.log("update success!");
              
              this.property = response.data.property;
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
      fn_pagination(e){
      	console.log(e);
      	var pagination = JSON.parse(this.pagination);
  		
  		var pageNum = parseInt(e);
  		this.page = pageNum;
  		
//   		var rangeSize = pArr.rangeSize;
//       	if(e == 1){
//   			var range = 1;
//   		} else {
//   	    	var range = e * rangeSize + 1;
//   		}
  		
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
  	      
  		this.$http.post("/propertyfind?listSize=" + this.listSize + "&range=" + range + "&page=" + pageNum,{
              headers: { "Content-Type": "application/json; charset=utf-8" },
              sortName: sortName,
              sortOrder: sortOrder,
              port: this.searchPort,
              ip: this.searchIp,
              roles: this.searchRole,
              id: this.searchPropertyId,
            validateStatus: status => {
              return true; // I'm always returning true, you may want to do it depending on the status received
            }
          }).then(response => {
  	  		  this.property = response.data.property;
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
  			
  			this.$http.post("/propertyfind?listSize=" + this.listSize + "&range=" + range + "&page=" + page,{
  	            headers: { "Content-Type": "application/json; charset=utf-8" },
  	              sortName: sortName,
  	              sortOrder: sortOrder,
	  	            port: this.searchPort,
	                ip: this.searchIp,
	                roles: this.searchRole,
	                id: this.searchPropertyId,
  	            validateStatus: status => {
  	              return true; // I'm always returning true, you may want to do it depending on the status received
  	            }
  	          })
  				.then(response => {
  		  		  this.property = response.data.property;
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
  			
  			this.$http.post("/propertyfind?listSize=" + this.listSize + "&range=" + range + "&page=" + page,{
  	            headers: { "Content-Type": "application/json; charset=utf-8" },
  	            sortName: sortName,
  	            sortOrder: sortOrder,
  	            port: this.searchPort,
                ip: this.searchIp,
                roles: this.searchRole,
                id: this.searchPropertyId,
  	          validateStatus: status => {
  	            return true; // I'm always returning true, you may want to do it depending on the status received
  	          }
  	        }).then(response => {
  		  		  this.property = response.data.property;
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

  	    	this.$http.post("/propertyfind?listSize=" + this.listSize + "&range=" + 1 + "&page=" + 1,{
  	            headers: { "Content-Type": "application/json; charset=utf-8" },
  	            sortName: sortName,
  	            sortOrder: sortOrder,
	  	        port: this.searchPort,
	            ip: this.searchIp,
	            roles: this.searchRole,
	            id: this.searchPropertyId,
  	          validateStatus: status => {
  	            return true; // I'm always returning true, you may want to do it depending on the status received
  	          }
  	        }).then(response => {
  		  		  this.property = response.data.property;
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
  	    	this.$http.post("/propertyfind?listSize=" + this.listSize + "&range="+ lastRange +"&page=" + lastPage,{
  	            headers: { "Content-Type": "application/json; charset=utf-8" },
  	            sortName: sortName,
  	            sortOrder: sortOrder,
  	            port: this.searchPort,
                ip: this.searchIp,
                roles: this.searchRole,
                id: this.searchPropertyId,
  	          validateStatus: status => {
  	            return true; // I'm always returning true, you may want to do it depending on the status received
  	          }
  	        }).then(response => {
  		  		  this.property = response.data.property;
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
      	this.$http.post("/propertyfind?listSize=" + this.listSize + "&range="+ 1 +"&page=" + 1,{
              headers: { "Content-Type": "application/json; charset=utf-8" },
              sortName: sortName,
              sortOrder: sortOrder,
              port: this.searchPort,
              ip: this.searchIp,
              roles: this.searchRole,
              id: this.searchPropertyId,
            validateStatus: status => {
              return true; // I'm always returning true, you may want to do it depending on the status received
            }
          }).then(response => {
    		  this.property = response.data.property;
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
  	  	
//   	  	if(currentValue == "default" || currentValue == "asc"){
//   	  		change = 'desc';
//   	  	} else {
//   	  		change = 'asc';
//   	  	}
  	  
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
  	  				case 'id':
  	  					this.activePropertyId = change;
  	  					this.activePort = 'default';
  	  					this.activeIp = 'default';
  	  					this.activeRole = 'default';
  		  				this.activeDescript = 'default';
  		  				break;
  		  			case 'port' :
  		  				this.activePropertyId = 'default';
  		  				this.activePort = change;
  		  				this.activeIp = 'default';
  		  				this.activeRole = 'default';
  		  				this.activeDescript = 'default';
  		  				break;
  		  			case 'ip' :
  		  				this.activePropertyId = 'default';
  		  				this.activePort = 'default';
  		  				this.activeIp = change;
  		  				this.activeRole = 'default';
  		  				this.activeDescript = 'default';
  		  				break;
  		  			case 'roles' :
  		  				this.activePropertyId = 'default';
  		  				this.activePort = 'default';
  		  				this.activeIp = 'default';
  		  				this.activeRole = change;
  		  				this.activeDescript = 'default';
  		  				break;
  		  			case '`desc`' :
  		  				this.activePropertyId = 'default';
  		  				this.activePort = 'default';
  		  				this.activeIp = 'default';
  		  				this.activeRole = 'default';
  		  				this.activeDescript = change;
  		  				break;
  	  			}
  	  			
  	  		} else {
  	  			sort[i].value = 'default';
  	  		}
  	  	}
  	  	
  	  	this.sort = sort;
  	  	var flag = "noReset";
      	this.searchLike(flag);
	},
    headerData(e) {
      this.$http
        .get("/headerData")
        .then(function(response) {
          console.log(JSON.stringify(response));
          magnetic = response.data.magnetic;
        })
        .catch(function(error) {
          console.log(error.response);
        });
    }
  }
};
</script>
<style>
/* Style the header with a grey background and some padding */
.header {
  overflow: hidden;
  background-color: #f1f1f1;
  padding: 20px 10px;
}
/* Style the header links */
.header .header-right #magnetic {
  float: left;
  color: black;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  font-size: 18px;
  line-height: 25px;
  border-radius: 4px;
  height: 100px;
  width: 100px;
}
.header .header-right #weather {
  float: left;
  color: black;
  text-align: center;
  padding: 12px;
  padding-left: 500px;
  text-decoration: none;
  font-size: 18px;
  line-height: 25px;
  border-radius: 4px;
  height: 100px;
  width: 100px;
}
.header .header-right #query {
  float: right;
  color: black;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  font-size: 18px;
  line-height: 25px;
  border-radius: 4px;
  height: 100px;
  width: 100px;
}
/* Change the background color on mouse-over */
.header #magnetic:hover #weather:hover #query:hover {
  background-color: #ddd;
  color: black;
}
/* Float the link section to the right */
/* .header-right {
  float: right;
} */
</style>