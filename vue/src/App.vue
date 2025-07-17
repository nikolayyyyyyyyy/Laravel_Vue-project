<script setup>

const data = JSON.parse(localStorage.getItem('user'));
</script>

<template>
  <nav>
    <ul>
      <li v-if="!data">
        <router-link to="/login">Login</router-link>
      </li>
      <li v-if="data">
        <router-link to="/logout">Logout</router-link>
      </li>
      <li>
        <router-link to="/">Home</router-link>
      </li>
    </ul>
  </nav>
  <br>
  <router-view></router-view>
</template>