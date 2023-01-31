<template>
  <div>
    <!-- user discussion input section -->
    <iUserPost @user-post="post" />
    <!-- main container -->
    <div
      id="post__container"
      v-for="(user, index) in discussions"
      :key="user.id"
    >
      <!-- posts cart -->
      <Cart
        :id="user.id"
        :name="user.user.name"
        :avatar="user.user.avatar"
        :date="this.timeAgo(user.date)"
        :text="user.text"
        :like="user.likes"
        :iLikeIt="user.iLikedIt"
        :hasReply="this.hasReplyFun(user)"
        :hasAvatar="this.hasAvatarFun(user)"
        :noAvatar="noAvatar"
        @like-post="likePost"
        @send-cm="sendCm"
      >
        <div>
          <!-- cm cart -->
          <NestedCart
            v-for="reply in discussions[index].replies"
            :key="reply.id"
            :id="reply.id"
            :name="reply.user.name"
            :avatar="reply.user.avatar"
            :date="this.timeAgo(reply.date)"
            :text="reply.text"
            :like="reply.likes"
            :iLikeIt="reply.iLikedIt"
            @like-cm="likeCm"
          />
        </div>
      </Cart>
    </div>
  </div>
</template>
<script>
import { ref, inject } from "vue";
import baseCart from "../carts/base-cart.vue";
import baseNestedCart from "../carts/base-nested-cart.vue";
import iUserPost from "../components/IUserPost.vue";
import { data } from "../../json/sampleApi.json";
import { user } from "../../json/iUser.json";
import nameGenerate from "../../plugins/nameGenerate";
import timeAgo from "../../plugins/timeFormater";
export default {
  components: { Cart: baseCart, NestedCart: baseNestedCart, iUserPost },
  setup() {
    const usersJson = ref(JSON.parse(JSON.stringify(data)));
    const iUserJson = ref(JSON.parse(JSON.stringify(user)));
    const discussions = ref(usersJson);
    const iUser = ref(iUserJson);
    const hasReply = ref(false);
    const noAvatar = ref("");
    const iCm = ref({
      id: null,
      date: "",
      user: {},
      text: "",
      likes: null,
    });
    //emit from another component
    const post = (iPost) => {
      discussions.value.push(iPost);
    };
    // check if post have reply
    const hasReplyFun = (user) => {
      if (user.replies.length === 0) {
        return false;
      } else {
        return true;
      }
    };
    // check if user have avatar
    const hasAvatarFun = (user) => {
      if (user.user.avatar) {
        return true;
      } else {
        const name = user.user.name;
        noAvatar.value = nameGenerate(name);
        return false;
      }
    };
    // create a new comment
    const sendCm = (cmText, userId) => {
      iCm.value = {
        id: Date.now(),
        date: Date.now(),
        user: iUser.value,
        text: cmText,
        likes: 0,
      };
      const identifiedUser = discussions.value.find(
        (user) => user.id === userId
      );
      identifiedUser.replies.push(iCm.value);
    };
    // like posts
    const likePost = (userId) => {
      const identifiedUser = discussions.value.find(
        (user) => user.id === userId
      );
      identifiedUser.iLikedIt = !identifiedUser.iLikedIt;
      if (identifiedUser.iLikedIt) {
        identifiedUser.likes++;
      } else {
        identifiedUser.likes--;
      }
    };
    // like comments
    const likeCm = (userId) => {
      const ReplyIndex = discussions.value.findIndex((rep) =>
        rep.replies.some((item) => item.id === userId)
      );
      console.log(discussions.value);
      const identifiedUser = discussions.value[ReplyIndex].replies.find(
        (index) => index.id === userId
      );

      identifiedUser.iLikedIt = !identifiedUser.iLikedIt;
      if (identifiedUser.iLikedIt) {
        identifiedUser.likes++;
      } else {
        identifiedUser.likes--;
      }
    };

    return {
      discussions,
      timeAgo,
      likePost,
      iUser,
      post,
      hasReplyFun,
      hasAvatarFun,
      sendCm,
      likeCm,
      noAvatar,
      nameGenerate,
    };
  },
};
</script>
<style>
#post__container {
  background-color: white;
  border-top: 1px solid rgb(201, 201, 201);
  padding: 2rem;
  margin: 0 auto;
}
.iCm {
  margin: 0 4rem;
  position: relative;
}
</style>
