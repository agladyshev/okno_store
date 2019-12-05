<script>
  export let params;
  import CollectionsPanel from "../CollectionsPanel.svelte";
  import Collection from "../Collection.svelte";
  import { collections } from "../stores.js";
  let collectionMain;
  collections.subscribe(values => {
    collectionMain = values.find(el => el.permalink == "frontpage");
  });
</script>

<CollectionsPanel {params} />
<Collection collection={collectionMain} />
