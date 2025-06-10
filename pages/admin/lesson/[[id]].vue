<template>
	<div class="p-5">
		<h2 class="text-2xl mb-3">{{ $route.params.id ? 'Редактирование урока' : 'Создание урока' }}</h2>

		<UFormField class="mb-3" label="Название">
			<UInput
				class="block"
				placeholder="Введите название урока"
				v-model="form.title" />
		</UFormField>

		<UFormField class="mb-3" label="Порядковый номер">
			<UInput
				class="block"
				placeholder="Введите порядковый номер"
				v-model="form.index_number" />
		</UFormField>

		<UFormField class="mb-3" label="Описание">
			<UTextarea
				class="block"
				placeholder="Введите описание урока"
				v-model="form.description" />
		</UFormField>

		<UFormField class="mb-3" label="Задания">
			<UCard v-for="(task, i) in form.tasks">
				<template #header>
					<div class="flex justify-between items-center">
						<span>Задание №{{ i + 1 }}</span>

						<UButton
							icon="i-fa6-solid-xmark"
							color="error"
							@click="form.tasks.splice(i, 1)" />
					</div>
				</template>

				<div class="flex items-stretch">
					<div class="basis-full">
						<UFormField class="mb-3" label="Вопрос">
							<UInput
								class="block"
								placeholder="Введите вопрос"
								v-model="task.question" />
						</UFormField>

						<UFormField class="mb-3" label="Целевое слово/фраза">
							<UInput
								class="block"
								placeholder="Введите слово/фразу"
								v-model="task.objective.text" />
						</UFormField>

						<USwitch
							class="mb-3"
							color="success"
							v-model="task.objective.canRead">
							<template #label>
								<div class="flex items-center">
									<UIcon name="i-fa6-solid-eye" class="mr-2" />
									<span>Может ли пользователь прочитать слово/фразу?</span>
								</div>
							</template>
						</USwitch>

						<USwitch
							class="mb-3"
							color="success"
							v-model="task.objective.canPlay">
							<template #label>
								<div class="flex items-center">
									<UIcon name="i-fa6-solid-volume-high" class="mr-2" />
									<span>Может ли пользователь прослушать слово/фразу?</span>
								</div>
							</template>
						</USwitch>
					</div>
					
					<div>
						<USeparator orientation="vertical" class="mx-3" />
					</div>

					<div class="basis-full">
						<UFormField class="mb-3" label="Тип ответа">
							<USelect
								class="block"
								:items="[
									{
										label: 'Выбор одного варианта (по кнопке)',
										value: 'single',
									},
									{
										label: 'Сборка ответа из кусочков',
										value: 'pieces',
									},
									{
										label: 'Ответ с использование микрофона',
										value: 'speak',
									},
								]"
								v-model="task.answer.type"
								@update:model-value="() => {
									switch(task.answer.type){
										case 'single':
											task.answer.data = {
												variants: [''],
												rightAnswer: 0,
											};
											break;

										case 'pieces':
											task.answer.data = {
												pieces: [''],
												rightAnswer: [],
											};
											break;

										case 'speak':
											task.answer.data = {
												lang: 'ru-RU',
												rightAnswer: [''],
											};
											break;
									}
								}" />
						</UFormField>

						<template v-if="task.answer.type === 'single'">
							<UFormField class="mb-3" label="Варианты ответа">
								<div
									v-for="(variant, j) in task.answer.data.variants"
									class="flex items-center mb-1">
									<UInput
										class="block mr-1"
										:placeholder="`Вариант №${ j + 1 }`"
										v-model="task.answer.data.variants[j]" />

									<UButton
										v-if="j === 0"
										icon="i-fa6-solid-plus"
										color="success"
										@click="task.answer.data.variants.push('')" />

									<UButton
										v-else
										icon="i-fa6-solid-xmark"
										color="error"
										@click="task.answer.data.variants.splice(j, 1)" />
								</div>
							</UFormField>

							<UFormField class="mb-3" label="Правильный ответ">
								<USelect
									class="block"
									:items="
										task.answer.data.variants
											.map((label, value) => ({ label, value }))
									"
									v-model="task.answer.data.rightAnswer" />
							</UFormField>
						</template>

						<template v-if="task.answer.type === 'pieces'">
							<UFormField class="mb-3" label="Кусочки">
								<div
									v-for="(piece, j) in task.answer.data.pieces"
									class="flex items-center mb-1">
									<UInput
										class="block mr-1"
										:placeholder="`Кусочек №${ j + 1 }`"
										v-model="task.answer.data.pieces[j]" />

									<UButton
										v-if="j === 0"
										icon="i-fa6-solid-plus"
										color="success"
										@click="task.answer.data.pieces.push('')" />

									<UButton
										v-else
										icon="i-fa6-solid-xmark"
										color="error"
										@click="task.answer.data.pieces.splice(j, 1)" />
								</div>
							</UFormField>

							<UFormField class="mb-3" label="Правильный ответ">
								<div class="flex flex-wrap items-start">
									<UButtonGroup
										v-for="(rightPiece, j) in task.answer.data.rightAnswer"
										class="mr-1 mb-1">
										<USelect
											:items="
												task.answer.data.pieces
													.map((label, value) => ({
														label,
														value,
														disabled: task.answer.data.rightAnswer.includes(value),
													}))
											"
											v-model="task.answer.data.rightAnswer[j]" />

										<UButton
											icon="i-fa6-solid-xmark"
											color="error"
											@click="task.answer.data.rightAnswer.splice(j, 1)" />
									</UButtonGroup>

									<UButton
										v-if="task.answer.data.rightAnswer.length < task.answer.data.pieces.length"
										icon="i-fa6-solid-plus"
										color="success"
										@click="
											task.answer.data.rightAnswer.push(
												task.answer.data.pieces
													.map((label, value) => value)
													.filter(value => !task.answer.data.rightAnswer.includes(value))[0]
											)
										" />
								</div>
							</UFormField>
						</template>

						<template v-if="task.answer.type === 'speak'">
							<UFormField class="mb-3" label="Язык ответа">
								<USelect
									class="block"
									:items="[
										{
											label: 'Русский',
											value: 'ru-RU',
										},
										{
											label: 'Английский',
											value: 'en-US',
										},
									]"
									v-model="task.answer.data.lang" />
							</UFormField>

							<UFormField class="mb-3" label="Правильные ответы">
								<div
									v-for="(rightAnswer, j) in task.answer.data.rightAnswer"
									class="flex items-center mb-1">
									<UInput
										class="block mr-1"
										:placeholder="`Ответ №${ j + 1 }`"
										v-model="task.answer.data.rightAnswer[j]" />

									<UButton
										v-if="j === 0"
										icon="i-fa6-solid-plus"
										color="success"
										@click="task.answer.data.rightAnswer.push('')" />

									<UButton
										v-else
										icon="i-fa6-solid-xmark"
										color="error"
										@click="task.answer.data.rightAnswer.splice(j, 1)" />
								</div>
							</UFormField>
						</template>
					</div>
				</div>
			</UCard>

			<UButton
				class="mt-2"
				icon="i-fa6-solid-plus"
				color="success"
				@click="form.tasks.push({
					question: '',
					objective: {
						text: '',
						canRead: true,
						canPlay: true,
					},
					answer: {
						type: 'single',
						data: {
							variants: [''],
							rightAnswer: 0,
						},
					},
				})">
				<span>Добавить задание</span>
			</UButton>
		</UFormField>

		<USeparator class="my-2" />

		<div class="flex gap-2 justify-end">
			<UButton
				@click="save()">
				<span>Сохранить</span>
			</UButton>

			<UButton
				color="neutral"
				to="/admin">
				<span>Отмена</span>
			</UButton>
		</div>
	</div>
</template>

<script setup>
	definePageMeta({
		alias: '/admin/lesson/new',
	})

	const route = useRoute()
	const supabase = useSupabaseClient()

	const form = ref({
		title: '',
		index_number: 1,
		description: '',
		tasks: [],
	})

	const isNew = computed(() => !route.params.id)

	const loadLesson = async () => {
		if( isNew.value )
			return;

		const { data, error } = await supabase
			.from('lessons')
			.select()
			.eq('id', Number(route.params.id))
			.maybeSingle();

		if( error )
			alert(error);

		form.value = data;

		return data;
	}

	await loadLesson()

	const save = async () => {
		if( isNew.value ){
			const { error } = await supabase
				.from('lessons')
				.insert(form.value);

			if( error )
				alert(error);
		}else{
			const { error } = await supabase
				.from('lessons')
				.update(form.value)
				.eq('id', Number(route.params.id));

			if( error )
				alert(error);
		}

		await navigateTo('/admin');
	}
</script>