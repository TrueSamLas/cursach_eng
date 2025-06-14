<template>
	<div class="layout">
		<header>
			<img src="/static/logo.png" alt="">
			<nav>
				<nuxt-link to="/" class="header-link">Главная</nuxt-link>
				<nuxt-link to="/demo" class="header-link">Демо</nuxt-link>
				<nuxt-link to="/books" class="header-link">Книги на английском</nuxt-link>
			</nav>
			<div class="signup-in" v-if="isLoggedIn">
				<nuxt-link to="/lessons" class="signup">Мои уроки</nuxt-link>
				<nuxt-link to="/logout" class="signin">Выход</nuxt-link>
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
						<li><nuxt-link to="/" class="footer-link">Главная</nuxt-link></li>
						<li><nuxt-link to="/demo" class="footer-link">Демо</nuxt-link></li>
						<li><nuxt-link to="/books" class="footer-link">Книги на английском</nuxt-link></li>
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
.layout {
  height: 100svh;
  overflow-x: hidden;
}

header {
  background: #FFD7BB;
  padding: 10px;
  text-align: center;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
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
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	gap: 27px;
}
.signup, .signin {
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
	transition: background-color 0.3s ease;
}
.signin:hover, .signup:hover{
	background: #C66900;
}
header nav{
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	gap: 20px;
	font-weight: 500;
	font-size: 24px;
}

footer {
  padding: 20px;
  background: #846956;
  height: 500px;
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
  align-items: space-between;
  gap: 20px;
}

.footer-link{
	color: white;
	text-decoration: none;
}
footer span{
	font-weight: 400;
	font-size: 24px;
}
.info_footer {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	gap: 20px;
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
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	gap: 20px;
}
.social_medias .media {
	cursor: pointer;
}

</style>