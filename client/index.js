const url = 'http://localhost:3000';

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  const name = profile.getName();
  const email = profile.getEmail();
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
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.user.email);
      localStorage.setItem('loginVia', 'google');
      
    }) 
    .catch((err) => {
      console.error(err)
    })
}



function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}


function swal(type, title) {
  Swal.fire({
    position: 'top-end',
    type: type,
    title: title,
    showConfirmButton: false,
    timer: 700
  })
}


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
      id: '',
      title: '',
      tags: '',
      text: '',
      picture: ''
    },
    position: '',
    isLogin: '',
    leftNavBars: homeBarLeft,
    rightNavBars: homeBarRight,
    sideBars: sideBars,
    articles: [],
    filterBy: '',
    googleSignIn: false
  },


  created() {
    if(this.position === 'formLogin'){
      $('#form-login').show()
    } else if(this.postion === 'createBar'){
      $('#create-bar').show()
    } else {
      $('#form-login').hide()
      $('#create-bar').hide()
    }

    if(localStorage.getItem('token')){
      this.isLogin = true;
      this.position = 'dashboard';
      this.readPost();
    } else {
      this.isLogin = false;
      this.position = 'formLogin';
    }    
  },

  watch: {
    position: function(val){
      //ada google sign in & CKEDitor
      if(val=='formLogin'){
        $('#form-login').show()
        $('#create-bar').hide()
      } else if(val=='createBar' || val=='editBar'){
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

    async loginGoogle(googleUser){
        onSignIn(googleUser)
          .then(user => {
            this.user = user;
          })
          .catch(err => {
            console.error(err);
            swal('error', "internal server error")
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
        localStorage.setItem('token', data.token);
        this.user.id = data.user.id;
        this.user.name = data.user.name;
        this.user.email = data.user.email;
        this.isLogin = true;
        this.readPost();
        this.position = 'dashboard'
      })
      .catch(err => {
        console.error(err);
        swal('error', err)
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
        swal('error', err)
      })
    },
    logout(){
      this.isLogin = false; 
      localStorage.removeItem('token');
      this.position = 'formLogin';
      signOut();
    },


    readPost(){
      axios
        ({
          method: 'get',
          url:`${url}/articles`,
          headers: {
            token: localStorage.token
          }
        })
        .then(({data}) => {
          this.articles = data;
          this.articles = this.articles.sort((a,b) => b.created_at > a.created_at);
        })
        .catch(err => {
          console.log(err);
        })
    },
    addPost(content){
      axios
        ({
          method: 'post',
          url:`${url}/articles`,
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            title: content.title,
            tags: content.tags.split(' '),
            text: CKEDITOR.instances.editorCreate.getData(),
            picture: content.picture,
            created_at: new Date
          }
        })
        .then(({data}) => {
          this.articles.push(data);
          this.articles = this.articles.sort((a,b) => b.created_at > a.created_at);
          this.cancel();
          swal('success', 'upload articles success')
        })
        .catch(response => {
          console.error(response)
          swal('error', response)
        })
    },
    filter(){
      // this.articles = this.databaseArticle.filter(article => (article.content.title.indexOf(this.title) + 1));
      // this.articles = this.articles.sort((a,b) => b.created_at > a.created_at);
    },
    showEditForm(postId){
      this.position = 'editBar';
      const editContent = this.articles.filter(article => article._id === postId)[0];
      this.content.id = postId;
      this.content.title = editContent.title;
      this.content.tags = editContent.tags.join(' ');
      CKEDITOR.instances.editorCreate.setData(editContent.text);
      this.content.picture = editContent.picture;
    },
    editPost(content){
      axios
        ({
          method: 'put',
          url:`${url}/articles/${content.id}`,
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            title: content.title,
            tags: content.tags.split(' '),
            text: CKEDITOR.instances.editorCreate.getData(),
            picture: content.picture,
            created_at: new Date
          }
        })
        .then(({data}) => {
          let indexSplice = 0;
          for(let i = 0; i < this.articles.length; i++){
            if(this.articles[i]._id === data._id){
              indexSplice = i;
              break;
            }
          }
          this.articles.splice(indexSplice, 1);
          this.articles.push(data);
          this.articles = this.articles.sort((a,b) => b.created_at > a.created_at);
          this.cancel();
          swal('success', 'success update a file')
        })
        .catch(err =>{
          console.error(err);
          swal('error', err)
        })
    },
    removePost(deleteId){
      axios
      ({
        method: 'delete',
        url:`${url}/articles/${deleteId}`,
        headers: {
          token: localStorage.token,
          userId: this.user.id
        }
      })
        .then(({data}) => {
          let indexSplice = 0;
          for(let i = 0; i < this.articles.length; i++){
            if(this.articles[i]._id === deleteId){
              console.log(this.articles[i]._id, deleteId) 
              indexSplice = i;
              break;
            }
          }
          this.articles.splice(this.articles.indexOf(indexSplice), 1);
          this.articles = this.articles.sort((a,b) => b.created_at > a.created_at);
          swal('success', 'success delete a file')
        })
        .catch(response => {
          console.error(response);
          swal('error', response)
        })
    },
    cancel(){
      this.position = 'dashboard';
      this.content.id = '';
      this.content.title = '';
      this.content.tags = '';
      this.content.picture = '';
      this.CKupdate();
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