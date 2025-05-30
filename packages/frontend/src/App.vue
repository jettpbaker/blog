<script setup>
import { ref } from 'vue';
const data = ref('No data yet');
const fetchData = async () => {
	const response = await fetch('/api/ping');
	data.value = await response.json();
};
</script>

<template>
	<h1>Hello World</h1>
	<button @click="fetchData">Fetch Data</button>
	<p>{{ data }}</p>
</template>

<style scoped></style>
