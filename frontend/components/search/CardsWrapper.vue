<template>
	<div class="card-wrapper">
		<slot />
	</div>
</template>
<style lang="less" scoped>
.card-wrapper {
	position: relative;
	padding-top: 32px;
	@media (min-width: 768px) {
		padding-top: 60px;
	}
}
</style>
