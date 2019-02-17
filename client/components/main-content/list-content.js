Vue.component('list-content', {
  props: ['articles'],
  template: `
  <ul>
    <li style="list-style-type:none">
      <div v-for="data in articles" :id="data.id" class="row flex-container card">            
        <div class="card-body">
          <div v-if="deleteCheckerWarning == true && data.id == editOrUpdateId">
            <p class="text-danger">
              Are You Sure Want To Delete This Post?
            </p>
          </div>
          <div class="row">
            <div class="p-2 align-self-center">
              <h5 class="card-title">{{data.content.title}}</h5>
              <p class="card-text" style="font-size:12px">{{data.content.created_at}}</p>
              <p class="card-text" style="font-size:12px">{{data.content.tags.join(' ')}}</p>
            </div>

            <div class="p-2 align-self-center">
              <p class="card-text" v-html="data.content.text"></p>
            </div>
            
            <div class ="ml-auto p-2">
              <img v-bind:src="data.content.picture" alt="picture" style="border-radius: 100% ;height: 100px">
              <div v-if="deleteCheckerWarning == true && data.id == editOrUpdateId">
                <a href="#" class="btn btn-danger" v-on:click="removePost(data.id)">Yes</Canvas></a>
                <a href="#" class="btn btn-success" v-on:click="cancel()">No</Canvas></a>    
              </div>
              <div v-else>
                <button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap" v-on:click="showEditForm(data.id)">Edit</button>
                <a href="#" class="btn btn-danger" v-on:click="showWarning(data.id)">Delete</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>`
})