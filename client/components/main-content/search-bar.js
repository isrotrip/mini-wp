Vue.component('search-bar', {
  template: `
  <div class="card-body">
    <ul class="flex-container row">
      <li class="flex-item mr-1">
        <button type="radio" class="btn btn-outline-primary">Published</button>
      </li>
      <li class="flex-item mr-1">
        <button type="radio" class="btn btn-outline-danger">Drafts</button>
      <li class="flex-item mr-1">
        <div class="input-group mb-3">
        <form v-on:submit.prevent="filter">
          <input type="text" class="form-control" placeholder="Search...">
            <div class="input-group-prepend">
              <button type="submit" class="btn btn-outline-secondary">
                <img src="./components/assets/picture/find.png" style="height:20px">
              </button>
            </div>
          </form>
        </div>
      </li>
    </ul>
  </div>`
})