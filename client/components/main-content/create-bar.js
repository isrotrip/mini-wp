Vue.component('create-bar', {
  props: ['position', 'content'],
  template: `
  <div class="row card">            
    <div class="card-body">
      <div class="row d-flex justify-content-center align-self-center">
      <div id="writePost" class="p-2 form-group">
          <h2 class="card-title text-center" v-if="position==='createContent'">Create A Post</h2>
          <h2 class="card-title text-center" v-if="position==='editContent'">Edit Post</h2>
          <label for="recipient-name" class="col-form-label">Title:</label>
          <input type="text" class="form-control" value="content.title">
          <label for="recipient-name" class="col-form-label">Tags:</label>
          <input type="text" class="form-control" style="margin-bottom:15px" value="content.tags">
          <textarea id="ckeditor" name="editorCreate"></textarea>
          <div v-if="position==='createContent'">
            <form  v-on:submit.prevent="addPost">
              <input type="file" name="image" value="">
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
          <div v-else-if="position==='editContent'">
            <form v-on:submit.prevent="editPost">
            <button type="submit" class="btn btn-success">Done</button>
            <button class="btn btn-danger" v-on :click="cancel">Cancel</button>
            </form> 
          </div>
        </div>
      </div>
    </div>
  </div>`
})