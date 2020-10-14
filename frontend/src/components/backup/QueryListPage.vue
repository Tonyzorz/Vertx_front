<template>
	<div class="container">
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
								<form method="get" v-on:submit.prevent="searchId">
								<table class="table" style="margin-bottom:0;border-bottom:1px solid #ddd;" scrolling="auto">
									<tbody>
										<tr style="text-align: left;">
											<th width="100">쿼리 ID</th>
											<td width="200">
												<div class="col-md-15" style="padding-left: 0 !important;">
													<input class="form-control"  name="searchQueryId" v-model="searchQueryId" placeholder="쿼리 아이디" id="searchQueryId"/>
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
								<form method="get" v-on:submit.prevent="searchLike">
								<table class="table" style="margin-bottom:0;border-bottom:1px solid #ddd;" scrolling="auto">
									<tbody>
										<tr style="text-align: left;">
											<th width="100">쿼리</th>
											<td width="200">
												<div class="col-md-15" style="padding-left: 0 !important;">
													<input class="form-control"  name="searchQueryString" v-model="searchQueryString" placeholder="쿼리" id="searchLike1"/>
												</div>
											</td>
											<th width="100">세부 내용</th>
											<td width="200">
												<div class="col-md-15" style="padding-left: 0 !important;">
													<input class="form-control"  name="searchDescript" v-model="searchDescript" placeholder="세부 내용" id="searchLike2"/>
												</div>
											</td>
											<td width="100">
												<button class="btn" style="width: 70px" onclick="searchApi();"><i class="icon-search"></i> 조회</button>
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
													<input class="form-control"  name="searchSqlType" v-model="searchSqlType" placeholder="디비 타입" id="searchWhere1"/>
												</div>
											</td>
											<th width="100">권한 검색</th>
											<td width="200">
												<div class="col-md-15" style="padding-left: 0 !important;">
													<input class="form-control"  name="searchRole" v-model="searchRole" placeholder="권한 검색" id="searchWhere2"/>
												</div>
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
									<button class="btn" type="button" style="width: 70px" onclick="javascript:fn_apiRegist()"><i class="icon-pencil"></i>등록</button>
								</div>
								<div class="actions">
								<select name="pageview" class="form-control" id="pageview" onchange="fn_goSearch(1);">
									<option value="10">10</option>
									<option value="20">20</option>
									<option value="50">50</option>
									<option value="100">100</option>
								</select>
								</div>
							</div>
							<div class="box-content box-no-padding">
								<div class="responsive-table">
									<div class="scrollable-area" style="overflow-x: auto;" >
										<table class="data-table table table-bordered table-hover red-border" style="margin-bottom:0;" width="100%">
											<thead>
												<tr>
													<th scope="col" width="10%" align=center>쿼리 ID</th>
													<th scope="col" width="50%" align=center>쿼리</th>
													<th scope="col" width="20%" align=center>세부 내용</th>
													<th scope="col" width="100px" align=center>디비 타입</th>
													<th scope="col" width="160px" align=center>권한</th>
													<th scope="col" width="160px" align=center>삭제</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="(query, index) in queryString" v-bind:key="query.queryId">
													<td>{{query.queryId}}</td>
													<td style="text-align: left;">
														<router-link :to="{name: 'detailquerypage', params: {queryId: query.queryId}}">
															<td>{{query.queryString}}</td>
														</router-link>
													</td>
													<td>{{query.descript}}</td>
													<td>{{query.sqlType}}</td>
													<td>{{query.role}}</td>
													<td>
														<button class="btn btn-danger btn-xs" type="button" style="width: 46px"
															name="queryId"
															v-bind:value="JSON.stringify(queryString[index])"
															v-on:click="deleteQuery($event)"
														> <i class="icon-remove"></i> 삭제</button>
													</td>
												</tr>
											</tbody>
										</table>
										<input class="form-control" name="selectSystem"  type="hidden" value="${selectSystem }">
										<!-- pagination -->
										<div id="pull-left">
											<ul class="pagination pagination-sm">
											</ul>
										</div>
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
    this.$http.get("/find").then(response => {
      this.queryString = response.data;
    });
    // this.$http.get("/headerData").then(response => {
    //   console.log("ssssssssssssssssss" + JSON.stringify(response))
    //   var obj = response.data;
    //   this.magnetic = obj.magnetic;
    //   this.weather = obj.weather;
    //   this.queryLength = obj.queryString.count;

    //   console.log(this.magnetic);
    //   console.log(this.magnetic.kindex);
    // });
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
    };
  },
  methods: {
    deleteQuery: function(e) {
      const buttonValue = e.target.value;
      var jsonValue = JSON.parse(buttonValue);
      // var testing = JSON.parse("{" + buttonValue + );
      // console.log(testing);
      console.log(e);
      console.log("v-bind:values ::: " + buttonValue);
      this.$http
        .delete("/delete", {
          params: {
            id: jsonValue.queryId
          },
          headers: { "Content-Type": "application/json; charset=utf-8" },
          data: jsonValue,
          validateStatus: status => {
            return true; // I'm always returning true, you may want to do it depending on the status received
          }
        })
        .then(response => {
          //go through queryString and find the id and delete from data
          for (var i = 0; i < this.queryString.length; i++) {
            if (this.queryString[i].queryId == jsonValue.queryId) {
              console.log("queryString :::::: " + this.queryString[i]);
              console.log("about to delete index ==" + i);
              console.log("queryString data" + this.queryString[i]);

              this.queryString.splice(i, 1);
            }
          }
        })
        .catch(function(error) {
          console.log(error.response);
        });
    },
    searchLike() {

      console.log('searchSqlType  ::: ' + this.searchSqlType);
      if(this.searchQueryString === "" && this.searchDescript === "" && this.searchSqlType === "" && this.searchRole === ""){
        
        this.$http.get("/find").then(response => {
         this.queryString = response.data;
        });
      } else {

        this.$http
          .post("/querySearch",{
            headers: { "Content-Type": "application/json; charset=utf-8" },
            
              queryString: this.searchQueryString,
              descript: this.searchDescript,
              sqlType: this.searchSqlType,
              role: this.searchRole,
            validateStatus: status => {
              return true; // I'm always returning true, you may want to do it depending on the status received
            }
          })
          .then(res => {
            console.log("res" + JSON.stringify(res));
            var tempo = JSON.stringify(res);
            var queryS = JSON.parse(tempo);
  
            this.queryString = queryS.data;
            console.log("update success!");
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
         this.queryString = response.data;
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
    // }
  }
};
</script>
<style>
</style>