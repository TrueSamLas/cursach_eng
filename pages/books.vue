<template>
	<div>
	  <h1>Книги на английском языке</h1>
	  <ul>
		<li v-for="book in books" :key="books.id">
		  <nuxt-link :to="`/books/${books.id}`">{{ books.title }}</nuxt-link>
		</li>
	  </ul>
	</div>
  </template>
  
  <script>
  export default {
	data() {
	  return {
		books: [
		  { id: 1, title: 'Книга 1: Гордость и предубеждение' },
		  { id: 2, title: 'Книга 2: Великий Гэтсби' },
		  { id: 3, title: 'Книга 3: Алиса в Стране чудес' },
		],
	  };
	},
  };
  </script>