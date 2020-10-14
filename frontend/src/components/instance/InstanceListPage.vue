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
								<span style="font-family:NanumGothic">인스턴스 목록</span>
							</h1>
							<div class="pull-right">
								<ul class="breadcrumb">
									<li><a href="#"><i class="icon-home"></i></a></li>
									<li class="separator"><i class="icon-angle-right"></i></li>
									<li>인스턴스 관리</li>
									<li class="separator"><i class="icon-angle-right"></i></li>
									<li class="active">인스턴스 목록</li>
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
				<!-- 목록-->
				<div class="row">
					<div class="col-sm-12">
						<div class="box" style="margin-bottom:10px;">
							<div class="box-header">
								<div class="title"><i class="icon-double-angle-right text-red"></i>인스턴스 목록</div>
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
													<th scope="col" width="10%" align=center v-on:click="sorting('queryId', activeQueryId)" value="queryId" v-bind:class="activeQueryId"><i class="fa fa-fw fa-sort"></i>아이디</th>
													<th scope="col" width="45%" align=center v-on:click="sorting('property')" v-bind:class="activeproperty">아이피</th>
													<th scope="col" width="45%" align=center v-on:click="sorting('descript')" v-bind:class="activeDescript">포트</th>
													<th scope="col" width="100px" align=center v-on:click="sorting('sqlType')" v-bind:class="activeSqlType">권한/역할</th>
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
    console.log("entereed property list ");
    this.$http
      .get("/instancefind")
      .then(response => {
        this.instance = response.data;
      })
      .catch(error => {
        console.log("/instancefind ==== " + error);
      });
  },
  data() {
    return {
      queryLength: 0,
      instance: [],
      magnetic: {},
      weather: {}
    };
  },
  methods: {
    deleteQuery: function(e) {
      var myJson = JSON.stringify(e);
      var realJson = JSON.parse(myJson);

      const idValue = realJson.id;
      const roleValue = realJson.role;
      const instanceIdValue = realJson.role_instance_id;

      console.log(idValue);
      console.log(roleValue);
      console.log(instanceIdValue);

      this.$http
        .delete("/instanceDelete", {
          params: {
            id: idValue,
            role: roleValue,
            role_instance_id: instanceIdValue
          },
          validateStatus: status => {
            return true; // I'm always returning true, you may want to do it depending on the status received
          }
        })
        .then(response => {
          //go through queryString and find the id and delete from data
          for (var i = 0; i < this.instance.length; i++) {
            if (
              this.instance[i].id == idValue &&
              this.instance[i].role == roleValue &&
              this.instance[i].role_instance_id == instanceIdValue
            ) {
              this.instance.splice(i, 1);
            }
          }
        })
        .catch(function(error) {
          console.log(error.response);
        });
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
ul.instance {
  list-style-type: none;
  width: 100%;
  display: table;
  table-layout: fixed;
}

ul.instance li {
  display: table-cell;
  width: 50%;
}
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