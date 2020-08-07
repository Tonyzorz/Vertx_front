<template>
  <div>
    <ul>
      <li>아이디</li>
      <li>역할/권한</li>
      <li>인스턴스 아이디</li>
      <li>인스턴스 이름</li>
      <li>인스턴스 수</li>
      <li>인스턴스 내용</li>
      <li>인스턴스 워커 여부</li>
    </ul>
    <ul v-for="inst in instance" v-bind:key="[inst.id, inst.role, inst.role_instance_id]">
      <li>{{inst.id}}</li>
      <li>{{inst.role}}</li>
      <li>{{inst.role_instance_id}}</li>
      <li>{{inst.instance_nm}}</li>
      <li>{{inst.instance_cnt}}</li>
      <li>{{inst.instance_desc}}</li>
      <li>{{inst.worker_yn}}</li>
    </ul>
  </div>
</template>
<script>
/* eslint-disable */

export default {
  created: function() {
    var id = this.$route.params.id;
    var role = this.$route.params.role;
    var role_instance_id = this.$route.params.role_instance_id;

    this.$http.get(`/instancefind/${id}`).then(response => {
      console.log(JSON.stringify(response));
      this.instance = response.data;
    });
  },
  data: function() {
    return {
      instance: []
    };
  },
  methods: {
    edit() {
      this.$http
        .post("/instanceUpdate", this.instance)
        .then(res => {
          console.log("update success!");
        })
        .catch(err => {
          console.error("update fali!");
        });
      this.$router.push({ name: "instancelistpage" });
    }
  }
};
</script>
