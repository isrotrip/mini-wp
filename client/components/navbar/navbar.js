Vue.component('navbar', {
  props: ['leftnavbars', 'rightnavbars'],
  template: `
  <nav class="navbar navbar-expand-lg navbar navbar-dark my-bg-color">
    <ul id="navbar-left" class="navbar-nav mr-auto">
      <li v-for="data in leftnavbars" class="nav-item">
        <div v-bind:id="data.id" class="nav-click">
          <a class="nav-link" href="#" style="color:black; font-size: 20; font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif">
            <img v-bind:src="data.logo" alt="" style="height:50px">
            <i>{{data.name}}</i>
          </a>
        </div>
      </li>
    </ul>
    <ul id="navbar-right" class="navbar-nav ml-auto">
      <li v-for="data in rightnavbars" class="nav-item">
        <div v-bind:id="data.id" class="nav-click">
          <a class="nav-link" href="#" style="color:black; font-size: 20; font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif">
            <img v-bind:src="data.logo" alt="" style="height:50px">
            <i>{{data.name}}</i>
          </a>
        </div>
      </li>
      <li class="nav-item">
        <div class="nav-click">
          <a class="nav-link" style="color:black; font-size: 20; font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif" href="#" @click="logout">
            <img src="./components/assets/picture/logout.png" alt="" style="height:50px">
            <i>Log Out</i>
          </a>
        </div>
      </li>
    </ul>
  </nav>`,
  methods: {
    logout: function(){
      this.$emit('logout') 
    }
  }
})