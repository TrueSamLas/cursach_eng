<template>
	<div class="form-container">
	  <h1 class="form-title">Регистрация</h1>
	  <input type="email" v-model="email" placeholder="Email" class="form-input" />
	  <input type="password" v-model="password" placeholder="Пароль" class="form-input" />
	  <button type="button" @click="register" class="form-button">Зарегистрироваться</button>
	</div>
  </template>

<script>
	export default {
		setup() {
			const supabase = useSupabaseClient()
			return {
				supabase,
			}
		},
		data() {
			return {
				email: "",
				password: "",
			}
		},
		methods: {
			async register() {
				const { data, error } = await this.supabase.auth.signUp({
					email: this.email,
					password: this.password,
				})

				if (error) return alert(error)
				navigateTo('/login')
			}
		} 
	}
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.form-button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-button:hover {
  background-color: #0056b3;
}
</style>