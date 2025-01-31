<template></template>

<script>
	export default {
		setup() {
			definePageMeta({
				layout: 'empty'
			})
			const supabase = useSupabaseClient()
			return {
				supabase,
			}
		},
		methods: {
			async logout() {
				const { error } = await this.supabase.auth.signOut()

				navigateTo('/login')
			}
		},
		mounted() {
			this.logout()
		}
	}
</script>