<script setup>
import { useAuth } from '@/auth/auth'

const { user } = useAuth();

</script>

<template>
  <nav>
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
    </ul>
  </nav>
  <br>
  <router-view></router-view>
</template>