<template>
	<div>
	  <h1>Уроки английского языка</h1>
	  <ul>
		<li v-for="lesson in lessons" :key="lesson.id">
		  <nuxt-link :to="`/lessons/${lesson.id}`">{{ lesson.title }}</nuxt-link>
		</li>
	  </ul>
	</div>
  </template>
  
  <script>
  export default {
	data() {
	  return {
		lessons: [
		  { id: 1, title: 'Урок 1: Основы' },
		  { id: 2, title: 'Урок 2: Глаголы' },
		  { id: 3, title: 'Урок 3: Словарный запас' },
		],
	  };
	},
  };
  </script>