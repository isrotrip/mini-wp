Vue.component('list-content', {
  props: ['articles'],
  data(){
    return {
      deleteCheckerWarning: '',
      editOrUpdateId: ''
    }
  },
  template: `
  <ul>
    <li style="list-style-type:none">
      <div v-for="data in articles" :id="data._id" class="row flex-container card">       
        <div class="card-body">
          <div v-if="deleteCheckerWarning == true && data._id == editOrUpdateId">
            <p class="text-danger">
              Are You Sure Want To Delete This Post?
            </p>
          </div>
          <div class="row">
            <div class="p-2 align-self-center">
              <h5 class="card-title">{{data.title}}</h5>
              <p class="card-text" style="font-size:12px">{{data.createdat}}</p>
              <p class="card-text" style="font-size:12px">{{data.tags.join(' ')}}</p>
            </div>

            <div class="p-2 align-self-center">
              <p class="card-text" v-html="data.text"></p>
            </div>
            
            <div class ="ml-auto p-2">
              <img v-bind:src="data.picture" alt="picture" style="height: 100px">
              <div v-if="deleteCheckerWarning == true && data._id == editOrUpdateId">
                <a href="#" class="btn btn-danger" v-on:click="removePost(data._id)">Yes</Canvas></a>
                <a href="#" class="btn btn-success" v-on:click="cancel">No</Canvas></a>    
              </div>
              <div v-else>
                <button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap" v-on:click="editContent(data._id)">Edit</button>
                <a href="#" class="btn btn-danger" v-on:click="showWarning(data._id)">Delete</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>`,
  methods: {
    editContent(id){
      this.$emit('show-editform', id);
    },
    removePost(id){
      this.$emit('remove-post', id);
    },
    showWarning(id){
      this.deleteCheckerWarning = true;
      this.editOrUpdateId = id;
    },
    cancel(){
      this.deleteCheckerWarning = false;
      this.editOrUpdateId = null;
    }
  }
})