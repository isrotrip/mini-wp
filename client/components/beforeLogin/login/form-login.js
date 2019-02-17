Vue.component('form-login', {
  props: ["user"],
  template: `
  <div class="card">
    <img src="./components/assets/picture/login.svg" alt="loginpage" class="pic-center">
    <button class="btn btn-secondary btn-block login-option active" @click="changePosition('formLogin')" active> Log In  </button>
    <button class="btn btn-secondary btn-block login-option" @click="changePosition('formRegister')"> Register  </button>
    <hr>
    <form @submit.prevent="login()">
      <div class="form-group sizing-login">
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text"> email </span>
                <input class="form-control" placeholder="Email" type="email" v-model=user.email>
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
          <button type="submit" class="btn btn-secondary btn-block"> Log In  </button>
          <div id="google-signin-button" class="g-signin2"></div>
        </div>
      </div>
    </form> 
  </div>`,
  methods: {
    changePosition(position){
      this.$emit('change-position', position);
    },

    login(){
      this.$emit('submit-login', this.user);
    }
  }
})