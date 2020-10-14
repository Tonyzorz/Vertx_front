<template>
	<form method="post" @submit.stop.prevent="mySubmit">
	<div class="container">
		<div class="row" id="content-wrapper">
			<div class="col-xs-12">
				<!-- page title & location -->
				<div class="row">
					<div class="col-sm-12">
						<div class="page-header" style="margin-bottom: 10px !important;">
							<h1 class="pull-left">
								<i class="icon-list-alt"></i> <span
									style="font-family: NanumGothic">쿼리 등록</span>
							</h1>
							<div class="pull-right">
								<ul class="breadcrumb">
									<li><a href="#"><i class="icon-home"></i></a></li>
									<li class="separator"><i class="icon-angle-right"></i></li>
									<li>쿼리 관리</li>
									<li class="separator"><i class="icon-angle-right"></i></li>
									<li class="active">쿼리 등록</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<!-- // page title & location -->
				<!-- API 등록 -->
				<div class="row">
					<div class="col-sm-12">
						<div class="box" style="margin-bottom: 10px;">
							<div class="box-header">
								<div class="title">
									<i class="icon-double-angle-right text-red"></i> 쿼리 등록
								</div>
							</div>
							<div class="box-content box-no-padding">
								<div class="responsive-table">
									<div class="scrollable-area">
										<table class="data-table table table-bordered red-border"
											style="margin-bottom: 0;">
											<tbody>
												<tr>
													<th class="col-md-3"><label class="col-md-3">쿼리 아이디 </label></th>
													<td class="ta_l">
														<div class="col-md-3" style="padding-left: 0 !important;">
															<input class="form-control" type="text" name="queryId" required v-model="query.queryId" />
														</div>
													</td>
												</tr>
												<tr>
													<th class="col-md-3"><label class="col-md-3">쿼리 내용</label></th>
													<td class="ta_l">
														<div class="col-md-10"
															style="padding-left: 0 !important;">
															<textarea class="form-control" style="width: 100%;" rows="5" name="queryString" v-model="query.queryString"></textarea>
														</div>
													</td>
												</tr>
												<tr>
													<th class="col-md-3"><label class="col-md-3">세부 설명</label></th>
													<td class="ta_l">
														<div class="col-md-10"
															style="padding-left: 0 !important;">
															<textarea class="form-control" style="width: 100%;" rows="5" name="descript" v-model="query.descript" ></textarea>
														</div>
													</td>
												</tr>
												<tr>
													<th class="col-md-3"><label class="col-md-3">DB 타입 </label></th>
													<td class="ta_l">
														<div class="col-md-3" style="padding-left: 0 !important;">
<!-- 															<input class="form-control" type="text" name="sqlType" required v-model="query.sqlType" /> -->
															<select class="form-control" v-model="query.sqlType" id="sqlType" name="sqlType">
																<option>mysql</option>
																<option>oracle</option>
																<option>test</option>
															</select>
														</div>
													</td>
												</tr>
												<tr>
													<th class="col-md-3"><label class="col-md-3">권한 </label></th>
													<td class="ta_l">
														<div class="col-md-3" style="padding-left: 0 !important;">
<!-- 															<input class="form-control" type="text" name="role" required v-model="query.role" /> -->
															<select class="form-control" v-model="query.role" id="role" name="role">
																<option>scs</option>
																<option>test</option>
																<option>ms</option>
																<option>user</option>
															</select>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
								<div class="form-actions form-actions-padding-sm">
									<div class="row">
										<div class="btn_area_b">
											<button class="btn btn-primary" type="submit"><i class="icon-ok"></i>&nbsp; 등록</button>
											<button class="btn" type="button" v-on:click="goCancle()"><i class="icon-list"></i>&nbsp; 목록</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- // 가입자 케이스 등록 -->
			</div>
		</div>
	</div>
  </form>
</template>
<script>
/* eslint-disable */

export default {
	created: function(){
	    this.listSize = this.$route.params.listSize;
	    this.range = this.$route.params.range;
	    this.page = this.$route.params.page;
	    this.searchQueryString = this.$route.params.searchQueryString,
	    this.searchDescript = this.$route.params.searchDescript,
	    this.searchSqlType = this.$route.params.searchSqlType,
	    this.searchRole = this.$route.params.searchRole,
	    this.searchQueryId = this.$route.params.searchQueryId
	    
	
	},
  data() {
    return {
      query: {
        queryId: "",
        queryString: "",
        descript: "",
        sqlType: "mysql",
        role: "scs"
      },
      email: "",
      response: "",
      msg: [],
      message: "",
      listSize: 10,
      range: 1,
      page: 1,
      searchQueryString: '',
      searchDescript: '',
      searchSqlType: '',
      searchRole: '',
      searchQueryId : '',
    };
  },
  
  methods: {
    mySubmit() {
      console.log("this.query" + JSON.stringify(this.query));
      
      var testing = JSON.stringify(this.query);
      var jsonTest = JSON.parse(testing);
      var beforeTest = jsonTest.queryString;
      var beforeReplace = jsonTest.descript;

      beforeReplace = beforeReplace.replace(/(')/g, "\\'");
      beforeReplace = beforeReplace.replace(/(")/g, '\"');

      this.query.descript = beforeReplace;
      if(/(#{queryId})/g.test(beforeTest)){
        this.msg['queryString'] = "쿼리 내용에 입력된 값이 잘못되었습니다";
        this.message = ".";
      } else {
        this.msg['queryString'] = '';
        this.$http
          .post("/queryInsert", this.query)
          .then(res => {
            console.log("upload success!");
          })
          .catch(err => {
            console.error("upload fali!");
          });
        //go to list page
        this.$router.go(this.$router.push({name: "/", query: {
	  	 		listSize: this.listSize, 
	  	 		range: this.range, 
	  	 		page: this.page,
   	  	 	searchQueryString : this.searchQueryString,
			searchDescript: this.searchDescript,
			searchSqlType: this.searchSqlType,
			searchRole: this.searchRole,
			searchQueryId: this.searchQueryId,
	  	 		}}));
      }

    },
    goCancle(){
    	this.msg["queryString"] = "";

    	this.$router.go(this.$router.push({name: "/", query: {
	  	 		listSize: this.listSize, 
	  	 		range: this.range, 
	  	 		page: this.page,
   	  	 	searchQueryString : this.searchQueryString,
			searchDescript: this.searchDescript,
			searchSqlType: this.searchSqlType,
			searchRole: this.searchRole,
			searchQueryId: this.searchQueryId,
	  	 		}}));
    	
//         this.$http
//           .post("/queryUpdate", this.queryString)
//           .then(res => {
//             console.log("update success!");
//           })
//           .catch(err => {
//             console.error("update fali!");
//           });
        
//    	  	 	this.$router.go(this.$router.push({name: "/", query: {
//    	  	 		listSize: this.listSize, 
//    	  	 		range: this.range, 
//    	  	 		page: this.page,
// 	   	  	 	searchQueryString : this.searchQueryString,
// 				searchDescript: this.searchDescript,
// 				searchSqlType: this.searchSqlType,
// 				searchRole: this.searchRole,
// 				searchQueryId: this.searchQueryId,
//    	  	 		}}));
    }
  }
};
</script>
