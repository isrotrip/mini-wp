Vue.component('create-bar', {
  props: ['position', 'content'],
  data(){
    return {
      selectedFile: null,
      filepath: null
    }
  },
  template: `
  <div class="row card">            
    <div class="card-body">
      <div class="row d-flex justify-content-center align-self-center">
        <div id="writePost" class="p-2 form-group">
          <h2 class="card-title text-center" v-if="position==='createBar'">Create A Post</h2>
          <h2 class="card-title text-center" v-else-if="position==='editBar'">Edit Post</h2>
          <label for="recipient-name" class="col-form-label">Title:</label>
          <input type="text" class="form-control" placeholder="title" v-model="content.title">
          <label for="recipient-name" class="col-form-label">Tags:</label>
          <input type="text" class="form-control" style="margin-bottom:15px" placeholder="tags" v-model="content.tags">
          <textarea name="editorCreate"></textarea>
          <div v-if="position==='createBar'">
            <form  @submit.prevent="create">
              <input type="file" name="image" @change="onFileSelected">
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
          <div v-else-if="position==='editBar'">
            <input type="file" name="image" @change="onFileSelected">
            <button type="submit" class="btn btn-success" @click="finishEdit">Done</button>
            <button class="btn btn-danger" @click="changePosition('dashboard')">Cancel</button> 
          </div>
        </div>
      </div>
    </div>
  </div>`,
  methods: {
    changePosition(position){
      this.$emit('change-position', position);
    },

    async create(){
      await this.uploadFiles();
      this.content.picture = this.filepath;
      this.$emit('create-content', this.content);
    },

    async finishEdit(){
      await this.uploadFiles();
      this.content.picture = this.filepath;
      this.$emit('update-content', this.content);
    },

    async update(){
      await this.uploadFiles();
      this.content.picture = this.filepath;
      this.$emit('update-content', this.content);
    },

    onFileSelected(event){
      this.selectedFile = event.target.files[0]
    },

    async uploadFiles(){
      await new Promise(resolve => {
        setTimeout(resolve, 500);
      })
      const fd = new FormData();
      fd.append('image', this.selectedFile, this.selectedFile.name);
      await axios.post(`${url}/upload`, 
        fd, { 
        headers: {
          token: localStorage.getItem('token'),
          "Content-Type": 'multipart/form-data'
        }
      })
        .then((response) => {
          this.filepath = response.data.link
        }).catch((error) => {
          console.error(error)
        });
    }
  }

})