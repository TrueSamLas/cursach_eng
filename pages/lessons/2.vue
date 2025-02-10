<template>
	<div class="lesson-container">
		<div class="lesson-container--info">
			<h2 v-html="question"></h2>
			<span v-html="info"></span>
		</div>

		<div v-if="!userAnswer" class="lesson-container--answer">
			<h3>Выберите ответ:</h3>
			
			<div class="lesson-container--answer--btns">
				<div
					v-for="answer in answers"
					class="lesson-container--answer--btns--btn"
					@click="selectAnswer(answer)">
					<span v-html="answer.text"></span>
				</div>
			</div>
		</div>

		<div v-else class="lesson-container--answer">
			<template v-if="userAnswer === rightAnswer">
				<h3>Правильно!</h3>
			</template>

			<template v-else>
				<h3>Попробуй ещё раз</h3>

				<div class="lesson-container--answer--btns">
					<div
						class="lesson-container--answer--btns--btn"
						@click="userAnswer = null">
						<span>Повторить</span>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
	const LESSON_ID = 2;

	export default {
		async setup()
		{
			const supabase = useSupabaseClient();
			const user = useSupabaseUser();

			const { data, error } = await supabase
				.from('demo')
				.select()
				.eq('lesson_id', LESSON_ID)
				.maybeSingle();

			if( !!error )
				console.error(error);

			const result = data?.results?.answerID ?? null;

			return {
				supabase,
				user,
				result,
			};
		},
		data()
		{
			return {
				question: 'Тренировка использования глаголов в Present Simple.',
				info: '<b>Задание:</b> Выбери правильную форму глагола: <br><br> <b>She ___ (to eat) breakfast every morning.</b>',
				answers: [
					{
						id: 1,
						text: 'eat',
					},
					{
						id: 2,
						text: 'eats',
					},
					{
						id: 3,
						text: 'eating',
					},
				],
				rightAnswer: 2,
				userAnswer: this.result,
			};
		},
		methods: {
			async selectAnswer(answer)
			{
				if( !!this.userAnswer )
					return;

				if( !this.result ){
					const { error } = await this.supabase
						.from('demo')
						.insert({
							lesson_id: LESSON_ID,
							results: {
								answerID: answer.id,
							},
						});

					if( !!error )
						console.error(error);
				}else{
					const { error } = await this.supabase
						.from('demo')
						.update({
							results: {
								answerID: answer.id,
							},
						})
						.eq('lesson_id', LESSON_ID);

					if( !!error )
						console.error(error);
				}

				this.result = this.userAnswer = answer.id;
			},
		},
		created()
		{
			if( !this.user )
				navigateTo('/login', { replace: true });
		},
	}
</script>

<style lang="scss" scoped>
	.lesson-container{
		padding: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 60px;
		width: 100%;
		min-height: 600px;
		background: linear-gradient(135deg, #FFA500, #FF8C00);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

		.lesson-container--info{
			padding: 30px;
			display: flex;
			flex-direction: column;
			gap: 20px;
			flex: 0 1 100%;
			background-color: rgba(255, 255, 255, 0.9);
			border-radius: 15px;
			box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

			h2{
				font-size: 25px;
				line-height: 1.3;
				color: #333;
			}

			span{
				font-size: 18px;
				color: #555;
			}
		}

		.lesson-container--answer{
			padding: 30px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			flex: 0 0 600px;
			background-color: rgba(255, 255, 255, 0.9);
			border-radius: 15px;
			box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

			h3{
				font-size: 25px;
				line-height: 1.3;
				color: #333;
				margin-bottom: 20px;
			}

			.lesson-container--answer--btns{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				gap: 20px;
				flex: 0 1 100%;
				width: 100%;

				.lesson-container--answer--btns--btn{
					display: flex;
					justify-content: center;
					align-items: center;
					width: 100%;
					flex: 0 0 60px;
					background-color: #FF8C00;
					border-radius: 15px;
					font-size: 18px;
					line-height: 1.3;
					color: white;
					cursor: pointer;
					transition: background-color 0.3s ease, transform 0.2s ease;

					&:hover{
						background-color: #FF7F50;
						transform: translateY(-2px);
					}

					&:active{
						transform: translateY(0);
					}
				}
			}
		}
	}
</style>