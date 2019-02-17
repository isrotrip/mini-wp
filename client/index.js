const url = 'http://localhost:3000';

const app = new Vue({
  el: '#app',
  data: {
    user: {
      id: '',
      name: '',
      email: '',
      picture: ''
    },
    content: {
      title: '',
      tags: [],
      text: [],
      picture: ''
    },
    position: '',
    isLogin: '',
    leftNavBars: homeBarLeft,
    rightNavBars: homeBarRight,
    sideBars: sideBars,
    articles: [],
    filterData: ''
  },
  created() {
    if(this.position !== 'formLogin'){
      $('#form-login').hide()
    } else if(this.postion !== 'createBar'){
      $('#create-bar').hide()
    }

    if(localStorage.getItem('token')){
      this.isLogin = true;
      this.position = 'dashboard';
    } else {
      this.isLogin = false;
      this.position = 'formLogin';
    }    
  },
  mounted() {
    gapi.signin2.render('google-signin-button', { 
      onsuccess: this.onSignIn
    })
  },
  watch: {
    position: function(val){
      //ada google sign in & CKEDitor
      if(val=='formLogin'){
        $('#form-login').show()
        $('#create-bar').hide()
      } else if(val=='createBar'){
        $('#create-bar').show()
        $('#form-login').hide()
      } else {
        $('#form-login').hide()
        $('#create-bar').hide()
      }
    },

    isLogin: function(val){
      if(val === true){
        $('#form-login').hide()
      } else if (val) {
        $('#create-bar').hide()
      }
    }
  },
  methods: {
    updatePosition(updatedPosition){
      this.position = updatedPosition;
    },
    onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile();
      const name = profile.getName();
      const email = profile.getEmail();
      console.log('google sign in')
      axios({
          method: 'post',
          url:`${url}/users/login`,
          data: {
            name: name,
            email: email,
            loginVia: 'google'
          }
        })
        .then(({data}) => {
          console.log('google login success');
          localStorage.setItem('token', data.token);
          this.user = {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            picture: data.user.picture,
            loginVia: 'google'
          },
          this.isLogin = true;
          this.position = 'dashboard';
        })
        .catch((err) => {
          console.error(err)
        })
    },
    login(user){
      axios({
        method: 'post',
        url:`${url}/users/login`,
        data: {
          email: user.email,
          password: user.password,
          loginVia: 'website'
        }
      })
      .then(({data}) => {
        console.log(data, 'ini datanya')
        localStorage.setItem('token', data.token);
        this.user.id = data.user.id;
        this.user.name = data.user.name;
        this.user.email = data.user.email;
        this.isLogin = true;
      })
      .catch(err => {
        console.error(err);
      })
    },
    register(user){
      axios({
        method: 'post',
        url:`${url}/users/register`,
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
        }
      })
      .then((user) => {
        console.log('register sukses')
        this.user.name = '';
        this.user.email = '';
        this.position = 'formLogin';
      })
      .catch((err) => {
        console.error(err);
      })
    },
    logout(){
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        this.isLogin = false; 
        localStorage.removeItem('token');
        this.position = 'formLogin';
        console.log('User log out');
      })
    },
    readPost(){
      axios
        ({
          method: 'get',
          url:`${url}/articles`,
          headers: {
            token: localStorage.token,
            userId: this.user.id
          }
        })
        .then(({data}) => {
          this.databaseArticle = data;
          this.articles = data;
        })
        .catch(err => {
          console.log(err);
        })
    },
    showCreatePost(){
      position = 'createPost';
    },
    addPost(){
      axios
        ({
          method: 'post',
          url:`${url}/articles`,
          headers: {
            token: localStorage.token,
            userId: this.user.id
          },
          data: {
            title: this.titleNewPost,
            tags: this.tagNewPost.split(' '),
            text: CKEDITOR.instances.editorCreate.getData(),
            picture: user.picture,
            userId: this.user.id,
            created_at: new Date
          }
        })
        .then(({data}) => {
          this.databaseArticle.push(data);
          this.articles = this.databaseArticle.slice(0);
          this.articles.push(data);
          this.cancel();
        })
        .catch(response => {
          console.error(response)
        })
    },
    filter(){
      this.articles = this.databaseArticle.filter(article => (article.content.title.indexOf(this.title) + 1));
    },
    showEditForm(postId){
      this.position = 'editContent';
      this.editOrUpdateId = postId
      const editContent = this.articles.filter(article => article.id === postId)[0].content;
      this.titleNewPost = editContent.title;
      this.tagNewPost = editContent.tags.join(' ');
      CKEDITOR.instances.editorCreate.setData(editContent.text);
    },
    editPost(){
      axios
        ({
          method: 'put',
          url:`${url}/articles/${this.editOrUpdateId}`,
          headers: {
            token: localStorage.token,
            userId: this.user.id
          },
          data: {
            title: this.titleNewPost,
            tags: this.tagNewPost.split(' '),
            text: CKEDITOR.instances.editorCreate.getData(),
            picture: this.user.picture,
            userId: this.user.id,
            created_at: new Date
          }
        })
        .then(({data}) => {
          console.log('masuk', data);
          this.databaseArticle.splice(this.databaseArticle.indexOf(this.editOrUpdateId), 1);
          this.databaseArticle.push(data);
          this.articles.splice(this.articles.indexOf(this.editOrUpdateId), 1);
          this.articles.push(data);
          this.cancel();
        })
        .catch(err =>{
          console.error(err);
        })
    },
    showWarning(postId){
      this.editOrUpdateId = postId;
      this.deleteCheckerWarning = true;
    },
    removePost(deleteId){
      axios
      ({
        method: 'delete',
        url:`${url}/articles/${this.editOrUpdateId}`,
        headers: {
          token: localStorage.token,
          userId: this.user.id
        }
      })
        .then(({data}) => {
          this.databaseArticle.splice(this.databaseArticle.indexOf(this.editOrUpdateId), 1);
          this.articles.splice(this.articles.indexOf(deleteId), 1);
        })
        .catch(response => {
          console.error(response);
        })
    },
    cancel(){
      this.position = 'createContent';
      this.editOrUpdateId = '';
      this.titleNewPost = '';
      this.tagNewPost = '';
      this.deleteCheckerWarning = false;
      this.articles = this.databaseArticle.slice(0);
      CKupdate();
    },
    CKupdate(){
      for ( instance in CKEDITOR.instances ){
          CKEDITOR.instances[instance].updateElement();
          CKEDITOR.instances[instance].setData('');
      }
    }
  }
})

CKEDITOR.replace( 'editorCreate' );