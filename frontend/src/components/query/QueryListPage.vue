<template>
  <div>
    <table border="1">
      <router-link :to="{name: 'queryinsertpage'}" tag="button">insert query</router-link>
      <tr>
        <td>아이디</td>
        <td>쿼리</td>
        <td>세부 내용</td>
        <td>디비 타입</td>
        <td>권한</td>
        <td>삭제</td>
      </tr>
      <tr v-for="(query, index) in queryString" v-bind:key="query.id">
        <td>{{query.id}}</td>
        <router-link :to="{name: 'detailquerypage', params: {id: query.id}}">
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
      weather: {}
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
            id: jsonValue.id
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
            if (this.queryString[i].id == jsonValue.id) {
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
    }
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