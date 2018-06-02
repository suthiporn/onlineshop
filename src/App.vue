<template>
  <div id="app">
    <!-- Header logo part -->
    <div class="container" style="width: 1500px">
			<div class="" style="margin-top:20px">
			<img class="pageBanner"
      src="https://www.casio-intl.com/cs/Satellite?blobcol=urldata&blobheader=image%2Fjpeg&blobheadername1=content-disposition&blobheadervalue1=inline%3Bfilename%3Dgravity_top.jpg&blobkey=id&blobtable=MungoBlobs&blobwhere=1426213721694&ssbinary=true">
			</div>
      <div class="" style="margin-top:20px">
        <br>

      <!-- Product part -->
      <hr>
      </div>
				<div class="row" style="margin-top:30px">
					<div class="col-9" >
						<ul >
							<li class="col-3" v-for="product in productFire" :key="product['.key']">
									<a ><img :src="product.imgLink" width="300" height="255"></a><br/>
                    {{product.productName}}<br/>
                    <p class="price"> {{product.price}} ฿ </p>
                    {{product.amount}} left <br>
                    <button type="button" class="button is-info is-rounded" v-if="product.amount !==0" @click="addToCart(product.productName,product.price,product['.key'],product.amount,product.imgLink)">Add Order</button>
                  </li>
            </ul>
            <hr>
          </div>
          <div class="col-3" style="text-align: center" >

            <!-- Cart part -->
            <h2>Your Order</h2>
            <div v-for="(item , index) in items">
               <ul>
                 <li class="list-group-item" style="width:350px; margin-bottom: 10px; " ><img :src="item.imgLink" width="50" height="50"> {{item.productName}} : {{item.price}} ฿ <br> {{item.amount}}<br>
                   <button class="btn btn-danger" style="margin-bottom: 20px; margin-top: 20px" @click="pickOff(item.productName,item.price,item.amount,item.imgLink,item.key,index,item.amountf)">Delete Order</button></li>
               </ul>
             </div>

            Total price : <strong>{{cost}} ฿ </strong><br>
            <button type="button" class="button is-danger is-rounded" @click="checkOut">Pay Order</button>
                <!-- <button @click="removeTodoFire(todo['.key'])">X</button> -->
          </div>
        </div>

         <!-- password for add product part -->
        <div class="" v-if="inputPassword!=passwordForAdd" style="margin-bottom: 30px">
          <h2>Add product</h2>
          <input type="password" class="form-control" placeholder="Password" v-model="inputPassword" >
        </div>
      <div class="" v-if="inputPassword==passwordForAdd" >

        <!-- Add product part -->
        <div>
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
          <button class="button is-primary is-focused" @click="addProduct"> Add </button>
          <button class="button is-danger is-focused" @click="changePassword"> Cancel </button>
        </div>
      </div>
		</div>
		</div>

</template>
<script>
import firebase from 'firebase'
var config = {
  apiKey: 'AIzaSyAXM21_mL6K5nCgHMuh70pR_h525d4D_hw',
  authDomain: 'onlineshop-job.firebaseapp.com',
  databaseURL: 'https://onlineshop-job.firebaseio.com',
  projectId: 'onlineshop-job',
  storageBucket: 'onlineshop-job.appspot.com',
  messagingSenderId: '302979510626'
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
      inputPassword: '',
      passwordForAdd: 'admin',
      authorized: false,
      onAdd: false,
      p: null,
      n: null,
      l: null,
      a: null,
      cost: 0,
      startA: 1,
      items: []
    }
  },
  methods: {
    changePassword () {
      this.inputPassword = ''
    },
    pickOff (name, price, amount, link, key, index, amountf) {
      console.log(amountf)
      db.ref('products/' + key).set({
        productName: name,
        price: price,
        imgLink: link,
        amount: amountf
      })
      this.cost -= price * amount
      this.items.splice(index, 1)
    },
    checkOut () {
      this.items = []
      this.cost = 0
      swal (
        'Thank you!',
        'come back again :)',
        'success'
      )
    },
    addToCart (name, price, key, amount, link) {
      console.log(amount)
      if (this.items[0] == null) {
        this.cost += price * 1
        this.items.push({
          productName: name,
          price: price,
          key: key,
          amount: 1,
          imgLink: link,
          amountf: amount})
          db.ref('products/' + key).set({
          productName: name,
          price: price,
          imgLink: link,
          amount: amount - 1
        })
      } else {
        for (var i = 0; i < this.items.length; i++) {
          if (name === this.items[i].productName) {
            this.cost += price * 1
            db.ref('products/' + key).set({
              productName: name,
              price: price,
              imgLink: link,
              amount: amount - 1
            })
            this.items[i].push({
              productName: name,
              price: price,
              key: key,
              amount: this.items[i].amount += 1,
              imgLink: link,
              amountf: amount})
          } else if (i === this.items.length - 1 && name !== this.items[i].productName) {
            this.cost += price * 1
            db.ref('products/' + key).set({
              productName: name,
              price: price,
              imgLink: link,
              amount: amount - 1
            })
            this.items.push({
              productName: name,
              price: price,
              key: key,
              amount: 1,
              imgLink: link,
              amountf: amount})
            break
          }
        }
      }
    },
    addProduct () {
      console.log(this.p)
      console.log(this.n)
      console.log(this.a)
      console.log(this.l)
      if (this.n !== null || this.p !== null || this.a !== null || this.l !== null) {
        if (this.n !== null) {
          if (this.p !== null && this.p >= 0) {
            if (this.a !== null && this.a > 0) {
              if (this.l !== null) {
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
              } else {
                swal(
                  'Warning!',
                  'Please fill in image\'s link of product!',
                  'warning'
                )
              }
            } else {
              swal(
                'Warning!',
                'Please fill in the correct amount of product!',
                'warning'
              )
            }
          } else {
            swal(
              'Warning!',
              'Please fill in the correct price of product!',
              'warning'
            )
          }
        } else {
          swal(
            'Warning!',
            'Please fill in name of product!',
            'warning'
          )
        }
      } else {
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
      db.ref('todos/' + key).set({
        text: text
      })
    },
    removeTodoFire (key) {
      db.ref('todos/' + key).remove()
    },
    changeStateButton () {
      this.addProductButtonState = true
    },
    changeStatePassword () {
      this.onAdd = true
    },
    updateTodo (key, text) {
      const todo = this.todos.find((todo) => todo.key === key)
      if (todo) {
        todo.text = text
      }
    },
    removeTodo (key) {
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
  .borderlist {
    list-style-position:inside;
    border: 1px solid black;
  }
</style>
