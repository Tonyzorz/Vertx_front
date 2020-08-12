<template>
  <form method="post" v-on:submit.prevent="edit">
    <table border="1">
      <router-link :to="{name: 'queryinsertpage'}" tag="button">insert query</router-link>
      <tr>
        <td>아이디</td>
        <td>쿼리</td>
        <td>세부 내용</td>
        <td>디비 타입</td>
        <td>권한</td>
        <td>수정</td>
      </tr>
      <tr>
        <td>{{queryString.queryId}}</td>
        <td>
          <textarea rows="10" cols="50" name="queryString" v-model="queryString.queryString" />
        </td>
        <td>
          <textarea rows="10" cols="50" name="desc" v-model="queryString.descript" />
        </td>
        <td>
          <textarea rows="10" cols="20" type="text" name="sqlType" v-model="queryString.sqlType" />
        </td>
        <td>
          <textarea rows="10" cols="20" type="text" name="role" v-model="queryString.role" />
        </td>
        <td>
          <button type="submit">수정</button>
        </td>
        <!-- <td>
          <button name="queryId" v-bind:value="queryString.id" v-on:click="deleteQuery($event)">삭제</button>
        </td>-->
      </tr>
    </table>
    <span>{{msg.queryString}}</span>
    <span>{{message}}</span>
  </form>
</template>
<script>
/* eslint-disable */

export default {
  created: function() {
    var queryId = this.$route.params.queryId;
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
      message: ""
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

        this.$http
          .post("/queryUpdate", this.queryString)
          .then(res => {
            console.log("update success!");
          })
          .catch(err => {
            console.error("update fali!");
          });
        this.$router.go(this.$router.push("/"));
      }
    },
  }
}
</script>
