<template>
	<div>
	  <div class="info_block">
			<div class="tiles">
				<div class="tile" style="background-image: url(/static/book1.jpg);">
					<h2>"Белая цапля и другие истории"</h2>
					<span>В рассказах автор описывает сельский быт пожилых женщин и их попытки жить с достоинством и безопасностью.</span>
				</div>
				<div class="tile" style="background-image: url(/static/book2.jpg);">
					<h2>"Триумф яйца"</h2>
					<span>В названии сборника используется метафора: яйцо представляет саму семью, и история фокусируется на триумфе персонажей.</span>
				</div>
				<div class="tile" style="background-image: url(/static/book3.jpg);">
					<h2>"Соловей и Роза"</h2>
					<span>Эта история рассказывает о напрасной жертве, которую соловей принёс, чтобы помочь студенту покорить сердце любимой.</span>
				</div>
			</div>
		</div>
	</div>	
</template>

<style scoped>
	.caption{
		text-align: center;
		padding: 50px;
	}

	h2, span{
		color: white;
	}

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
		box-shadow: inset 0 500px 0 0 rgba(0, 0, 0, 0.1), inset 0 -500px 0 0 rgba(0, 0, 0, 0.1);
		border-radius: 30px;
		background-repeat: no-repeat;
		background-size: 105% auto;
		background-position: center;
		background-color: black;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		gap: 40px;
		padding: 0 70px;
		transition: all 0.2s ease;
		text-shadow: 0 3px 9px rgb(117, 117, 117);
	}
	.tile:hover{
		background-size: 125% auto;
		gap: 100px;
		box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0.15), inset 0 0 0 0 rgba(0, 0, 0, 0.15);
	}
	.tile span{
		font-size: 24px;
		text-align: center;
	}
	h2 {
		font-size: 36px;
		text-align: center;
	}
</style>