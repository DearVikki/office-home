<template>
	<div id="header-container">
        <div class="search-container">
            <input id="search" name="" placeholder="超级会员日 等你来" type="text"/>
            <label></label>
        </div>
    </div>
</template>

<style scoped lang='less'>
	#header-container {
    width: 100%;
    height: 1.173rem;
    background: #fb4a4a;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    .search-container {
        width: 100%;
        height: .8rem;
        text-align: center;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        #search,#searchAll {
            width: 90%;
            height: .8rem;
            border-radius: 6px;
            border: none;
            font-size: 24px;
            padding: .06rem .33rem;
            vertical-align: middle;
        }
        label {
            display: inline-block;
            font-size: 30px;
            vertical-align: middle;
            color: #fbfbfb;
            margin-left: .27rem;
            vertical-align: middle;
        }
    }
}
</style>