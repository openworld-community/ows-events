<script setup lang="ts">
const copy = (text: string) => {
	navigator.clipboard.writeText(text);
	alert('Ссылка скопирована в буфер обмена');
};
</script>

<template>
	<div class="donate-page">
		<h1>Поддержать проект</h1>
		<p>
			Привет! Мы сейчас работаем на энтузиазме и стараемся сделать наш сервис еще лучше. Если
			у вас есть желание поддержать нашу команду, вот ссылки для пожертвований. Будем очень
			благодарны за любую помощь!
		</p>
		<ul>
			<li class="donate-row">
				<h3>patreon</h3>
				<a href="https://patreon.com/afisha_peredelano">
					https://patreon.com/afisha_peredelano</a>
				<button
					aria-label="Копировать"
					@click="copy('https://patreon.com/afisha_peredelano')"
				>
					Копировать
					<CommonIcon
						name="copy"
						color="var(--color-accend-red-dark)"
					/>
				</button>
			</li>
			<li class="donate-row">
				<h3>bitcoin</h3>
				<p>bc1q0ksxwam6f5juq8aqnu2qm3tha6l9frvtrahrzs</p>
				<button
					aria-label="Копировать"
					@click="copy('bc1q0ksxwam6f5juq8aqnu2qm3tha6l9frvtrahrzs')"
				>
					Копировать
					<CommonIcon
						name="copy"
						color="var(--color-accend-red-dark)"
					/>
				</button>
			</li>

			<li class="donate-row">
				<h3>ethereum</h3>
				<p>0xF90Da940C822C824A5E3FF187D81020CCF2bA09f</p>
				<button
					aria-label="Копировать"
					@click="copy('0xF90Da940C822C824A5E3FF187D81020CCF2bA09f')"
				>
					Копировать
					<CommonIcon
						name="copy"
						color="var(--color-accend-red-dark)"
					/>
				</button>
			</li>

			<li class="donate-row">
				<h3>USDT ERC-20</h3>
				<p>0xF90Da940C822C824A5E3FF187D81020CCF2bA09f</p>
				<button
					aria-label="Копировать"
					@click="copy('0xF90Da940C822C824A5E3FF187D81020CCF2bA09f')"
				>
					Копировать
					<CommonIcon
						name="copy"
						color="var(--color-accend-red-dark)"
					/>
				</button>
			</li>

			<li class="donate-row">
				<h3>USDC ERC-20</h3>
				<p>0xF90Da940C822C824A5E3FF187D81020CCF2bA09f</p>
				<button
					aria-label="Копировать"
					@click="copy('0xF90Da940C822C824A5E3FF187D81020CCF2bA09f')"
				>
					Копировать
					<CommonIcon
						name="copy"
						color="var(--color-accend-red-dark)"
					/>
				</button>
			</li>
		</ul>
	</div>
</template>

<style lang="less" scoped>
.donate-page {
	display: flex;
	flex-direction: column;
	gap: 30px;
	padding-top: 20px;
	padding-bottom: 20px;
}

.donate-row {
	display: flex;
	flex-direction: column;
	gap: 10px;
	align-items: flex-start;
	flex-wrap: wrap;
	border-bottom: 1px solid gray;
	padding: 10px;
}

button {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 10px;
}
</style>
