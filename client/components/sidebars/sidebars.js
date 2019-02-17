Vue.component('side-bars',{
  props: ['sidebars'],
  template:`
  <div id="side-bar" class="sidebar sticky-left">
    <ul class="list-group flex-column d-inline-block menu">
      <li v-for="data in sidebars" v-if="!data.class" class="list-group-item py-2">
        <div v-bind:id="data.id">
          <a href="#">
            <span class="align-middle"><img v-bind:src="data.logo" alt="data.alt" height="50" class="mr-5">{{data.name}}</span>
          </a>
        </div>
      </li>
      <li v-else v-bind:class="data.class">
        <div v-bind:id="data.id">
          <a href="#">
            {{data.name}}
            <span class="align-middle"></span>
          </a>
        </div>
      </li>
    </ul>
  </div>`
})