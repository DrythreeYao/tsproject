<script lang="tsx">
import { Vue, Component, Prop } from "vue-property-decorator";
import { utils, constants, app } from "../../../core/ts/app";
import { errorHandler } from "../../../core/ts/services";

@Component
export default class MyComponent extends Vue {
  render(h) {
    return (
      <div>
        <a>
          拍场详情<h1>hahah</h1>
        </a>
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>

</style>
