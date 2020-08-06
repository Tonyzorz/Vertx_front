<template>
  <div>
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
          <!-- <button name="queryId" v-bind:value="[query.id, query.sqlType]" v-on:click="deleteQuery($event)">삭제</button> -->
          <button
            name="queryId"
            v-bind:value="JSON.stringify(queryString[index])"
            v-on:click="deleteQuery($event)"
          >삭제</button>
        </td>
      </tr>
    </table>
  </div>
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
      if(this.searchQueryString === "" && this.searchDescript === ""){
        
        this.$http.get("/find").then(response => {
         this.queryString = response.data;
        });
      } else {

        this.$http
          .post("/querySearch",{
            headers: { "Content-Type": "application/json; charset=utf-8" },
            
              searchQueryString: this.searchQueryString,
              searchDescript: this.searchDescript,
              from : 'searchLike',
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
    searchWhere() {

      console.log('searchSqlType  ::: ' + this.searchSqlType);
      if(this.searchSqlType === "" && this.searchRole === ""){

        this.$http.get("/find").then(response => {
         this.queryString = response.data;
        });
      } else {

        this.$http
          .post("/querySearch",{
            headers: { "Content-Type": "application/json; charset=utf-8" },
            
              searchSqlType: this.searchSqlType,
              searchRole: this.searchRole,
              from : 'searchWhere',
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