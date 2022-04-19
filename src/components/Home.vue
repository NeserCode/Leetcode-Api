<template>
  <div class="home">
    <div class="main">
      <div class="typedContainer">
        <input
          type="text"
          spellcheck="false"
          placeholder=" "
          id="session"
          class="cookie"
          v-model="cookie.session"
        /><label class="lab" for="session"> 🖊 Cookie leetcode_session </label>
      </div>
      <div class="typedContainer">
        <input
          type="text"
          spellcheck="false"
          placeholder=" "
          id="csrftoken"
          class="cookie"
          v-model="cookie.csrftoken"
        /><label class="lab" for="csrftoken"> 🖊 Cookie x-csrftoken </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  mounted() {
    this.init();
  },
  data() {
    return {
      cookie: {
        session: null,
        csrftoken: null,
      },
    };
  },
  methods: {
    init: function () {
      console.log(this);
    },
  },
};
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  padding: 3rem 0;
  padding-top: 6rem;
}

.typedContainer {
  position: relative;
  width: 40rem;
  margin: 0 auto;
  margin-bottom: 4rem;
}
.cookie {
  width: 60%;
  font-size: 1.25rem;
}

.lab {
  position: absolute;
  top: 0.85rem;
  left: 8rem;
  padding-bottom: 0.5rem;
  display: inline-block;
  font-size: 1.5rem;
  transition: all ease-in-out 0.4s;
}
</style>

<style>
input {
  display: inline-block;
  outline: none;
  border: none;
  border-bottom: #aaa solid 2px;
  color: #aaa;
  background-color: transparent;
  transition: all ease-in-out 0.2s;
  padding-bottom: 8px;
  padding-left: 4px;
  opacity: 0;
}
input:focus {
  border-bottom: #333 solid 2px;
  color: #333;
  opacity: 1;
}
input:not(:focus) + label {
  color: #ccc;
  transform: translateX(0%);
}
input:focus + label {
  transform: translateY(-150%);
  font-weight: bolder;
}
input:not(:focus):not(:placeholder-shown) {
  opacity: 1;
}
input:not(:focus):not(:placeholder-shown) + label {
  opacity: 0;
}
</style>