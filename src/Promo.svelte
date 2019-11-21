<style>
  section.promo {
    grid-area: promo;
    background-color: yellow;
    text-align: center;
    border: dotted black 1px;
  }

  .marquee {
    overflow: hidden;
    position: relative;
  }

  .marquee div {
    display: block;
    width: 200%;
    position: absolute;
    overflow: hidden;
    animation: marquee 8s linear infinite;
  }

  .marquee span {
    float: left;
    width: 50%;
  }

  @keyframes marquee {
    0% {
      left: 0;
    }
    100% {
      left: -100%;
    }
  }
</style>

<section class="promo marquee">
  <div>
    <span>Бесплатная доставка по Москве</span>
    <span>Бесплатная доставка по Москве</span>
  </div>
</section>
