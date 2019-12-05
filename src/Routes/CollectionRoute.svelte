<script>
  export let params = {};
  import Collection from "../Collection.svelte";
  import { collections } from "../stores.js";
  import CollectionsPanel from "../CollectionsPanel.svelte";
  let permalink;
  let collection = {};
  $: {
    permalink = params.permalink;
    collections.subscribe(values => {
      collection = values.find(col => col.permalink == permalink);
    });
  }
</script>

<CollectionsPanel {params} />
<Collection {collection} />
