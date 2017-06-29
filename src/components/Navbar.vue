<<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" 
                    class="navbar-toggle collapsed" 
                    data-toggle="collapse" 
                    data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
                <a class="navbar-brand" href="#">Demo</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav ">
                    <li v-if="navi.child.length > 0" class="dropdown" v-for="navi in naviList">
                        <a href="#" 
                            class="dropdown-toggle" 
                            data-toggle="dropdown" 
                            role="button" 
                            aria-expanded="false">
                            {{ navi.name }}
                            <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu" role="menu">
                            <li v-for="sub in navi.child"><router-link :to="sub.to">{{sub.name}}</router-link></li>
                        </ul>
                    </li>
                    <li v-else><router-link :to="navi.to">{{navi.name}}</router-link></li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container-fluid -->
    </nav>  
</template>
<<script>
export default {
  name: 'navibar',
  data: function() {
      return {
          naviList : [
              { to: '', name: 'Taeyo', 
                child:[
                    {to: {name:'Talk'}, name: 'TalkTalk' }
                ] 
              },
              { to: {name: 'Todos'}, name: 'Todos', child:[] }
          ]
      }
  }
}
</script>
<style>
.navbar{
    margin-bottom: 0;
}
</style>
