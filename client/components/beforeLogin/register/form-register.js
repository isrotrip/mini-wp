Vue.component('form-register', {
  props: ["user"],
  template: `
  <div class="card">
    <img src="./components/assets/picture/register.svg" alt="loginpage" class="pic-center">
    <button class="btn btn-secondary btn-block login-option" @click="changePosition('formLogin')"> Log In  </button>
    <button class="btn btn-secondary btn-block login-option active" @click="changePosition('formRegister')" active> Register  </button>
    <hr>
    <form @submit.prevent="register">
      <div class="form-group sizing-login">
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text"> name </span>
                <input class="form-control" placeholder="Name" type="text" v-model="user.name">
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text"> email </span>
                <input class="form-control" placeholder="Email" type="email" v-model="user.email">
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text"> password </span>
              <input class="form-control" placeholder="password" type="password" v-model="user.password">
            </div>
          </div>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-secondary btn-block"> Register </button>
        </div>
      </div>
    </form> 
  </div>`,
  methods: {
    changePosition(position){
      this.$emit('change-position', position);
    },

    register(){
      this.$emit('submit-register', this.user);
    }
  }
})