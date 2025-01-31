<template>
	<div class="layout">
		<header>
			<img src="/static/logo.png" alt="">
			<nav>
				<nuxt-link to="/" class="header-link">Главная</nuxt-link>
				<nuxt-link to="/lessons" class="header-link">Задания</nuxt-link>
				<nuxt-link to="/books" class="header-link">Книги на английском</nuxt-link>
			</nav>
			<div class="signup-in" v-if="isLoggedIn">
				<nuxt-link to="/logout" class="signup">Выход</nuxt-link>
			</div>
			<div class="signup-in" v-else>
				<nuxt-link to="/register" class="signup">Регистрация</nuxt-link>
				<nuxt-link to="/login" class="signin">Войти</nuxt-link>
			</div>
		</header>
		<div class="body">
			<slot></slot>
		</div>
		<footer>
			<span>© 2024-2025 ALPHABET/АЛФАВИТ</span>
			<div class="info_footer">
				<nav>
					<ul>
						<li>Главная</li>
						<li>Задания</li>
						<li>Книги на английском</li>
					</ul>
				</nav>
				<div class="social_medias">
					<div class="media">
						<img src="/static/tg.png" alt="">
					</div>
					<div class="media">
						<img src="/static/fb.png" alt="">
					</div>
					<div class="media">
						<img src="/static/vk.png" alt="">
					</div>
				</div>
			</div>
		</footer>
	</div>
</template>

<script>
	export default {
		setup() {
			const user = useSupabaseUser()
			
			return {
				user,
			}
		},
		computed: {
			isLoggedIn() {
				return !!this.user;
			}
		},
	}
</script>

<style scoped>
*{
	padding: 0;
	box-sizing: border-box;
	margin: 0;
	font-family: Arial, Helvetica, sans-serif;
}

header {
  background: #FFD7BB;
  padding: 10px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.header-link {
  margin: 0 15px;
  text-decoration: none;
  color: black;
}
.signup-in {
	display: flex;
	gap: 27px;
}
.signup {
	border-radius: 20px;
	width: 300px;
	height: 65px;
	background: #FF8800;
	font-weight: 400;
	font-size: 24px;
	text-align: center;
	color: #fff;
	text-decoration: none;
	padding-top: 17px;
}
.signin {
	border-radius: 20px;
	width: 300px;
	height: 65px;
	background: #FF8800;
	font-weight: 400;
	font-size: 24px;
	text-align: center;
	color: #fff;
	text-decoration: none;
	padding-top: 17px;
}
.signin:hover, .signup:hover{
	background: #C66900;
}
header nav{
	display: flex;
	gap: 96px;
	font-weight: 500;
	font-size: 24px;
}

footer {
  padding: 20px;
  background: #846956;
  height: 500px;
  color: #fff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
footer span{
	font-weight: 400;
	font-size: 24px;
}
.info_footer {
	display: flex;
	gap: 898px;
}
.info_footer nav ul {
	list-style-type: none;
	font-weight: 400;
	font-size: 24px;
}
.info_footer nav ul li {
	cursor: pointer;
}
.social_medias{
	display: flex;
	gap: 83px;
}
.social_medias .media {
	cursor: pointer;
}

</style>