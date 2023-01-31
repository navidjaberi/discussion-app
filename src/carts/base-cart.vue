<template>
  <div>
    <div id="container">
      <div class="line" v-if="hasReply"></div>
      <div class="avatar__container">
        <img  v-if="hasAvatar" :src="avatar" class="avatar" alt="Avatar" />
        <div v-else class="avatar name__avatar" >{{noAvatar}}</div>
      </div>
      <section>
        <div class="content">
          <h1>{{ name }}</h1>
          <small>{{ date }}</small>
        </div>
        <p>
          {{ text }}
        </p>
        <div class="control">
          <button type="button" @click="likePost" :class="{ like: iLikeIt }">
            <i
              class="fa fa-thumbs-up"
              style="font-size: 1.4rem"
              aria-hidden="true"
            ></i
            ><span style="font-size: 1rem">{{ like }}</span>
          </button>
          <button type="button" class="reply" @click="replyPost">Reply</button>
        </div>
      </section>
    </div>
    <slot></slot>
    <form class="user__container iCm" v-if="showReply">
      <div class="line__user"></div>
      <div class="iUser">
        <div><img :src="iUser.avatar" alt="AVATAR" /></div>
        <div class="reply__control">
          <input type="text" placeholder="Reply..." v-model.trim="userCm" />
          <button @click.prevent="post" @click="sendCm">Send</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
   props: {
    like: {
      type: Number,
      required: true,
      default: 0,
    },
    date: {
      type: String,
      required: true,
      default: '',
    },
    name: {
      type: String,
      required: true,
      default: "",
    },
    avatar: {
      type: String,
      required: false,
      default: null,
    },
    text: {
      type: String,
      required: true,
      default: "",
    },
    iLikeIt: {
      type: Boolean,
      required: true,
      default: false,
    },
    id: {
      type: Number,
      required: true,
      default: null,
    },
       hasReply: {
      type: Boolean,
      required: true,
      default: null,
    },
    hasAvatar: {
      type: Boolean,
      required: true,
      default: false,
    },
    noAvatar: {
      type: String,
      required: true,
      default: '',
    },
  },
  setup(props, contex) {
    const showReply = ref(false);
    const iUser = ref({
      name: "Navid Jaberi",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
    });
    const userCm = ref("");
    const likePost = () => {
      contex.emit("like-post", props.id);
    };
    const replyPost = () => {
      showReply.value = true;
    };
    const sendCm = () => {
      contex.emit("send-cm", userCm.value, props.id);
      userCm.value=''
    };
    return { likePost, replyPost, showReply, iUser, userCm, sendCm };
  },
};
</script>

<style>
#container {
  width: 100%;
  height: auto;
  display: flex;
  position: relative;
}
.line {
  position: absolute;
  width: 2px;
  height: 50%;
  background-color: rgb(201, 201, 201);
  left: 56px;
  bottom: 0px;
}
.line__user {
  position: absolute;
  width: 2px;
  height: 100%;
  background-color: rgb(201, 201, 201);
  left: -8px;
}
.avatar__container {
  position: absolute;
}
.avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  left: 2rem;
  top: 1rem;
}
.name__avatar{
background-color: rgb(126, 107, 255);
color: white;
display: flex;
justify-content: center;
align-items: center;
font-weight: 700;
font-size: 20px;
}
section {
  padding: 1rem 6rem;
}
.content {
  display: flex;
 white-space: nowrap;
}
.content small {
  color: rgb(148, 145, 145);
  margin: 0.6rem 0.5rem;
}
.control {
  display: flex;
  margin-top: 1.3rem;
}
.control button {
  width: 60px;
  height: 2rem;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  margin: 0 1rem 0 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  transition: 0.5s ease-out;
}
.reply:hover{
 background-color:rgb(0, 102, 255);
 color: white;
}
.like {
  background-color: rgb(0, 102, 255);
  color: white;
  transition: 0.5s ease-out;
}
.reply {
  background-color: transparent;
  color: rgb(0, 102, 255);
  font-weight: 700;
}
.reply__control {
  width: 300px;
  position: relative;
}

.reply__control button {
  position: absolute;

  border-radius: 5px;
  right: 0px;
  z-index: 2;
  border: none;
  height: 35px;
  cursor: pointer;
  color: white;
  background-color: #1e90ff;
}

.reply__control button:hover {
  background-color: rgb(3, 48, 116);
}
</style>
