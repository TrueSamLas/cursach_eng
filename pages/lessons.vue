<template>
	<div class="lesson-container">
	  <h1>Уроки английского языка</h1>
	  <ul>
		<li v-for="(lesson, i) in lessons" :key="lesson.id">
		  <nuxt-link :to="`/lesson/${lesson.id}`" class="lesson-link flex justify-between items-center">
			<span>Урок {{ lesson.index_number }}: {{ lesson.title }}</span>

			<template v-for="result in [ results.find(r => r.lesson_id === lesson.id) ?? null ]">
				<span v-if="!result">Не пройдено</span>
				<span v-else-if="!!result && result.is_finished">{{ result.completed.toFixed(0) }}%</span>
				<span v-else>В процессе</span>
			</template>
		  </nuxt-link>
		</li>
	  </ul>
	</div>
</template>
  
<script setup>
	definePageMeta({
		middleware: ['auth-only'],
	})

	const supabase = useSupabaseClient()

	const { data: lessons } = await supabase
		.from('lessons')
		.select()
		.order('index_number', { ascending: true });

	const { data: results } = await supabase
		.from('results')
		.select();
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
	transition: color 0.3s ease;
  }
  
  .lesson-link:hover {
	color: #cc6d00; /* Темно-оранжевый цвет при наведении */
  }
</style>