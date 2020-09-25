<script>
  import * as sapper from "@sapper/app";
  import { collections } from "../stores.js";
  let productSlug = $collections.find((col) => col.permalink == "frontpage")
    .products[0].permalink;
  sapper.goto(`/collection/frontpage/${productSlug}`);
</script>
