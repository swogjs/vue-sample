<template>
  <div id="talk" class="col-12">
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
</template>

<script>
import pagination from '@/components/pagination'

const qs = require('qs')
const moment = require('moment')

export default {
  name: 'talk',
  prop:['page'],
  data:function() {
    return {
      posts: [],
      currentPage: 1,
      totalRows : 0
    }
  },
  created: function(){
    
      if(this.$route.params.page != undefined) {
        this.currentPage = this.$route.params.page
      } 
      this.getPostList(this.currentPage)
  },
  computed: {
    hasResult: function () {
      return this.posts.length > 0
    }
  },
  methods: {
    getPostList: function (page) {
      this.$http.post(`${this.$baseURI}/sample/getTalkList.json`, qs.stringify({page:page}))
      .then(result => {
          this.totalRows = parseInt(result.data.payload.list[0].totalRows)
          this.posts = result.data.payload.list
          document.body.scrollTop = 0;
      })
    },
    isNew: function(date){
        let checkDay = moment(new Date(),'YYYY-MM-DD').diff(date, 'day')
        return (checkDay < 2) ? true : false
    }
  },
  watch: {
    currentPage: function(val, oldVal){
        this.getPostList(val)
    }
  },
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
</style>
