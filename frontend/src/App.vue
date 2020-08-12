<template>
  <div id="app">
    <ul class="mainapp">
      <li class="mainlist">
        <router-link :to="{name: 'querylistpage'}">쿼리</router-link>
      </li>
      <li class="mainlist">
        <router-link :to="{name: 'propertylistpage'}">프로퍼티</router-link>
      </li>
      <li class="mainlist">
        <router-link :to="{name: 'instancelistpage'}">인스턴스</router-link>
      </li>
    </ul>
    <router-view />
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/* Style the header with a grey background and some padding */
.header {
  overflow: hidden;
  background-color: #f1f1f1;
  padding: 20px 10px;
}

/* Style the header links */
.header .header-right div {
  float: left;
  color: black;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  font-size: 18px;
  line-height: 25px;
  border-radius: 4px;
}

/* Style the logo link (notice that we set the same value of line-height and font-size to prevent the header to increase when the font gets bigger */
.header .header-right div.logo {
  font-size: 25px;
  font-weight: bold;
}

/* Change the background color on mouse-over */
.header .header-right div:hover {
  background-color: #ddd;
  color: black;
}

/* Style the active/current link*/
.header .header-right div.active {
  background-color: dodgerblue;
  color: white;
}

/* Float the link section to the right */
.header-right {
  float: right;
}

ul.mainapp {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

ul.mainapp li {
  float: left;
}

ul.mainapp li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
ul.mainapp li a:hover {
  background-color: #111;
}

ul.mainapp li a:hover:not(.active) {
  background-color: #111;
}
ul.mainapp .active {
  background-color: #4caf50;
}
</style>
