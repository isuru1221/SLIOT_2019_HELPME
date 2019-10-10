<template>
    <v-content>
<!--      <Dashboard />-->
        <Login/>
    </v-content>
</template>

<script>

import HelloWorld from "./components/HelloWorld";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

export default {
  name: "App",
  components: {
    HelloWorld,
    Dashboard,
    Login
  },
  data: () => ({
    //
  })
};
</script>
