<template>
	<div class="banner">
		<div class="banner_text">
			<h1>СЛОВАРЬ</h1>
			<span class="textspan">Индивидуальный словарь с играми и тренировками <br>
			для запоминания слов и выражений</span>
		</div>
		<div class="banner_btns">
			<nuxt-link to="/demo" class="lessons">Попробовать</nuxt-link>
			<div class="btn-access">Приобрести доступ</div>
		</div>
	</div>

	<div class="info_block">
		<div class="tiles">
			<div class="tile" style="background-image: url(/static/info1.png);">
				<h2>Тренировка слов</h2>
				<span>Повторения слов на короткий промежуток времени </span>
			</div>
			<div class="tile" style="background-image: url(/static/info2.png);">
				<h2>Коллекция слов</h2>
				<span>Списки слов для изучения</span>
			</div>
			<div class="tile" style="background-image: url(/static/info3.png);">
				<h2>Экзамен</h2>
				<span>Проверка знаний на каждой из тем</span>
			</div>
		</div>
	</div>
  </template>
  
  <script>
  export default {
	head() {
	  return {
		title: 'Тренажёр английского языка',
	  };
	},
  };
  </script>

  <style scoped>
	.tiles{
		padding: 100px 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 100px;
	}
	.tile{
		width: 450px;
		height: 450px;
		aspect-ratio: 1/1;
		box-shadow: inset 0 450px 0 0 rgba(0, 0, 0, 0.15), inset 0 -450px 0 0 rgba(0, 0, 0, 0.15);
		border-radius: 30px;
		background-repeat: no-repeat;
		background-size: 100% auto;
		background-position: center;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		gap: 87px;
		padding: 0 70px;
		transition: all 0.2s ease;
		text-shadow: 0 3px 9px rgb(0, 0, 0);
	}
	.tile:hover{
		background-size: 120% auto;
		gap: 228px;
		box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0.15), inset 0 0 0 0 rgba(0, 0, 0, 0.15);
	}
	.tile span{
		font-size: 24px;
		text-align: center;
	}

	h1, h2, h3, span{
		color: white;
	}
	h2 {
		font-size: 36px;
		text-align: center;
	}

	.banner {
		background-image: url(/static/banner.png);
		min-height: 380px;
		box-shadow: inset 0 0 0 10000px rgba(0, 0, 0, 0.3);
		display: flex;
		flex-wrap: wrap;
		padding: 30px;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
	}
	.banner_text {
		font-weight: 400;
		font-size: 30px;
	}
	h1{
		font-weight: 400;
		font-size: 48px;
	}
	.banner_btns{
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 13px;
	}
	.lessons, .btn-access {
		padding-top: 17px;
		text-decoration: none;
		color: white;
		background-color: #FF8800;
		border-radius: 20px;
		font-size: 24px;
		width: 300px;
		height: 65px;
		text-align: center;
		cursor: pointer;
		transition: background-color 0.3s ease;
}
	.lessons {
		border-radius: 20px;
		width: 300px;
		height: 65px;
		background: #FF8800;
		font-weight: 400;
		font-size: 24px;
		text-align: center;
		color: #fff;
		padding-top: 17px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}
	.lessons:hover, .btn-access:hover {
		background: #C66900;
	}
  </style>