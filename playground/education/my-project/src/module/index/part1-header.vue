<template>
	<div style="z-index:9999;position:relative">
		<!--第一部分注册账号header条-->
		<div id="header_container">
			<div id="header_inner">
				<!--左侧咨询-->
				<div id="header_inner_left">
					<a class="header-left-group" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2291908972&site=qq&menu=yes">
						<span class="icon icon1"></span>
						<span class="text">QQ咨询</span>
					</a>
					<span class="header-left-group">
						<span class="icon icon2"></span>
						<span class="text">咨询热线: 13588800203</span>
					</span>
				</div>
				<!--右侧注册登录-->
				<div id="header_inner_right">
					<div v-show="!user.name">
						<a href="./login.html#signup" class="btn">注册账号</a>
						<a href="./login.html#login" class="btn reverse">立即登录</a>
					</div>
					<div class="user-name-container" v-show="user.name"
					@mouseenter="logoutshow = true"
					@mouseleave="logoutshow = false">
						<a href="./user.html" class="user-name">{{user.name}}</a>
						<div class="log-out"
						v-show="logoutshow"
						@click="logout">退出登录</div>
					</div>
				</div>
			</div>
		</div>
		<!--第二部分真正的header条-->
		<div id="big_header_container">
			<div id="big_header_inner" @click="clickLogo">
				<!--左侧logo-->
				<span id="big_header_left">
					<div id="big_header_left_inner"></div>
				</span>
				<!--右侧三行按钮-->
				<div id="nav_collapse"
				@click="media.navActive = !media.navActive">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</div>
				<!--右侧navbar-->
				<span id="big_header_right"
				:class="{active:media.navActive}">
					<span class="nav"
					v-for="nav in navs"
					:class="{active:nav.active}"
					@click="clickNav(nav)">{{nav.name}}</span>
					<!--<router-link class="nav" to="/syllabus">教学大纲</router-link>-->
				</span>
			</div>
		</div>
	</div>
</template>
<script>
	import {scrollTo} from '../../assets/js/scrollTo.js';
	import Bus from '../../assets/js/bus.js';
	export default{
		name:'part1Header',
		data(){
			return{
				user:{
					type:0,
					name:''
				},
				logoutshow:false,
				navs:[{
					name:'首页',
					active:true,
					to:0
				},{
					name:'教学优势',
					active:false,
					to:700
				},{
					name:'名师风采',
					active:false,
					to:3274
				},{
					name:'关于我们',
					active:false,
					to:4122
				}],
				media:{
					navActive:false
				},
				count:0
			}
		},
		mounted(){
			this.$http.get('?name=education.sys.islogin').then((response)=>{
				if(response.body.code===1004) return;
				else {
					this.user.type = response.body.data.user_type;
					this.user.name = response.body.data.user_name;
				}
			});
			// console.log("%c 咦 被看到了！👀","color:#fa7373;font-family:'微软雅黑';font-size:20px");
			// console.log("%c 请把控制台拉到最长喔！↓↓↓👻👻","color:#fa7373;font-family:'微软雅黑';font-size:20px");
			// console.log("GGGDGDGGDGDDEDDGDGDGGGGGGGDGGGGDGGDGGDDGGGGGDDGGGDGGGGGGGDGDDfGLDDEEEDDDDDDDEDDDDEDEEEEEEEEEEEEEKEKK\nGGDGGGDGDGGGDGDGDGGGDGGDGGDGGGGGGGGGDDGGGGDGGGGDGGGGGDDDGDDL;;ii;iiijEDDDDDDDDDDDDEEEEEEEEEEEEEEEKKK\nGDDGGGGGDGGGEDGGDGGGGGDDDGGDDGDGGDGGDDDGGDGDGDGGGGGDt;;LEL,;;i;jfjiitiGEEEDDDDDDEDDEEEEEEEEEEEEEKEKE\nGGDDGGDGDDGDEDDDGDDDGDGGDGDDDGGGGGDGDDDGDGGGDDGGGGL,:::,;;;;iEEEEEEEti;iDKEDDDDEDDDEEDEEEEEEEEEKEEKK\nDGDDGDDGGGGGGGGDDDDGGDGDDDDDGDGGGGGDDGGGDGGGDDDDDD:,,;;,,;;KKEKEDEDEKEiti;,;EEDDDDEEEDEEEEEEEEEEEKKK\nGDDGGDGGDDGDDGGDGDGGGGGDDDDDDDGDDDGGDGGGDGDDEDj;,,::,,;,,,KEKfGDEEDEEEKDGj;iiLDDDDDDDDEEEDEEEEEEEEEK\nDDDDGDDDDGGGDDGGGGGGGGGDGDGDDGDGDDGDGDGGLDDDi,,::.:,,i,::KEEfEDEDEEEEEEEKKKDiiEEDDDDDDEEEEEEEEEKEEEE\nDDDGGDDGDDDGDGDGGGGGDDGDGEEDDEDDDEDGDDGDDGt;;,,GKEEt;fj,iiif.;.K,KEEKEEEEKKKKtiEDEDDEEDEEEEEEEEEEEEE\nGDDGGGGDGGGGDDGDGGGGGGDDG,,;,,,,iGDDDDDEEi;;;EEEEEED,j,GDftf,;fGGEEEEEEEEEKEKEttEDDDEEEEEEEEEEEEEEEK\nDDDGGDDGGGGGEDGGDGGGDDE,,;;,;,,;;,,DKj;,,;,LEEEDEDDEftDEtjj;iitGK,EEEEKEEKEEKKiiDDEEDEEEDEEEEEEEEEEE\nDDGDGGGGDGGGDGGGGGGGEj,;tEEKEEtj;;;;,,,,;tDEEEEEDEEE.,fKEjG;;ttfLEEEEEEEEKEEKKGttEEDDDEEEEEEEEEEEKEK\nDGDDDDDGDDDGDGDLGGGG;;,EKfEDEDLift,,;iEKKEEEEEEEDEEEEK;t,WDi,tjfGEDEKEEEEEDEDEKiiEDDEDDEEEEEEKEEEEEK\nDDDGGGGGGGGDDGGGGGDt,,EEDGfEGKittjt;KEDEEEKEEDDEDDDEEEiEEEEj;jfjjGEEEEEEKEDDEEEttEDEDDDEEEEEEEEEEEEK\nGGDGGDDGDGGDDGGGGGD,;jEGjE;,jKif;tEEEEEDEEEEDEDDDEDEEDDEG;Lf;itjjDLLDKKEEEDDEEKjtEEDDEDDEEEEEEEEEEKK\nGDDDGGDGDDDDDDDGGGi,,ELGEGfi,jffEDEEDDEEEEEEEEEDDDEEEDE:EGGL:itLjffffjjDWKGDDEKfiDDDDDDEDDEEEEEEEEEE\nGDGGDDGGGGDDDGGGLG,,tKDEDDii:f;GDDEDDDEEEEEEDDDDDDEEEE:EGjEEf,itLLjfLtt,:LEEEEKfiGDDDDDDEDEDEEEEEEEE\nGGDGGDGEGGGDDGGGGD,,LEEEGGfj,jKDEDDDDEEEEEDEEDDDGDDDDEDEGjEfGtDfjtttji;,.jKEEKKtiDDDDDDDDDEDDEEEEEEE\nGGGGGGDDGGGGGGLGG;,,GEEEDLjt;KDDDDDDDEDEEEEDEDGGGGDDDEEEEEEt;jfjD,i,,:,,LKjKKKKiiEDDDDDDDEEEDEEEEEEE\nGDGGDGDGDDGGDGGGi,,EKEEEDftiKDDDDGGGDDDDEEDDDGDGGGDDDDEDEE,LjjKfjj,,,fLDELEEEKfiiDDDDDDDDDDDDEDEEEEE\nDGGGGEDGGDDDDGGE,:GKEDffjjfEDDEEDGGGDDDEDEDEDDDDGDDDEDEEEKiEEKDiftjfLKKEDGED:Ki;GDDDDDDDEDDDEEEEEEEE\nDDDGGDDGGGGGGDG;,,KEEtjfjfLEEDDDDGGGDEDDEEEDDGGGGGDDEDEDEEDDtDEfjj;LEi;iEtDDEf;;EDDDDDDDDEEEEEEEEEKE\nDDDDGGGGGGGDGGE:;KK;ittjjjEEDDDDGGGGDDDDDDEDDDDDDEDEDEDEDEED;LGEjE;LftDjjGEKEi;GDDDDDDDEDDDEDEEEEEEE\nDGGGDGGGGGGGDDL,,Kt::;ttiKEDDEDDDGGDDDDDEDEDDDEEDDEEEDEEEEEDLKG;jKGtLtEDiKKE;;iDDGDDDDEEDDDDEDEEEEEE\nGGGDGDGGGDGGGDi;jEDji,::;EDEDDDDDGDDDDDDEEDDDEDEDDDEDEDEEEEEDDE,DEEijDKjjKGi;;EDDDDDDDDDDDDDDEEDEEEE\nGGDGGGDDGGGGGDi,E.DDiLGfKEDDDDDDDDDDDDDEKEDDEEEDDEEEEEEDEEEEEEKDEEEEt,;itL;;;EDDDDDDDDDDDDDDDEEEEEEE\nGDGGGGGGGDGGGD;;EEEjDEDGDEDEDDDDDDDEDDEfEEEfEDEDEDDDDEEEDDDEEEEEEEEEEjfjiKf;LDGGGGDDDDEEDDEEDEEEEDEE\nDGDLDGDDGGGGGGj,DEDLLLfGEDEDEDDDDDDDDE,,GEjjDDDfEDDEEEEEDEDEDDDEEEjjtEjjKKE;tDGDGDDDDDDDDDDEEDEEEEEE\nDGGDGGGGGGGGGGL,jKjLLffEEDEDDDDDEDDDEt,;;fGj;GDjtDEfEDDLDDDDKEDDEEtDjEtfEEE;;DGDDDDDDDDDDDDEEEEEEEEE\nGGDGGGGGGGGDGGD,;KEfffLEEEDDEEDEDDEDj,,;;;ijt;fDjiELGGtGtfijGEEDDEEit;GEEEEL;LDDGDDDDDDEDEDDDEEDEEEE\nGDGDGDDGGDGGGGD,,tEjjjtEDEDDDDEDDEjGi,;;;;;ii;;tjiiG;fD;,;ii;DEDEDEDEEDEEEEK;tDGDDDDDDDDDDDEDEEDDDDE\nGGGGGDGGDGGGGGGD::iEftGEEEDDEDDDED;i,;;,;;;;;;;,;;;,j;,i;;;;;,EEEEEEDDDDEEEK;;DGDDGDDDDDDDDDDDDDDEEE\nDGGDGGGGGGGGLGGD,,::;iEEDEDEDDDDGt,;;;,;,,,;;;,,,,,,,,,;,;;;;;,EEEEDDDDEDDEK;;GGDGDDDDDEDDEDDDDDDDEE\nGGGDDGGDGGGGGGGGD,,::,EEEEEDDGGtf;,;;,,,,,,,,,,,,,,,,,,,,,,,,;;fEEDEDDDDDDEKt;DDGDDDDDDDDDDDDDDDEDEE\nGGGGDGDDDGGGGGGGGGD;,;KEEDEDEiii;;,;,,,,,,,,,,,,,:::,,,,,,,,,,;,EEEDDDDDDDEKL;DGGGGDDDDDDDDDDDDDDEEE\nGGDDGDGGGGGGGLGGGGLG,;EEEDDDtj;;;;,,,,,,,,,,,:::::::::,,,,,,,,,,iKDDDDDEDDDKG;GDGGGDDDDGDDDDDDDDDDDD\nGGDDGDDGGDGGGDGGGLLG;;KEEELL;i;;,;,,,,,,,,,,:::::::::::,,,,,:,:,,GEEGEDDDDDED;GDDDGDDDDDDDDDDDDDDEEE\nGGGDGGDDDGGDGGGGGGDD;iDEDDtj;;;;;;,,,,,,,,,,::::::::::,::,,::,:,,,EDDDDEDDDDE;GDGGDDDDDDDDDDDDDDDDDE\nDGGGDDGGGGDGGGGGGLGG;;GEEEj;;;,;;,,:,,,,::::::::::::,;t;::::::,:,:DEDDEEDDDKDiLDGGDDDDDDDDDDDDDDDDDD\nDDDDDDGDDGDDGGGDGGGG,;tEEEL;;;,,,,::,:,,,,:,:::::,DG;;;;,,:::::,:,;EDEDEEDEED;LGGGDDGDDDDDDDDDDDDDDE\nDDDDDGDGGGGDDGGGGGGG,;;EEED;;;;,,,,:,:,:jf,,,,::fj;;;;;;,,::::,:,::EEDDEEEEKD;LDGDDDDDDDDDEDDDDDDDDD\nGGGGGDDGGDDGDGGDGGGGt;;EDEK,;;,,,,::,:::tL,:,,,jti;;;,,,,::::::::,,jDDDEKEEKjiGDGDDDDDDDDGDDDDDDEDDD\nDGDGDGGGGGGGGGGDDGGGD,;jEEK;;,;,:,:::::::,:,,;itii;,,,,,::,::::::,:,EEEE;;;ftiGDGGGDDDDDDDDDDDDDDDDE\nGGGGGDDGGDDDGGGDGGGGD;;;KEE;,;;iLEDG,,::,::,,;tii;,ii;;,:::::::::::,DDE;;,,,ttGDDDGGDDDDDDDDDDDDDDED\nGDGGDDGGGGGGGGGGGGGGGL;ijKKt,;j;iiiiji;,:,,,,itt;tLDDGfjt:::::::,,,;fDGi,,,;iijDDDGDDDDDDDDDDDDDDDDD\nDDDGGGGGGDGGGGGGGGGGGLi;;DEE,ii;;iiitti,::,,;ttiiGEKfE,LG;:::::::,,,;Et,,,;,;iiGGGDDDDDDDDDDDDDDDDDD\nDGDDDDGGGDDDGGGGGGGGGLf;;iEK,;;;;;;;itt;,::,;ttiLfEE;D:tt:::::::::,,,Ei,,,:,,itGGDDGDDDDDDDDDDDDDDED\nGDGDGDGGGGDDGGGGGGGGGGDt;;jK,,;,,tLLLiii,,::ittiL;LELGt;,,::::::::,,,Gi,,,:,;ijDGGDDDDDDDDDDDDEDDDDD\nGDGDDDDDGGGDDLDDGGGGGGGD,,,ti,,,LEDDfLfi;::,itiiLLfLj;;,,:::::::::,,,i;,,,,,;ijDDGDGDDDDDDDDDDDDDDDD\nDDGDGGGDGGGGD,GDGGDGGDGDE,,;;;,jEDE:D:Di;,:,itti;;itt,:::::::::::::,,,;,,,,,;ifDGGDGGDDDDDDDDDDDDDDE\nDGGGGGGGGGDDGLGGGGGGGGGGDK;i;,;GjtDEG:Gii,::iiii;,,,:::::::::::::::,,,i,,,,,;ifDGGGDDGDDDDDDDDDDDDDE\nDGGGDDDGDDDDGGDDGGDGGGGDGDEi;;;GfGGft;;ii,:,iii;,,,::::::::::::::::,,,i,,,,,iiGDGGGDDDDDGDDDDDDDDDDE\nDGGDDDDDDEDDGGDGGGGGGDDGGDEii;,,,iiii;;ii,,,iii;,::::::::::::::::::,,,,,,,,;iiDGDDGDDDDDGDDDDDDDDEDD\nGDGGDDDGGGGGGLDGGGGGGGDGDDDtt;,,,,,,,:,;i,:,;ii;:::::::::::::::::,,,,,,,,,:iijGDDDDDGDDDDDDDDDDDDDDD\nGDDGGGDGDGDGGGDGDDGGGGGGDDDtt;,,::,:,:,;;,::;ii;,::::::::::::::::,,,,,,,tj,;iLDGGGGDGDDDDDDDDDDDDDDD\nDDGGGGDGDDDGDGGDDGGDGDDGDDDLt,;,::::,,,;;,::,i;,,,,,,::::::::::::,,,,,,iLft;iGDDDDGDDDDDDDDDDDDDDDDD\nDGDDDDGDGDGDGGGDGDDGDDDGDDDDi;,,::::::,;;,,,;t;;;;,,,,,,,,,::::::,,,,,,;fft;iDDGGGGGDDDDDDDDDDDDDDDD\nDDDGDDDGDGGGDGDGDGDDDGGDGDDK,;,:,::::::;iiiitttiiiii;,,,,,,,::,,,,,,,,,ijj;iiDDGGGGGDGDDGDDDDDDDDDDD\nDDDGGDDDGDGDGDDDDGDDDDDDGDDE:t,,,::::::;iiitt;;;iitti;;;,,,,,,,,:,,,,,,ii;;itDDDGGGGDGDGDDDGDDDDDDDD\nDDDGDGDDGGGDGDDDDDDDDDDDDDD,ji:;,:::::,;;,;ii;;,iiittii;;;,,,,,,,,,,,,;iii;jDGGDGGGGDGGGDGDGDDDDDEDD\nDDDDGDDGGGGDDGGGGGGDDDDDDDD:Ei;;;,,:::,;;,,;;;i;;ittttiii;;;;,,,,,,,,,;iEEEDGGGDGGGGGGDDDDGDDDDDDDDD\nDDDDGDDGGGGGGDDGDDDGDGDDDDDEE;i;;,,:::;;;,ttjGLLLGGLitttii;;;,,,,,,,,;iiDDGGGGGGGLGDGGGDDGGDDDDDDDDD\nDDDDDGDDDDDGDDDDGDGDDDDDGDDDEii;;,,,,,,;;jLLLLLGLGG;iittiiii;;,,,,,,;iijEDDDGGDDDGGGDDDDDDGDDDDDDDDD\nDGDGDDGGDDGGGDGDGGGGDDDDGDDDED;i;;,,,,;;ijGGGGGGLLG;;;iii;;;;;;,;,,,tiiiGDDDGDGDDGDGGGDDGDDDDDDDDDDD\nDDGGDDGGDDGDDGDGDGDGDDDDDGDDDEi;;;;,,,;;itLLGGGLLLt:,,;ii;;;;;,,;;,iit,i;EDGGGGDGGGDDDGGGGDGGDDDDDDD\nDDGGDDGDDGGDGDDDGDDDDDDDDDDDDEE;;;;;;,;;;tiLffjfGL:::,,;;;;;;;,;;;tt;:fiiGDGGDGGGGGGDDDDGGGDGDDDDDDD\nGDDGGGDGGGGDDGDGDDEDGDDDDDDDDEEjt;;;;,;;;;,iLGLj;::,:,,;;;;;;;,;;tt;;tff;;DGDDGDDGGGGDDGGDDDGDDDDDDD\nDGDGGGDGGDDGGGGDDDDDDDDDDDDDE;,,,;;;;;;;;;::,:::::::::,;;;ii;;;;iti;jfff;,DDDDGDGGDGGGDDGGDDGDDDDDDE\nGGDDDGGDGDGDGGGGDDEDDDDEDGi;,,,,,;i;iii;;;,:::::::::,,,;;i;;;;ijt:,Lfftft;,GEDGDGGGDGGGDGGGDDDDDDDDD\nDGDDDGGGGGGDDDGDDDDDDDDEi,;;,;,,;iii;iiiii,::::::::,,;;;ii;iijt:.jGLftLL;,,,,tEEDGGDGGGDGGDGGDDDDDDD\nGDGGGGDGGGDDDDGDDDDDDDEt;,,;;;,;::iGGt,iti;,,,::,,,,,;;;;iift..iGfLjjLLffGf;,;;fDDDDDDDDDGGDDDDDDDDD\nGDDDDGGGGDDGGDGDDDDDEKi;;;,:::;i:::GfLt:itt;;;,,;;;;;;;iij;:.;t;LtLjffLfDGGtf;;,tEDGGDDGDGDDDDDGDDDD\nGDDDGDGDGDGGGDGGDDDDE;i;,i,,:::;;:::GfGG,:tii;;;;;;;;;;it;,LL;j,LtiLLfiLGLLjtjj,;;EDDGDDDDDDDDDDDDDD\nDDDGDDGGGGGGDDGDDDDD;;;,,:;i;,::i,::GfLLLj;itii;;;;iitjifDDjti::,,jfL;;fLLLttjjf;;;DGDDDGGDDGDDDDDDD\nDDDDGDDGDGGDGGGDDDEE;;i,,,,,i;,::i;;GGfjf;Litffjtjfjt;GjGjftLi;;tj;;:,;jLj;itjjjj;,;GDDDDDGDDDDDDDDD\nDDDDGGGDDDDDDDGDDDE;i;i;,::::;;,:i;,,tGj;;;Gttjjjjttt;ittjGij,j,;L:.:tiLLi,itjjjfj;;;DDDDDDDGDDDDDDD\nDDGGDDGDDDGDDGGDDEj;;;tii,,:::i;;ii,,:,jj;LfttttttiGfttDjfLtjjff,.:tiiiiititijjttjj;;;EDDDDDDDDDDDDD\nDDDGGDGGDGDDDDGDDE;i;;;;;i;;.:,i;;i;,,:;LjffDtiiitLLj,:ijDGDG;: .ttttii:iiitijjjt,ff;;iDDDDDDDDDDDDD\nDGDDGDDGDGDDDDDDEK;;;;;;;;ii,,,t;i;,,,:.itfGDj;tijLL;,LfjLj,:.:ttttttitiiiiijjjjji:fj,;fDDDDDDDDDDDD\nGDGGGGGGGGGDDDDDDK;;;;,,,,;;i;;it;,,,,,::itjLjtfijDDjtji,,:,tjttttttt,:::::::,itjji:jj;;EDDDDDDDDDED\nGDGGDDGDDDGDDDDDEK,,;,,;,,;;i,,;,,::,::::,titfjDtjttti;,tjjtjtttttt,:::,,;;;,:::ijj::jt;iEDGDDDDDDDD\nGDDGDGGGGDDDDDDDEW,;;;ij;,;;;i;,:::::::::.f,tLDDfi,jLLfjtttttttttj,:,;;;;;iiii;::,tf:if;iLDDDGDDDDDD\nGGGDGGGGGDGDDDDEEK,;i,i;ii;;i;,::::::.::::t:ftfGttjLLfjjjttttttjj::,,;tfGLGji;ii;.,ti.jj;iEDDDDDDDDD\nGGDDGDDDDDDGDEEDEK,,;;i;;ii;;,,:::::::::::;:Lff;tifLLfjjt:ttttjjt:,iGLGGLLLGLLf;ii::j:.f;;fDDDDDDDDD\nDDDGDDDGDDDDDDEDED,,;;i,;,;;;,,,,::::.::::,;LfLLttfLLffiti;tttff,;GLLLGLLLLLLLLGiit::j.ij;iEDDDDDDDD\nDDDDGDDDGGDDEEEEfi,,;;i,,,,;;;,,,::::::::,.j;;t;;;,tGf:tiKi;tfLjiGLLLLLLLLLLLLLLLitt:;,:jiifEDDDDDDD\nDEDGGDDGGDEDDEEL,,,,t;i;,;,;;,,,:,:.:::::i.jittjfjj;;jttfLi,;iLiGGLGLLLLLLGLLLGLLLit;:j.ij;iEDDDDDDD\nDDGDGDDDG:,:K::::,jW G#KKKKK;,K.W ;:::,,,,:ii..Gjji# KtftitiitLL  GLLLLLLLW KLLLLLLijLLLfDfiDDDDDDED\nGDDGGGDGG:: f:: ::WW GW     ;;: # DGGGji   L    tjt,       fjjLL  LLLLEtttt tjjjW:        :ijDDDEDDD\nDEDDGDDDK  .K    :#   G DL, ;# i:      Ljt K E# L;# ... ...fEDEE  EEEDE         #:      ; ,;iEEDDDDD\nDDDGDDDDWf  G :; :GGi W ED, G. L tW W :D # # E. KE  WKL WWKtt         LWWW# KWWKL:      ; :iifEDEDDE\nDDDGGDDD      L  :jK.iW     j  G;GW KLEK   # E  #jEf       jGjjj  tttiLK       iG:    . i ,j;,EDDDDD\nDDDDDDDE## f  L  ,L  .if . W:E D# K ; jiG :# ,;,,G,j KL #WWGjDGD  .LLLLW#######WL.        ,j;;DEDDED\nDDDDDEDED# DG f  ,#. LW: . ;,t Di W # #:L  #ffft #j, ji fffDLfD  : WLLLE       #L.    .KW ,:j;iEEDDE\nDGDDEDEDi# WfK. GWDD Wj .  iEt D :K W ;W , .   D #         iGD. DK  WLLK LWWWK WG. tt .,f#D:L,;KDDDE\nDDDDDEE;E; KE .# jED W  #.  Dj DWDj EiWG GWEEEEt ;iij;f KDDDK  ,LGK  ifE ;jjjj #LDGLL  KKi ;j;,GEEDD\nDDDDDEE;E ,fW,K;LtjD W E;E  Kj DiK .ji,GEjtttt. ,,,;,.f EGGGK.GLfjtW KtD.      #GLGLLt    ;,:j,iDDDE\nDDDDDELitLfiij;,;i,,tift,;tLffGfi;j;t;fjt,;tjtGL;,,i::KKGLGGGDfffLfLEfGfWEtjGKWKGGGLL;GDEDtj.L;,EDDD\nDDDEEK;iLLLL,it;,;;;;;;;f,tfjitDiiiii;;i,;;:jjj;;;,j.tGGGLGLjjfLfGGLLLGGjfjjGLLGLGGGL;i;ijjj:j;;GEDD\nGDDDED;iLLLLL:f,,,;;;;;;;;;;;LGGG;;;;;;;tL,:tjt;,;i;.GGGLGGffffGGLi;,;tjGGfjtjGGGGGLf;;tjjjj;:j;iDED")
		},
		methods:{
			//点击nav
			clickNav(nav){
				this.navs.forEach((e)=>{
					e.active = false;
				})
				nav.active = true;
				//如果是小窗口须折叠起来
				this.media.navActive = false;
				scrollTo(nav.to,0);
			},
			logout(){
				this.$http.get('?name=education.sys.login.out').then((response)=>{
						localStorage.removeItem('user');
						this.user.type = 0;
						this.user.name = '';
				})
			},
			// 点击logo
			clickLogo(){
				this.count++;
				if(this.count === 10) {
					let n = Math.random();
					if(n<=.2) Bus.$emit('easterEgg1');
					else if(n<=.45) Bus.$emit('easterEgg2');
					else if(n<=.6) Bus.$emit('easterEgg3');
					else if(n<=.8) Bus.$emit('easterEgg4');
					else Bus.$emit('easterEgg5');
				}
			}
		},
		watch:{
			navActive(val){
				this.navs.forEach((e)=>{
					e.active = false;
				})
				return this.navs[val].active = true;
			}
		},
		props:['navActive']
	}
</script>
<style scoped lang='less'>
	@baseColor: #55b7f8;
	/*第一部分注册账号header条*/
	#header_container{
		width: 100%;
		height: 60px;
		border-bottom: 1px solid #dadada;
		padding-top: .1px;
		#header_inner{
			max-width: 1240px;
			width: 100%;
			margin:15px auto 0 auto;
			padding: 0 40px;
			#header_inner_left{
				float: left;
				.header-left-group{
					span{
						vertical-align: middle;
					}
					.icon{
						display: inline-block;
						width: 35px;
						height: 35px;
						margin-right:10px;
						background-size: 100% 100%;
						border-radius: 100%;
						&.icon1{
							background: url(../../assets/img/index/Share_qq.png) center no-repeat;
						}
						&.icon2{
							background: url(../../assets/img/index/Share_phone.png) center no-repeat;
						}
					}
					.text{
						font-size: 16px;
						color: #8a8a8a;
						margin-right: 36px;
					}
				}
			}
			#header_inner_right{
				float: right;
				.btn{
					font-size: 16px;
					display: inline-block;
					width: 110px;
					height: 30px;
					line-height: 30px;
					&.reverse{
						margin-left: 40px;
					}
				}
				.user-name-container{
					position: relative;
					margin-top: 10px;
					height: 50px;
					.user-name{
						color: @baseColor;
						font-size: 14px;
						cursor: pointer;
					}
					.log-out{
						color: @baseColor;
						font-size: 14px;
						border:1px solid @baseColor;
						border-radius: 4px;
						padding: 0 2px;
						text-align: center;
						position: absolute;
						width: 70px;
						display: inline-block;
						top: 25px;
						left: 50%;
						margin-left: -35px;
						background: #fff;
						cursor: pointer;
						&:after{
							content:'';
							width:0;
							height:0;
							border:7px solid transparent;
							border-bottom-color: @baseColor;
							position: absolute;
							top: -14px;
							left: 25px;
						}
						&:before{
							content:'';
							width:0;
							height:0;
							border:6px solid transparent;
							border-bottom-color: #fff;
							position: absolute;
							top: -12px;
							left: 26px;
							z-index: 3;
						}
					}
				}
			}
		}
	}
	/*第二部分导航栏大header*/
	#big_header_container{
		width: 100%;
		padding-top: .1px;
		position: relative;
		#big_header_inner{
			max-width: 1240px;
			width: 100%;
			height: 50px;
			margin: 22px auto;
			padding: 0 40px;
			#big_header_left{
				width: 248px;
				height: 50px;
				float: left;
				#big_header_left_inner{
					width: 100%;
					height: 100%;
					background: url(../../assets/img/index/logo.png) center no-repeat;
					transform-origin: left top;
				}
				&.easterEgg1-1 #big_header_left_inner{
					transform: rotate(30deg);
					transition: transform .7s;
				}
				&.easterEgg1-2{
					transform: translate3d(0,1000px,0);
					transition: transform .5s cubic-bezier(.49,.23,.93,.49);
				}
			}
			#big_header_right{
				height: 50px;
				line-height: 50px;
				display: flex;
				float: right;
				justify-content:flex-end;
				.nav{
					font-size: 18px;
					font-weight: bolder;
					color: #5c5c5c;
					padding: 5px 10px;
					border-bottom: 2px solid transparent;
					margin-left: 30px;
					cursor: pointer;
					line-height: 38px;
					&.active{
						color: @baseColor;
						border-bottom-color: @baseColor;
					}
				}
			}
			/*折叠区*/
			#nav_collapse{
				float: right;
				width: 35px;
				height: 35px;
				text-align: center;
				padding-top:4px;
				cursor: pointer;
				border-radius: 2px;
				margin-top: 10px;
				display: none;
				.icon-bar{
					width: 20px;
					height: 3px;
					background: @baseColor;
					margin-top:5px;
					display: inline-block;
				}
			}
		}
	}
	@media screen and (max-width: 1020px){
		/*qq咨询的字样*/
		#header_container #header_inner #header_inner_left .header-left-group .text{
			display: none;
		}
		/*navbar*/
		#big_header_container #big_header_inner #big_header_right{
			    position: absolute;
			    top: 80px;
			    left: 0;
			    width: 100%;
			    background: #fff;
			    z-index: 10;
			    height: auto;
			    padding: 0 40px;
			    display: none;
		}
		#big_header_container #big_header_inner #big_header_right.active{
			display: block;
		}
		#big_header_container #big_header_inner #big_header_right .nav{
			   	float: none;
			   	display: block;
			   	width: 100%;
			    margin: 0 auto;
    			border-bottom: 1px solid #eee;
    			font-size: 18px;
		}
		#big_header_container #big_header_inner #nav_collapse{
			display: block;
		}
	}
</style>