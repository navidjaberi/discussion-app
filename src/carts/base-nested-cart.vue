<template>
  <div id="container">
    <div class="line"></div>
    <div class="avatar__container">
      <img :src="avatar" class="avatar" alt="Avatar" />
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
        <button type="button" @click="likeCm" :class="{ like: iLikeIt }">
          <i
            class="fa fa-thumbs-up"
            style="font-size: 1.4rem"
            aria-hidden="true"
          ></i
          ><span style="font-size: 1rem">{{ like }}</span>
        </button>
      </div>
    </section>
  </div>
</template>

<script>
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
  },
  setup(props, contex) {
    const likeCm = () => {
      contex.emit("like-cm", props.id);
    };
    return { likeCm };
  },
};
</script>

<style scoped>
#container {
  margin-left: 4rem;
  width: 80%;
}
.line {
  position: absolute;
  width: 2px;
  height: 100%;
  background-color: rgb(201, 201, 201);
  left: -8px;
}
</style>
