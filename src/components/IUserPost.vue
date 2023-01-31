<template>
  <form id="user__container" class="iDis">
    <div class="iUser">
      <div><img :src="iUser.avatar" alt="AVATAR" /></div>
      <div>
        <input
          type="text"
          placeholder="Start a discussion..."
          v-model.trim="iPostText"
        />
      </div>
    </div>
    <button v-if="iPostText.length > 0" class="post__btn" @click.prevent="post">
      Post
    </button>
  </form>
</template>

<script>
import { ref, computed } from "vue";
import { data } from "../../json/sampleApi.json";
import { user } from "../../json/iUser.json";
export default {
  setup(props, contex) {
    const usersJson = ref(JSON.parse(JSON.stringify(data)));
    const iUserJson = ref(JSON.parse(JSON.stringify(user)));
    const discussions = ref(usersJson);
    const iUser = ref(iUserJson);
    const iPostText = ref("");
    const iPost = ref({
      id: null,
      date: "",
      user: {},
      text: "",
      likes: null,
      iLikedIt: null,
      replies: [],
    });
// get data and emiting to another component
    const post = () => {
      iPost.value = {
        id: Date.now(),
        date: Date.now(),
        user: iUser.value,
        text: iPostText.value,
        likes: 0,
        iLikedIt: false,
        replies: [],
      };
      contex.emit("user-post", iPost.value);
      iPostText.value = "";
    };
    return { discussions, iUser, post, iPostText };
  },
};
</script>

<style>
#user__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
}

.iDis {
  margin: 1rem auto;
}
.iUser {
  max-width: 100%;
  display: flex;

  padding: 1rem;
  align-items: center;
}
.iUser img {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.iUser input {
  width: 100%;
  height: 2.2rem;
  border: 1px solid rgb(219, 219, 219);
  border-radius: 5px;
  background-color: white;
  padding: 1rem;
}
.post__btn {
  width: 150px;
  height: 2.2rem;
  margin: 0 auto;
  border: none;
  background-color: rgb(0, 102, 255);
  color: white;
  font-weight: bold;
  border-radius: 30px;
  cursor: pointer;
}
.post__btn:hover {
  background-color: rgb(3, 48, 116);
}
.iUser input:focus {
  outline: none;
  background-color: rgb(241, 248, 255);
}

.iUser div:first-child {
  width: 10%;
}
.iUser div:last-child {
  width: 90%;
}
@media only screen and (max-width: 998px) {
  .iUser div:first-child {
    width: 30%;
  }
  .iUser div:last-child {
    width: 70%;
  }
}
</style>
