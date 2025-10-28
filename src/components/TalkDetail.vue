<template>
  <div id="talkDetail">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">{{ post.title }}</h3>
      </div>
      <div class="panel-body" v-html="replaceBr(post.body)"></div>
      <div class="panel-footer">
        <div class="pannel-footer-txt">
          작성자 : {{ post.writer }}, 작성일 : {{ post.date }}
        </div>
      </div>
    </div>
    <div class="list-group">
      <a
        href="javascript://"
        class="list-group-item"
        v-for="(cmt, index) in post.commemts"
        :key="cmt.date + '-' + index"
      >
        <h4 class="list-group-item-heading">
          {{ cmt.writer }} <span class="cmtDate">{{ cmt.date }}</span>
        </h4>
        <p class="list-group-item-text cmtBody" v-html="cmt.comment"></p>
      </a>
    </div>
    <div class="btn-list-bottom-box">
      <router-link :to="{ name: 'Talk', params: { page: page } }">
        <button type="button" class="btn btn-default">목록</button>
      </router-link>
    </div>
  </div>
</template>
<script>
const qs = require("qs");
export default {
  name: "talkDetail",
  props: ["id", "page"],
  data: function () {
    return {
      post: {},
      seq: this.id,
    };
  },
  created: function () {
    this.getPost(this.seq);
  },
  mounted: function () {
    $("#bs-example-navbar-collapse-1").collapse("hide");
  },
  methods: {
    getPost: function (seq) {
      this.$http
        .post(
          `${this.$baseURI}/sample/getTalkDetail.json`,
          qs.stringify({ seq: seq })
        )
        .then((result) => (this.post = result.data.payload.post));
    },
    replaceBr: (text) => {
      return text == undefined ? "" : text.replace(/\n/gi, "<br>");
    },
  },
};
</script>
<style>
#talkDetail {
  max-width: 100%;
  background: #fff;
  position: relative;
  top: 0px;
  left: 0;
  width: 100%;
  z-index: 10;
}
.btn-list {
  float: right;
  position: relative;
  top: -5px;
  left: 5px;
}
.btn-list-bottom-box {
  padding: 0px 0px 10px 0px;
  text-align: center;
  width: 100%;
}
.cmtWriter {
  width: 128px;
  min-width: 128px;
  max-width: 128px;
  font-size: 0.9rem;
  text-align: center;
}
.cmtDate {
  width: 128px;
  min-width: 128px;
  max-width: 128px;
  font-size: 0.7rem;
}
.cmtBody {
  font-size: 1.4rem;
  padding: 5px 5px 5px 5px;
}
.pannel-footer-txt {
  display: inline-flex;
}
</style>
