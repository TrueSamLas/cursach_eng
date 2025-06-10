<template>
	<UCard
		:key="result.repeats_count"
		class="player rounded-none"
		:ui="{ body: 'flex justify-center items-center basis-full' }">
		<template #header>
			<div class="flex gap-4 justify-between items-center">
				<UButton
					icon="i-fa6-solid-arrow-left-long"
					color="neutral"
					variant="ghost"
					to="/lessons" />

				<UProgress
					class="w-xl"
					:model-value="result.is_finished ? 100 : result.current_task / lesson.tasks.length * 100" />

				<div class="p-4"></div>
			</div>
		</template>

		<UCard
			v-if="result.is_finished"
			class="player--card shadow-lg"
			:class="{
				'shadow-success': result.completed >= 100,
			}">
			<div class="flex flex-col gap-4 justify-center items-center">
				<h2 class="text-2xl">Урок пройден на {{ result.completed.toFixed(0) }}%</h2>

				<UButton
					v-if="currentTask.objective.canPlay"
					size="xl"
					variant="outline"
					@click="() => {
						result.repeats_count++;

						result.answers = [];
						result.completed = 0;
						result.current_task = 0;

						result.is_finished = false;

						initAnswer();
					}">
					<span>Пройти снова</span>
				</UButton>
			</div>
		</UCard>

		<UCard
			v-else-if="!!currentTask && !!currentAnswer"
			:key="result.current_task"
			class="player--card shadow-lg"
			:class="{
				'shadow-success': currentAnswer.isCorrect === true,
				'shadow-error': currentAnswer.isCorrect === false,
			}">
			<h2 class="text-2xl mb-4">{{ currentTask.question }}</h2>

			<div class="flex gap-4 justify-center items-start">
				<UButton
					v-if="currentTask.objective.canPlay"
					class="p-4 w-[70px] h-[70px]"
					size="xl"
					square
					@click="textToSpeech(currentTask.objective.text)">
					<UIcon
						class="m-auto text-3xl"
						name="i-fa6-solid-volume-high" />
				</UButton>

				<div
					v-if="currentTask.objective.canRead"
					class="player--objective">
					{{ currentTask.objective.text }}
				</div>
			</div>

			<USeparator class="py-4" />

			<div :class="{ 'pointer-events-none': currentAnswer.isCorrect === true }">
				<template v-if="currentTask.answer.type === 'single'">
					<div class="flex flex-col gap-2">
						<UButton
							v-for="(variant, i) in currentTask.answer.data.variants"
							class="block"
							size="xl"
							variant="soft"
							:color="currentAnswer.value === i ? 'primary' : 'neutral'"
							@click="() => {
								if( currentAnswer.isCorrect === true )
									return;

								currentAnswer.value = i;

								textToSpeech(variant);
							}">
							{{ variant }}
						</UButton>
					</div>
				</template>

				<template v-if="currentTask.answer.type === 'pieces'">
					<UCard
						variant="subtle"
						:ui="{ body: 'p-2! min-h-[48px]' }"
						@dragover.prevent
						@drop="() => {
							if( currentAnswer.value.includes(drag) || currentAnswer.isCorrect === true )
								return;

							currentAnswer.value.push(drag);
						}">
						<div class="flex flex-wrap gap-2 justify-start items-center">
							<UBadge
								v-for="(index, i) in currentAnswer.value"
								draggable="true"
								class="draggable-piece"
								size="xl"
								@dragstart="() => {
									if( currentAnswer.isCorrect === true )
										return;

									drag = index;
									
									win.setTimeout(() => {
										currentAnswer.value = currentAnswer.value
											.filter(p => p !== index);
									});
								}"
								@dragend="() => {
									drag = null;
									textToSpeech(currentTask.answer.data.pieces[index]);
								}"
								@click="textToSpeech(currentTask.answer.data.pieces[index])"
								@drop.stop="() => {
									if( currentAnswer.value.includes(drag) || currentAnswer.isCorrect === true )
										return;

									currentAnswer.value.splice(i, 0, drag);
								}">
								{{ currentTask.answer.data.pieces[index] }}
							</UBadge>
						</div>
					</UCard>

					<div class="p-4 mt-4 flex flex-wrap gap-2 justify-center items-center">
						<template v-for="(piece, i) in currentTask.answer.data.pieces">
							<UBadge
								v-if="!currentAnswer.value.includes(i)"
								draggable="true"
								class="draggable-piece"
								size="xl"
								@dragstart="drag = i"
								@dragend="() => {
									drag = null;
									textToSpeech(piece);
								}"
								@click="textToSpeech(piece)">
								{{ piece }}
							</UBadge>
						</template>
					</div>
				</template>

				<template v-if="currentTask.answer.type === 'speak'">
					<div class="flex gap-4 justify-center items-start">
						<UButton
							class="p-4 w-[70px] h-[70px]"
							size="xl"
							square
							@click="() => {
								if( currentAnswer.isCorrect === true )
									return;

								recognizeSpeech();
							}">
							<UIcon
								v-if="recognizingIndicator"
								class="m-auto text-3xl"
								name="i-svg-spinners-270-ring" />

							<UIcon
								v-else
								class="m-auto text-3xl"
								name="i-fa6-solid-microphone" />
						</UButton>
					</div>
				</template>
			</div>
		</UCard>

		<template #footer>
			<div class="flex gap-4 justify-between items-center">
				<UButton
					size="xl"
					color="neutral"
					variant="outline"
					@click="skipTask()">
					<span>Пропустить</span>
				</UButton>

				<UButton
					v-if="result.is_finished"
					size="xl"
					to="/lessons">
					<span>Завершить</span>
				</UButton>

				<UButton
					v-else-if="currentAnswer.isCorrect === true"
					size="xl"
					@click="nextTask()">
					<span>Далее</span>
				</UButton>

				<template v-else>
					<UButton
						v-if="currentTask.answer.type === 'single'"
						size="xl"
						color="neutral"
						variant="outline"
						:disabled="currentAnswer.value === null"
						@click="checkAnswer()">
						<span>Проверить</span>
					</UButton>

					<UButton
						v-if="currentTask.answer.type === 'pieces'"
						size="xl"
						color="neutral"
						variant="outline"
						:disabled="!currentAnswer.value.length"
						@click="checkAnswer()">
						<span>Проверить</span>
					</UButton>
				</template>
			</div>
		</template>
	</UCard>
</template>

<script setup>
	definePageMeta({
		middleware: ['auth-only'],
		layout: 'empty',
	})

	const route = useRoute()
	const supabase = useSupabaseClient()

	const sfxSuccess = useSound('/sfx/success.mp3')
	const sfxFail = useSound('/sfx/fail.mp3')

	const drag = ref(null)

	const { data: lesson } = await supabase
		.from('lessons')
		.select()
		.eq('id', Number(route.params.id))
		.single()

	const result = ref({
		lesson_id: lesson.id,
		is_finished: false,
		answers: [],
		repeats_count: 0,
		completed: 0,
		current_task: 0,
	})

	watch(
		() => result.value,
		async () => {
			await supabase
				.from('results')
				.update(result.value)
				.eq('lesson_id', lesson.id);
		},
		{ deep: true },
	)

	const loadResult = async () => {
		const { data, error } = await supabase
			.from('results')
			.select()
			.eq('lesson_id', lesson.id)
			.maybeSingle();

		if( error )
			alert(error);

		if( data )
			result.value = data;
		else
			await supabase
				.from('results')
				.insert(result.value)
	}

	await loadResult()

	const currentTask = computed(() => (
		lesson.tasks?.[
			result.value.current_task
		] ?? null
	))

	const currentAnswer = computed(() => (
		result.value.answers?.[
			result.value.current_task
		] ?? null
	))

	const initAnswer = () => {
		if( currentTask.value === null )
			return;

		if( currentAnswer.value === null ){
			let value = null;

			switch(currentTask.value.answer.type){
				case 'single':
					value = null;
					break;

				case 'pieces':
					value = [];
					break;

				case 'speak':
					value = '';
					break;
			}

			result.value.answers.push({
				value,
				mistakes: 0,
				isCorrect: null,
			});
		}
	}

	initAnswer()

	const checkAnswer = () => {
		if( currentAnswer.value.isCorrect )
			return;

		let isCorrect = false;

		switch(currentTask.value.answer.type){
			case 'single':
				isCorrect = ( currentAnswer.value.value === currentTask.value.answer.data.rightAnswer );
				break;

			case 'pieces':
				isCorrect = ( currentAnswer.value.value.join('') === currentTask.value.answer.data.rightAnswer.join('') );
				break;

			case 'speak':
				isCorrect = ( currentTask.value.answer.data.rightAnswer.map(a => a.toLowerCase()).includes(currentAnswer.value.value.toLowerCase()) );
				break;
		}

		currentAnswer.value.isCorrect = isCorrect;

		if( isCorrect ){
			sfxSuccess.play();
		}else{
			sfxFail.play();
			currentAnswer.value.mistakes++;
		}			
	}

	const nextTask = () => {
		if( currentAnswer.value.isCorrect && currentAnswer.value.mistakes === 0 )
			result.value.completed += 100 / lesson.tasks.length;

		if( result.value.current_task < lesson.tasks.length - 1 ){
			result.value.current_task++;
			initAnswer();
		}else{
			result.value.is_finished = true;
		}
	}

	const skipTask = () => {
		if( confirm('Вы уверены что хотите пропустить текущее задание?') )
			nextTask();
	}

	const ttsVoices = ref([])

	const updateVoices = () => {
		ttsVoices.value = speechSynthesis.getVoices();
		
		setTimeout(() => {
			if( !ttsVoices.value.length )
				updateVoices();
		});
	}

	const textToSpeech = text => {
		const ruVoice = ttsVoices.value.find(voice => voice.voiceURI === 'Google русский') || ttsVoices.value.find(voice => voice.lang === 'ru-RU');
		const enVoice = ttsVoices.value.find(voice => voice.voiceURI === 'Google US English') || ttsVoices.value.find(voice => voice.lang === 'en-US');

		speechSynthesis.cancel();

		const utterance = new SpeechSynthesisUtterance(text);

		utterance.voice = (
			!!text.toLowerCase().match(/[а-яё]/ig)
				? ruVoice
				: enVoice
		);

		speechSynthesis.speak(utterance);
	}

	let recognizer = null
	const recognizingIndicator = ref(false)

	const recognizeSpeech = () => {
		if( currentTask.value.answer.type !== 'speak' )
			return;

		if( recognizer === null ){
			const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
			
			recognizer = new SpeechRecognition();
			recognizer.continuous = false;
			recognizer.interimResults = false;

			recognizer.addEventListener('result', e => {
				currentAnswer.value.value = e.results[0][0].transcript;
			});

			recognizer.addEventListener('end', () => {
				if( recognizingIndicator.value )
					checkAnswer();

				recognizingIndicator.value = false;
			});
		}

		if( recognizingIndicator.value ){
			recognizer.stop();
			return;
		}

		recognizingIndicator.value = true;
		currentAnswer.value.value = '';

		recognizer.lang = currentTask.value.answer.data.lang;

		recognizer.start();
	}

	const win = computed(() => window)

	onMounted(() => {
		updateVoices();
	})
</script>

<style lang="scss" scoped>
	.player{
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 100vh;
		overflow: hidden;

		.player--card{
			flex: 0 0 100%;
			width: 100%;
			max-width: 600px;
			transition: all 0.3s ease;
			animation: slide-left 0.5s ease both;

			@keyframes slide-left{
				0%{
					transform: translateX(100%);
					opacity: 0;
				}

				100%{
					transform: none;
					opacity: 1;
				}
			}
		}

		.player--objective{
			padding: 10px 15px;
			display: flex;
			justify-content: center;
			align-items: center;
			min-height: 70px;
			border-radius: 0 15px 15px 15px;
			box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
		}

		.draggable-piece{
			user-select: none;
			cursor: grab;

			&:active{
				cursor: grabbing;
			}
		}
	}
</style>