<template>
	<div class="imgData">
		<div v-if='imageData.length != 0'>
			<div v-if='ImgData.length != 0'>
				<viewer :images="ImgData" class='ImgBox'>
					<span v-for="src in ImgData" :key="src">
						<img :src="src">
					</span>
				</viewer>
			</div>
			<div class='FileBox'>
				<!-- PDF 文档 -->
				<span v-for='span in fileData.PdfData' :key='span.index' class='FileBox_child'>
					<a :href="span.Url" target="_blank">
						<img src="static/pdf/pdf.png" alt="">
					</a>
					<span class='Name'>{{span.Name}}</span>
				</span>
				<!-- DOC 文档 -->
				<span v-for='span in fileData.DocData' :key='span.index' class='FileBox_child'>
					<a :href="span.Url" target="_blank">
						<img src="static/pdf/doc.png" alt="">
					</a>
					<span class='Name'>{{span.Name}}</span>
				</span>
				<!-- XLS 文档 -->
				<span v-for='span in fileData.XlsData' :key='span.index' class='FileBox_child'>
					<a :href="span.Url" target="_blank">
						<img src="static/pdf/xls.png" alt="">
					</a>
					<span class='Name'>{{span.Name}}</span>
				</span>
				<!-- RAR 文档 -->
				<span v-for='span in fileData.RarData' :key='span.index' class='FileBox_child'>
					<a :href="span.Url" target="_blank">
						<img src="static/pdf/file.png" alt="">
					</a>
					<span class='Name'>{{span.Name}}</span>
				</span>
				<!-- Mp4 -->
				<span v-for='Mp4 in Mp4Data' :key='Mp4Data.index' class='FileBox_child'>
					<video controls="controls">
						<source :src="Mp4.Url">
					</video>
					<!-- <span class='Mp4_Name'>{{Mp4.Name}}</span> -->
				</span>
			</div>
		</div>
		<div v-else style='text-align: center;padding:10px;'>
			没有影像资料
		</div>
	</div>
</template>

<script>
	export default{
		props: ['imageData'],
		data(){
		      return{
		      	single:'',
		      	ImgData:[],
						fileData:{
							PdfData:[], // Pdf格式的文件
							DocData: [], // doc 格式的文件
							XlsData: [], // xls 格式的文件
							RarData:[],// rar 格式的文件
						},
						Mp4Data:[],//
						
		      }
	    },
	    watch:{
	    	imageData(e,r){
	    		if(e){
						this.ImgData=[];
						this.fileData.PdfData=[];
						this.fileData.DocData=[];
						this.fileData.XlsData=[];
						this.fileData.RarData=[];
						this.PdfData=[];
						this.Mp4Data=[];
						for(let i=0;i<e.length;i++){
							if(e[i].fileUrl.indexOf('.pdf') != '-1'){
								this.fileData.PdfData.push({
									Url:e[i].fileUrl,
									Name: e[i].fileName
								})
							}else if(e[i].fileUrl.indexOf('.xls') != '-1' || e[i].fileUrl.indexOf('.xlsx') != '-1'){
								this.fileData.XlsData.push({
									Url:e[i].fileUrl,
									Name: e[i].fileName
								})
							}else if(e[i].fileUrl.indexOf('.doc') != '-1' || e[i].fileUrl.indexOf('.docx') != '-1'){
								this.fileData.DocData.push({
									Url:e[i].fileUrl,
									Name: e[i].fileName
								})
							}else if(e[i].fileUrl.indexOf('.mp4') != '-1'){
								this.Mp4Data.push({
									Url:e[i].fileUrl,
									Name:e[i].fileName
								})
							}else if(e[i].fileUrl.indexOf('.jpg') != '-1' || e[i].fileUrl.indexOf('.png') != '-1' || e[i].fileUrl.indexOf('.JPG') != '-1'){
								this.ImgData.push(e[i].fileUrl)
							}else {
								this.fileData.RarData.push({
									Url:e[i].fileUrl,
									Name: e[i].fileName
								})
							}
						}
	    		}
	    	}
	    },
			mounted(){
				if(this.imageData.length != 0){
					// console.log(this.imageData)
// 					else if(e[i].fileUrl.indexOf('.rar') != '-1'){
// 						this.fileData.RarData.push({
// 							Url:e[i].fileUrl,
// 							Name: e[i].fileName
// 						})
// 					}
				}
			}
	}
</script>

<style scoped lang="less">
	.imgData{
		.ImgBox{
			display: inline-block;
			img{
				width:150px;height:110px;margin:5px;padding:0;
			}
		}
		.FileBox{
			display:inline-block;height:120px;
			.FileBox_child{
				display: inline-block;
				heigth:120px !import;
				margin:5px;position:relative;width:148px;border:1px solid #dcdcdc;
				a{
					width:150px;height:120px;
					display: inline-block;
					img{
						 width:100%;height:100%;display: inline-block;
					}
				}
				.Name{
					position:absolute;left:15px;bottom:5px;
				}
				.Mp4_Name{
					position:absolute;left:30%;bottom:5px;
				}
				video{
					height:120px;width:148px;
				}
			}
		}
	}
</style>
