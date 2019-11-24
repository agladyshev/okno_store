<script>
  export let params = {};
  import Collection from "./Collection.svelte";
  import { collectionsArray } from "./stores.js";
  let permalink = params.permalink;
  let collection = {};
  collectionsArray.subscribe(values => {
    console.log(values);
    // console.log(Array.isArray(values));
    // values.find();
    collection = values.find(col => col.permalink == permalink);
  });
  console.log(permalink);
  console.log(collection);
</script>

<Collection {collection} />
