<template>
  <form method="post" v-on:submit.prevent="edit">
	<div class="container">
		<div class="row" id="content-wrapper">
			<div class="col-xs-12">
				<!-- page title & location -->
				<div class="row">
					<div class="col-sm-12">
						<div class="page-header" style="margin-bottom: 10px !important;">
							<h1 class="pull-left">
								<i class="icon-list-alt"></i> <span
									style="font-family: NanumGothic">쿼리 수정</span>
							</h1>
							<div class="pull-right">
								<ul class="breadcrumb">
									<li><a href="#"><i class="icon-home"></i></a></li>
									<li class="separator"><i class="icon-angle-right"></i></li>
									<li>쿼리 관리</li>
									<li class="separator"><i class="icon-angle-right"></i></li>
									<li class="active">쿼리 수정</li>
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
									<i class="icon-double-angle-right text-red"></i> 쿼리 수정
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
															{{queryString.queryId}}
														</div>
													</td>
												</tr>
												<tr>
													<th class="col-md-3"><label class="col-md-3">쿼리 내용</label></th>
													<td class="ta_l">
														<div class="col-md-10"
															style="padding-left: 0 !important;">
															<textarea class="form-control" style="width: 100%;" rows="5" name="queryString" v-model="queryString.queryString"></textarea>
														</div>
													</td>
												</tr>
												<tr>
													<th class="col-md-3"><label class="col-md-3">세부 설명</label></th>
													<td class="ta_l">
														<div class="col-md-10"
															style="padding-left: 0 !important;">
															<textarea class="form-control" style="width: 100%;" rows="5" name="desc" v-model="queryString.descript" ></textarea>
														</div>
													</td>
												</tr>
												<tr>
													<th class="col-md-3"><label class="col-md-3">DB 타입 </label></th>
													<td class="ta_l">
														<div class="col-md-3" style="padding-left: 0 !important;">
<!-- 															<input class="form-control" type="text" name="sqlType" required v-model="queryString.sqlType" /> -->
															<select class="form-control" required v-model="queryString.sqlType" id="searchSqlType" name="sqlType">
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
<!-- 															<input class="form-control" type="text" name="role" required v-model="queryString.role" /> -->
															<select class="form-control" required v-model="queryString.role" id="searchRole" name="role">
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
											<button class="btn btn-primary" type="submit"><i class="icon-ok"></i>&nbsp; 수정</button>
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
    <span>{{msg.queryString}}</span>
    <span>{{message}}</span>
  </form>
</template>
<script>
/* eslint-disable */

export default {
  created: function() {
    var queryId = this.$route.params.queryId;
    this.listSize = this.$route.params.listSize;
    this.range = this.$route.params.range;
    this.page = this.$route.params.page;
    this.searchQueryString = this.$route.params.searchQueryString,
    this.searchDescript = this.$route.params.searchDescript,
    this.searchSqlType = this.$route.params.searchSqlType,
    this.searchRole = this.$route.params.searchRole,
    this.searchQueryId = this.$route.params.searchQueryId
    
    if(this.searchSqlType == null){
		this.searchSqlType = '';
	}
	
	if(this.searchRole == null){
		this.searchRole = '';
	}
	
    console.log("page is " + this.page + " range is : " + this.range + " listSize is : " + this.listSize);
    this.$http.get(`/find/${queryId}`).then(response => {
      console.log(JSON.stringify(response));
      this.queryString = response.data[0];
      console.log(JSON.stringify(this.queryString));
    });
  },
  data: function() {
    return {
      queryString: [],
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
    edit() {
      var testing = JSON.stringify(this.queryString);
      var jsonTest = JSON.parse(testing);
      var beforeTest = jsonTest.queryString;
      var beforeReplace = jsonTest.descript;

      beforeReplace = beforeReplace.replace(/(')/g, "\\'");
      beforeReplace = beforeReplace.replace(/(")/g, '"');

      this.queryString.descript = beforeReplace;
      if (/(#{queryId})/g.test(beforeTest)) {
        this.msg["queryString"] = "쿼리 내용에 입력된 값이 잘못되었습니다";
        this.message = ".";
      } else {
        this.msg["queryString"] = "";
		
        console.log(this.queryString);
        this.$http
          .post("/queryUpdate", this.queryString)
          .then(res => {
            console.log("update success!");
          })
          .catch(err => {
            console.error("update fali!");
          });
        
    		
//    		this.$http.post("/find?listSize=" + this.listSize + "&range=" + this.range + "&page=" + this.pageNum,{
//                headers: { "Content-Type": "application/json; charset=utf-8" },
               
//                queryString: this.searchQueryString,
//                descript: this.searchDescript,
//                sqlType: this.searchSqlType,
//                role: this.searchRole,
//                queryId: this.searchQueryId,
//              validateStatus: status => {
//                return true; // I'm always returning true, you may want to do it depending on the status received
//              }
//            }).then(response => {
//         	   var listSize = this.listSize;
//         	   var range = this.range;
//         	   var page = this.page;

//    	  	      	console.log("dsfasdfasdf" +listSize);
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
//    	  	 	this.$router.go(this.$router.push({name: "/", params: {listSize: this.listSize, range: this.range, page: this.page}}));
//    	     });
        
      }
    },
    goCancle(){
    	this.msg["queryString"] = "";

//         this.$http
//           .post("/queryUpdate", this.queryString)
//           .then(res => {
//             console.log("update success!");
//           })
//           .catch(err => {
//             console.error("update fali!");
//           });
        
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
  }
}
</script>
