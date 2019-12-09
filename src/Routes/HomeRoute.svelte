<script>
  export let params;
  import CollectionsPanel from "../Components/CollectionsPanel.svelte";
  import Collection from "../Components/Collection.svelte";
  import { collections } from "../stores.js";
  let collectionMain;
  collections.subscribe(values => {
    collectionMain = values.find(el => el.permalink == "frontpage");
  });
</script>

<CollectionsPanel {params} />
<Collection collection={collectionMain} />
