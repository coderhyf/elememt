<template>
  <div class="text_group">
    <div class="input_group" :class="{'is-invalid':error}">
      <input :type="type" :value="value" :placeholder="placeholder"
             :name="name" @input="$emit('input',$event.target.value)">
      <button v-if="btnTitles" :disabled="disabled"
              @click="$emit('btnClick')">{{ btnTitles }}
      </button>
    </div>
    <div v-if="error" class="invalid-feedback">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: "InputGroup",
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: String,
    placeholder: String,
    name: String,
    btnTitles: String,
    disabled: Boolean,
    error: String
  }
}
</script>

<style scoped lang="less">
.input_group {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;

  input {
    height: 10px;
    width: 60%;
    outline: none;
    border: none;
  }

  button {
    border: none;
    outline: none;
    background: #fff;
  }

  button[disabled] {
    color: #aaa;
  }
  .is-invalid {
    border: 1px solid red;
  }
  .invalid-feedback {
    color: red;
    padding-top: 5px;
  }
}
</style>