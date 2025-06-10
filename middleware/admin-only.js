export default defineNuxtRouteMiddleware(async (to, from) => {
	const supabase = useSupabaseClient();
	const user = useSupabaseUser();

	const { data, error } = await supabase
		.from('admins')
		.select()
		.eq('user_id', user?.value?.id)
		.maybeSingle();

	if( !user.value || !data?.id )
		return navigateTo('/', { replace: true });
})