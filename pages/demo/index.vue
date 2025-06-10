<template>
	<div class="lesson-container">
	  <h1>Демо-уроки английского языка</h1>
	  <ul>
		<li v-for="lesson in lessons" :key="lesson.id">
		  <nuxt-link :to="`/demo/${lesson.id}`" class="lesson-link">{{ lesson.title }}</nuxt-link>
		</li>
	  </ul>
	</div>
  </template>
  
  <script>
  export default {
	data() {
	  return {
		lessons: [
		  { id: 1, title: 'Демо 1: Основы' },
		  { id: 2, title: 'Демо 2: Глаголы' },
		  { id: 3, title: 'Демо 3: Словарный запас' },
		],
	  };
	},
  };
  </script>
  
  <style scoped>
  .lesson-container {
	padding: 100px;
	background-color: #ffffff; /* Белый фон для строгого вида */
	border-radius: 8px;
	max-width: 800px;
	margin: 120px auto;
	box-shadow: 0 10px 16px rgba(0, 0, 0, 0.1); /* Легкая тень для контейнера */
  }
  
  h1 {
	text-align: center;
	font-size: 32px;
	margin-bottom: 20px;
  }
  
  ul {
	list-style-type: none;
	padding: 0;
  }
  
  li {
	margin: 10px 0;
	padding: 15px;
	background-color: #f8f8f8; /* Светло-серый фон для элементов списка */
	border-radius: 4px;
	transition: background-color 0.3s ease;
  }
  
  li:hover {
	background-color: #e0e0e0; /* Темно-серый фон при наведении */
  }
  
  .lesson-link {
	color: #FF8800; /* Оранжевый цвет для ссылок */
	text-decoration: none;
	font-size: 24px;
	font-weight: 500;
	display: block;
	transition: color 0.3s ease;
  }
  
  .lesson-link:hover {
	color: #cc6d00; /* Темно-оранжевый цвет при наведении */
  }
  </style>