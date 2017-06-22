<template>
  <div id="ptr">
    <!-- Pull down arrow indicator -->
    <span class="genericon genericon-next"></span>
    <!-- CSS-based loading indicator -->
    <div class="loading">
      <span id="l1"></span>
      <span id="l2"></span>
      <span id="l3"></span>
    </div>
    <div id="content" class="col-12">
      <div v-if="hasResult" class="list-group">
            <li class="list-group-item" v-for="post in posts" :key="post.seq"  >
              <router-link :to="{name:'TalkDetail', params:{id:post.seq, page: currentPage}}">
                <div class="col-12 title" >
                  {{ post.title }} <span class="badge" v-if="isNew(post.date)">New</span>
                </div>
                <div class="col-12 writer">
                      <span class="col-2">{{ post.writer }}</span>
                      <span class="col-offset-1 date">{{post.date}}</span>
                </div>
              </router-link>
            </li>
            <nav class="pagingNav">
              <pagination size="md" :total-rows="totalRows" v-model="currentPage" :per-page="16" />
            </nav>
      </div>
    </div>
  </div>
</template>

<script>
//페이징 컴포넌트 삽입
import pagination from '@/components/pagination'
//pull to reflash 라이브러리 삽입
import wptr from '../lib/wptr.1.1'

//서버에 parameter 전송을 위한 라이브러리 삽입 
const qs = require('qs')
//날짜 계산을 위한 라이브러리 삽입 
const moment = require('moment')

export default {
  name: 'talk',
  //전달받는 파라메터 선언 
  prop:['page'],
  //컴포넌트에서 사용하는 데이터 정의
  data:function() {
    return {
      posts: [],
      currentPage: 1,
      totalRows : 0
    }
  },
  //라이프사이클 중 컴포넌트 객체가 생성될때 후킹 
  created: function(){
    
      if(this.$route.params.page != undefined) {
        this.currentPage = this.$route.params.page
      } 
      this.getPostList(this.currentPage)
  },
  //라이프사이클 중 Vue 객체가 마운트 될때 후킹
  mounted: function(){
    wptr.init( {
      loadingFunction: this.pullToReflashLoading
    } );
  },
  //컴포넌트 안에서 계산 로직 정의
  computed: {
    hasResult: function () {
      return this.posts.length > 0
    }
  },
  //컴포넌트 실행 함수 정의
  methods: {
    //게시글 목록 조회 함수
    getPostList: function (page) {
      this.$http.post(`${this.$baseURI}/sample/getTalkList.json`, qs.stringify({page:page}))
      .then(result => {
          this.totalRows = parseInt(result.data.payload.list[0].totalRows)
          this.posts = result.data.payload.list
          document.body.scrollTop = 0;
      })
    },
    //게시글에 new 뱃지 표시 판단함수
    isNew: function(date){
        let checkDay = moment(new Date(),'YYYY-MM-DD').diff(date, 'day')
        return (checkDay < 2) ? true : false
    },
    //pull to reflash 함수
    pullToReflashLoading: function(){
        return new Promise((resolve, reject) => {
          this.getPostList(this.currentPage)
          resolve()
        })
    }
  },
  //데이터 변화 추적 정의
  watch: {
    //현재페이지 데이터 값이 바뀌었을 경우 처리 정의
    currentPage: function(val, oldVal){
        this.getPostList(val)
    }
  },
  //자식 컴포넌트 정의
  components: {
    'pagination': pagination
  }
}
</script>
<style>
.title{
    font-size: 16px;

}
.writer{
    margin-bottom: 0;
    font-size: 14px;
    color: #d1d1d1;
}
.date{
    font-size: 12px;
    float: right;
}
a {
  text-decoration: none !important;
}
.pagingNav {
  text-align: center;
}


html, body {
	height: 100%;
}

body {
	background: #5f5f5f !important;
	margin: 0;
}

#ptr {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	color: #fff;
	z-index: 10;
	text-align: center;
	height: 50px;
}

#ptr .genericon {
	opacity: .6;
	font-size: 34px;
	width: auto;
	height: auto;
	transition: all .25s ease;
	-webkit-transform: rotate(90deg);
	transform: rotate(90deg);
	margin-top: 5px;
}
.ptr-refresh #ptr .genericon {
	-webkit-transform: rotate(270deg);
	transform: rotate(270deg);
}
.ptr-loading #ptr .genericon,
.ptr-reset #ptr .genericon {
	display: none;
}

.loading {
	display: inline-block;
	text-align: center;
	opacity: .4;
	margin: 12px 0 0 5px;
	display: none;
}
.ptr-loading .loading {
	display: block;
}

.loading span {
	display: inline-block;
	vertical-align: middle;
	width: 10px;
	height: 10px;
	margin-right: 3px;
	-webkit-transform: scale(0.3);
	transform: scale(0.3);
	border-radius: 50%;
	-webkit-animation: ptr-loading 0.4s infinite alternate;
	animation: ptr-loading 0.4s infinite alternate;
}

#l1 {
	-webkit-animation-delay: 0;
	animation-delay: 0;
}

#l2 {
	-webkit-animation-delay: 0.2s;
	animation-delay: 0.2s;
}

#l3 {
	-webkit-animation-delay: 0.4s;
	animation-delay: 0.4s;
}

@-webkit-keyframes ptr-loading {
	0% {
		-webkit-transform: translateY(0) scale(0.3);
		transform: translateY(0) scale(0.3);
		opacity: 0;
	}

	100% {
		-webkit-transform: scale(1);
		transform: scale(1);
		background-color: #fff;
		opacity: 1;
	}
}

@keyframes ptr-loading {
	0% {
		-webkit-transform: translateY(0) scale(0.3);
		transform: translateY(0) scale(0.3);
		opacity: 0;
	}

	100% {
		-webkit-transform: scale(1);
		transform: scale(1);
		background-color: #fff;
		opacity: 1;
	}
}

#content {
	background: #fff;
	min-height: 100%;
	z-index: 20;
  text-align: left;
	-webkit-backface-visibility: hidden;
	-webkit-perspective: 1000;
}

.ptr-loading #content, .ptr-reset #content,
.ptr-loading #ptr, .ptr-reset #ptr {
	transition: all .25s ease;
}

.ptr-reset #content {
	-webkit-transform: translate3d( 0, 0, 0 );
	transform: translate3d( 0, 0, 0 );
}

.ptr-loading #content {
	-webkit-transform: translate3d( 0, 50px, 0 );
	transform: translate3d( 0, 50px, 0 );
}
</style>
