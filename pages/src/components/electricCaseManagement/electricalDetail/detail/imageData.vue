<template>
	<div class="imgData">
		<ul class="uul">
			<li>
				<img src="../../../../assets/img/download.jpg"/>
				<div class="down">
					<div class="zhongjian">
						<img src="../../../../assets/img/aaa.png"/>
						<span class="xzzl">下载资料</span>
					</div>
					<Checkbox v-model="single"></Checkbox>
				</div>
			</li>
			<li>
				<img src="../../../../assets/img/download.jpg"/>
				<div class="down">
					<div class="zhongjian">
						<img src="../../../../assets/img/aaa.png"/>
						<span class="xzzl">下载资料</span>
					</div>
					<Checkbox v-model="single"></Checkbox>
				</div>
			</li>
			<li>
				<img src="../../../../assets/img/download.jpg"/>
				<div class="down">
					<div class="zhongjian">
						<img src="../../../../assets/img/aaa.png"/>
						<span class="xzzl">下载资料</span>
					</div>
					<Checkbox v-model="single"></Checkbox>
				</div>
			</li>
			<li>
				<img src="../../../../assets/img/download.jpg"/>
				<div class="down">
					<div class="zhongjian">
						<img src="../../../../assets/img/aaa.png"/>
						<span class="xzzl">下载资料</span>
					</div>
					<Checkbox v-model="single"></Checkbox>
				</div>
			</li>
			<li>
				<img src="../../../../assets/img/download.jpg"/>
				<div class="down">
					<div class="zhongjian">
						<img src="../../../../assets/img/aaa.png"/>
						<span class="xzzl">下载资料</span>
					</div>
					<Checkbox v-model="single"></Checkbox>
				</div>
			</li>
			<li>
				<img src="../../../../assets/img/download.jpg"/>
				<div class="down">
					<div class="zhongjian">
						<img src="../../../../assets/img/aaa.png"/>
						<span class="xzzl">下载资料</span>
					</div>
					<Checkbox v-model="single"></Checkbox>
				</div>
			</li>
		</ul>
		<ul class="uul">
			<li>
				<img src="../../../../assets/img/download.jpg"/>
				<div class="down">
					<div class="zhongjian">
						<img src="../../../../assets/img/aaa.png"/>
						<span class="xzzl">下载资料</span>
					</div>
					<Checkbox v-model="single"></Checkbox>
				</div>
			</li>
			<li>
				<img src="../../../../assets/img/download.jpg"/>
				<div class="down">
					<div class="zhongjian">
						<img src="../../../../assets/img/aaa.png"/>
						<span class="xzzl">下载资料</span>
					</div>
					<Checkbox v-model="single"></Checkbox>
				</div>
			</li>
			<li>
				<img src="../../../../assets/img/download.jpg"/>
				<div class="down">
					<div class="zhongjian">
						<img src="../../../../assets/img/aaa.png"/>
						<span class="xzzl">下载资料</span>
					</div>
					<Checkbox v-model="single"></Checkbox>
				</div>
			</li>
			<li>
				<img src="../../../../assets/img/download.jpg"/>
				<div class="down">
					<div class="zhongjian">
						<img src="../../../../assets/img/aaa.png"/>
						<span class="xzzl">下载资料</span>
					</div>
					<Checkbox v-model="single"></Checkbox>
				</div>
			</li>
			<li>
				<img src="../../../../assets/img/download.jpg"/>
				<div class="down">
					<div class="zhongjian">
						<img src="../../../../assets/img/aaa.png"/>
						<span class="xzzl">下载资料</span>
					</div>
					<Checkbox v-model="single"></Checkbox>
				</div>
			</li>
			<li>
				<img src="../../../../assets/img/download.jpg"/>
				<div class="down">
					<div class="zhongjian">
						<img src="../../../../assets/img/aaa.png"/>
						<span class="xzzl">下载资料</span>
					</div>
					<Checkbox v-model="single"></Checkbox>
				</div>
			</li>
		</ul>
		<div class="allchoice">
			<Checkbox v-model="single">批量下载</Checkbox>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
	      return{
	      	single:''
	      }
      }
	}
</script>

<style scoped lang="less">
	.imgData{
		ul {
			display:flex;
			width: 100%;
			justify-content: space-around;
			li{
				list-style: none;
				height: 190px;
				width: 190px;

				img{
					width: 100%;
				}
				.down{
					display: flex;
					justify-content:flex-end;
					padding-top: 10px;
					.zhongjian{
						width: 100%;
						display: flex;
						justify-content:center;
						
						img{
							width: 20px;
							height: 20px;
							display: block;
						}
						.xzzl{
							display: block;
							font-size: 14px;
						}
					}
					
				}
			}
		}
		.allchoice{
			display: flex;
			justify-content: flex-end;
		}
	}
</style>