<script lang="tsx">
// import Vue from "vue";

// export default {
//   data: function() {
//     return {
//       a: 11
//     };
//   },
//   methods: {
//     test: function() {
//       console.log(12312);
//     }
//   },
//   render: function(h) {
//     return <input type="text" v-model={this.a} onKeyup:enter={this.test}/>;
//   }
// };
import { Vue, Component, Prop } from "vue-property-decorator";
import { utils, constants, app } from "core/ts/app";
import { errorHandler } from "core/ts/services";
import { Input, Button } from "element-ui";

@Component
export default class MyComponent extends Vue {
  inputValue = 100;

  handleClick() {
    console.log("inputValue", this.inputValue);
  }
  handleKeyup(e: KeyboardEvent) {
    if (e.keyCode !== 13) return;
    console.log("enter", this.inputValue);
  }
  render(h) {
    return (
      <div>
        {this.inputValue}
        <input
          type="text"
          v-model={this.inputValue}
          onKeyup={this.handleKeyup}
        />
        <button onClick={this.handleClick}>test</button>
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>

</style>
