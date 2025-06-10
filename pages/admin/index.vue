<template>
	<div class="p-5">
		<h1 class="text-3xl">Панель администрирования</h1>

		<hr class="my-2">

		<h2 class="text-2xl">Уроки</h2>

		<UTable
			:data="lessons"
			:columns="[
				{
					accessorKey: 'id',
					header: 'ID',
				},
				{
					accessorKey: 'index_number',
					header: 'Номер',
				},
				{
					accessorKey: 'title',
					header: 'Название',
				},
				{
					id: 'actions',
					meta: {
						class: {
							th: 'w-px',
							td: 'text-right',
						},
					},
				},
			]">
			<template #actions-header>
				<UButton
					icon="i-fa6-solid-plus"
					to="/admin/lesson/new">
					<span>Добавить</span>
				</UButton>
			</template>

			<template #actions-cell="{ row }">
				<UDropdownMenu
					:items="createDropdownMenu(row)">
					<UButton
						icon="i-lucide-ellipsis-vertical"
						color="neutral"
						variant="ghost"
					/>
				</UDropdownMenu>
			</template>
		</UTable>
	</div>
</template>

<script setup>
	definePageMeta({
		middleware: ['admin-only'],
	})

	const supabase = useSupabaseClient()

	const lessons = ref([])

	const loadLessons = async () => {
		const { data, error } = await supabase
			.from('lessons')
			.select()
			.order('index_number', { ascending: true });

		if( error )
			alert(error);

		lessons.value = data;

		return data;
	}

	await loadLessons()

	const createDropdownMenu = row => ([
		{
			label: 'Изменить',
			icon: 'i-fa6-solid-pen-to-square',
			onSelect: async () => {
				await navigateTo(`/admin/lesson/${ row.original.id }`);
			},
		},
		{
			label: 'Удалить',
			icon: 'i-fa6-solid-trash-can',
			color: 'error',
			onSelect: async () => {
				if( !confirm(`Вы уверены что хотите удалить урок "${ row.original.title }"?`) )
					return;

				await supabase
					.from('lessons')
					.delete()
					.eq('id', row.original.id);

				await loadLessons();
			},
		},
	])
</script>