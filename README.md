# mini-wp

### Route
Route | HTTP | Header(s) | Body | Response | Description
------|------|-----------|------|----------|------------
/users/login | POST | loginVia ('google' OR 'website') | if loginVia website: <br> email: String(**Required**), <br> password: String(**Required**) | Error: <br> Wrong username/password (fail login via website) <br> Success: <br> get a signin token <br> automatic signup if the user haven't signup (via google) | Signin into server
/users/register| POST | register via website | name:String(**Required**) <br> email:String(**Required**) <br> password:String(**Required**) <br> | Error: <br> Wrong email format <br> name, email, password (**Required**) <br> Email is unique <br> Success: <br> register new user | Register new user 
/upload | POST | Data-Type for encrypt file | image:File(**Required**) | Error: <br> wrong format or requirements <br> Success: <br> upload photo success | upload photo to GCS
/articles | GET | login token (**Required**) | | error: <br> Internal Server Error <br> success: <br> articles success loaded | Get user articles
/articles | POST | login token (**Required**) | title:String (**Required**) <br> text:String (**Required**) <br> tags:Array(**Required**) <br> picture:File (**Required**) <br> userId:String (**Required**) | error: <br> Internal server error <br> success: <br> Create new articles | Create articles
/articles/:id | PUT | login token (**Required**) <br> req.params.id(**Required**) | title:String (**Required**) <br> text:String (**Required**) <br> tags:Array(**Required**) <br> picture:File (**Required**) <br> userId:String (**Required**) | error: <br> Internal server error <br> success: <br> Update articles | Update articles
/articles/:id | DELETE | login token (**Required**) <br> req.params.id(**Required**) | | error: <br> Internal server error <br> success: <br> Delete articles | Delete articles


### Usage
command |
------- |
$ npm install |
$ npn start |
$ live-server --host=localhost |

Access the Server via http://localhost:3000/
<br>
Access the Client via http://localhost:8080/
