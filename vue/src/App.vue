<script setup>

const user = localStorage.getItem('user');

</script>

<template>
  <nav class="navbar">
    <ul>
      <li v-if="user == null">
        <router-link to="/login">Login</router-link>
      </li>
      <li v-if="user == null">
        <router-link to="/register">Register</router-link>
      </li>
      <li v-if="user !== null">
        <router-link to="/logout">Logout</router-link>
      </li>
      <li v-if="user !== null">
        <router-link to="/">Home</router-link>
      </li>
      <li v-if="user !== null">
        <router-link to="/create">Create Product</router-link>
      </li>
      <li v-if="user !== null">
        <router-link to="/products">Products</router-link>
      </li>
    </ul>
  </nav>
  <br>
  <router-view></router-view>
</template>

<style scoped>
.navbar {
  background-color: #f8f9fa;
  padding: 10px;
}

.navbar ul {
  display: flex;
  gap: 15px;
}

.navbar li {
  list-style: none;
}

.navbar a {
  text-decoration: none;
  color: #007bff;
}

.navbar a:hover {
  text-decoration: none;
  color: #0056b3;
}
</style>