<template>
  <div id="app">
    <div class="container" >
			<!-- <section class="navbar main-menu" >
				<div class="navbar-inner main-menu"style="width: 1500px">
					<a href="/" class="logo pull-left"><img src="./assets/oln logo.png" class="site_logo" alt="" style="margin: 15px auto 5px auto"></a>
					<nav  class="pull-right" style="margin: 5px auto 0px auto">
						<h1>Welcome</h1>
					</nav>
				</div>
			</section> -->
			<div class="span12" style="margin-top:20px">
			<img class="pageBanner" src="https://cdn.shopify.com/s/files/1/0214/5470/files/OLN-SLIDER-1.png?8247432977261988465" alt="New products" >
				<h4><span>Our products</span></h4>
			</div>
			<section class="main-content">
				<div class="span12">
					<div class="span9">
						<ul class="thumbnails listing-products">
							<li class="span3" v-for="product in productFire" :key="product['.key']">
								<div class="product-box">
									<span class="sale_tag"></span>
									<a href="/"><img :src="product.imgLink"></a><br/>
									{{product.productName}}<br/>
									<p class="price"><h4>{{product.price}} ฿</h4> </p>
                  {{product.amount}} left <br>
                  <a class="button is-link is-outlined">Add to cart</a>
								</div>
							</li>
						</ul>
						<hr><div  class="span12"style="text-align: left">
              ชื่อ <input type="text" value="" v-model="n">
              ราคา <input type="text" value="" v-model="p">
              จำนวน <input type="text" value="" v-model="a"><br>
              ลิ้งก์ <input type="text" value="" v-model="l">
              <button @click="addProduct">add</button>
            </div>

						<!-- <div class="pagination pagination-small pagination-centered">
							<ul>
								<li><a href="/">Prev</a></li>
								<li class="active"><a href="/">1</a></li>
								<li><a href="/">2</a></li>
								<li><a href="/">3</a></li>
								<li><a href="/">4</a></li>
								<li><a href="/">Next</a></li>
							</ul>
						</div> -->
					</div>
					<div class="span2">

						<h2>Best</h2>

					</div>
				</div>
			</section>
			<section id="footer-bar">
				<div class="span12">

					<div class="copyright">
						<p class="logo"><img src="./assets/themes/images/logo.png" class="site_logo" alt=""></p>
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. the  Lorem Ipsum has been the industry's standard dummy text ever since the you.</p>
						<br/>
						<span class="social_icons">
							<a class="facebook" href="/">Facebook</a>
							<a class="twitter" href="/">Twitter</a>
							<a class="skype" href="/">Skype</a>
							<a class="vimeo" href="/">Vimeo</a>
						</span>
					</div>
				</div>
			</section>
			<section id="copyright">
				<span>Copyright 2013 bootstrappage template  All right reserved.</span>
			</section>
		</div>
		</div>


    <!-- firebase -->
    <!-- <ul>
      <li v-for="todo in todosFire" :key="todo['.key']">
        <input type="text" :value="todo.text" @input="updateTodoFire(todo['.key'], $event.target.value)">
        <button @click="removeTodoFire(todo['.key'])">X</button>
      </li>
    </ul> -->
    <!-- local -->
    <!-- <input type="text" v-model="text">
    <button @click="addTodo"> Add </button><br>
    <ul>
      <li v-for="todo in todos" :key="todo.key">
        <input type="text" :value="todo.text" @input="updateTodo(todo.key, $event.target.value)">
        <button @click="removeTodo(todo.key)">X</button>
      </li>
    </ul> -->
</div>
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
      p: '',
      n: '',
      l: '',
      a: ''
    }
  },
  methods: {
    addProduct () {
      productRef.push({
        productName: this.n,
        price: this.p,
        imgLink: this.l
      })
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

</style>
