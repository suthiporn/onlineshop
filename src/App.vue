<template>
  <div id="app">
    <div class="container" style="width: 1500px">
			<!-- <section class="navbar main-menu" >
				<div class="navbar-inner main-menu"style="width: 1500px">
					<a href="/" class="logo pull-left"><img src="./assets/oln logo.png" class="site_logo" alt="" style="margin: 15px auto 5px auto"></a>
					<nav  class="pull-right" style="margin: 5px auto 0px auto">
						<h1>Welcome</h1>
					</nav>
				</div>
			</section> -->
			<div class="" style="margin-top:20px">
			<img class="pageBanner" src="https://cdn.shopify.com/s/files/1/0214/5470/files/OLN-SLIDER-1.png?8247432977261988465"  >
			</div>
      <div class="" style="margin-top:20px">
        <h1>Welcome</h1> <br>
			<img class="imgEdit" src="https://scontent.fbkk21-1.fna.fbcdn.net/v/t1.0-9/27459244_2155848374701581_4375726229725598849_n.jpg?_nc_cat=0&oh=4517b2c5d3326fce2338f435696b7ac4&oe=5B8802CE"  >
      <hr>
      </div>
				<div class="row" style="margin-top:20px">
					<div class="col-12" >
						<ul >
							<li class="col-3" v-for="product in productFire" :key="product['.key']">
									<a href="/"><img :src="product.imgLink" width="300" height="255"></a><br/>
                    {{product.productName}}<br/>
  									<p class="price"><h5>{{product.price}} ฿</h5> </p>
                    {{product.amount}} left <br>
                    <a class="button is-link is-outlined">Add to cart</a>
							</li>
						</ul>
						<hr>
					</div>
				</div>
        <div class="">
          <h1>Add product</h1> <br>
        </div>

        <div class="row" style="margin-bottom: 30px">

          <div class="col">
            <input type="text" class="form-control" placeholder="Name" v-model="n" >
          </div>
          <div class="col">
            <input type="number" class="form-control" min="1" placeholder="Price" v-model="p" >
          </div>
          <div class="col">
            <input type="number" class="form-control" min="1" placeholder="Amount" v-model="a" >
          </div>
          <div class="col">
            <input type="text" class="form-control" placeholder="Image link" v-model="l" >
          </div>
          <button class="btn btn-success" @click="addProduct">Add</button>
        </div>

		</div>
		</div>


    <!-- firebase -->
    <!-- <ul>
      <li v-for="todo in todosFire" :key="todo['.key']">
        <input type="text" :value="todo.text" @input="updateTodoFire(todo['.key'], $event.target.value)">
        <button @click="removeTodoFire(todo['.key'])">X</button>
      </li>
    </ul> -->
</template>
<script>
import firebase from 'firebase'
var config = {
  apiKey: 'AIzaSyBPDmTmUaMfH0l666pnCk3BElbpdVh47o0',
  authDomain: 'onlineshop-best.firebaseapp.com',
  databaseURL: 'https://onlineshop-best.firebaseio.com',
  projectId: 'onlineshop-best',
  storageBucket: 'onlineshop-best.appspot.com',
  messagingSenderId: '307885241189'
}
var firebaseApp = firebase.initializeApp(config)
var db = firebaseApp.database()
var todosRef = db.ref('todos')
var productRef = db.ref('products')
export default {
  name: 'App',
  firebase: {
    todosFire: todosRef,
    productFire: productRef
  },
  data () {
    return {
      text: '',
      productName: '',
      price: '',
      addProductButtonState: false,
      addProductPassword: '',
      passwordForAdd: '123456',
      onAdd: false,
      p: null,
      n: null,
      l: null,
      a: null
    }
  },
  methods: {

    addProduct () {
      // swal(
      //   'Good job!',
      //   'You clicked the button!',
      //   'success'
      //   )
      console.log(this.p)
      console.log(this.n)
      console.log(this.a)
      console.log(this.l)
      if (this.n!==null||this.p!==null||this.a!==null||this.l!==null) {
        if (this.n!==null) {
          if (this.p!==null&&this.p>=0) {
            if (this.a!==null&&this.a>0) {
              if (this.l!==null) {
                productRef.push({
                  productName: this.n,
                  price: this.p,
                  imgLink: this.l,
                  amount: this.a
                })
                this.n = null
                this.l = null
                this.p = null
                this.a = null
              }else {
                swal(
                  'Warning!',
                  'Please fill in image\'s link of product!',
                  'warning'
                  )
              }
            }else {
              swal(
                'Warning!',
                'Please fill in the correct amount of product!',
                'warning'
                )
            }
          }else {
            swal(
              'Warning!',
              'Please fill in the correct price of product!',
              'warning'
              )
          }
        }else {
          swal(
            'Warning!',
            'Please fill in name of product!',
            'warning'
            )
        }
      }else {
        swal(
          'Warning!',
          'Please fill up the information!',
          'warning'
          )
      }



    },
    addTodoFire () {
      todosRef.push({
        text: 'wsdsd',
        productName: 'Coca col',
        price: 125

      })
    },
    updateTodoFire (key, text) {
      // todosRef.child(key).child('text').set(text)
      db.ref('todos/' + key).set({
        text: text
      })
    },
    removeTodoFire (key) {
      // todosRef.child(key).remove()
      db.ref('todos/' + key).remove()
    },
    changeStateButton () {
      this.addProductButtonState = true
    },
    changeStatePassword () {
      this.onAdd = true
    },
    updateTodo (key, text) {
      // const index = this.todos.findIndex((todo) => todo.key === key)
      // if (index > -1) {
      //   this.todos[index].text = text
      // }
      const todo = this.todos.find((todo) => todo.key === key)
      if (todo) {
        todo.text = text
      }
    },
    removeTodo (key) {
      // const index = this.todos.findIndex(function (todo) {
      //   return todo.key === key
      // })
      const index = this.todos.findIndex((todo) => todo.key === key)
      if (index > -1) {
        this.todos.splice(index, 1)
      }
    }
  }
}
</script>

<style>
  #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: -5px;
  }
  ul {
    margin: 0 auto;
    text-align: center;
  }

  li {
    display: inline-block;
    vertical-align: top;
    margin-bottom: 10px
  }
  .imgEdit {
    border-radius: 50%;
    width: 300px;
    height: 300px;
  }
  h1 {
     font-size: 50px;
     color: black;
     text-align: center;
     text-shadow: 0px 1px 0px #f2f2f2;
     border: 1px solid transparent;
   }
  h2 {
     font-size: 35px;
     color: black;
     text-align: center;
     margin: 0 0 35px 0;
     text-shadow: 0px 1px 0px #f2f2f2;
   }
 h5 {
      font-size: 20px;
      color: black;
      text-align: center;
      font-weight: bold;
      text-shadow: 0px 1px 0px #f2f2f2;
    }
</style>
