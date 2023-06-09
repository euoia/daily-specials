<template>
  <div class="daily-special">
    <div class="page-container" ref="pageContainer">
      <div class="page" :style="pageStyle" ref="page">
        <div class="content-area">
          <div class="title">
            {{ title }}
          </div>
          <div class="subtitle">
            {{ subtitle }}
          </div>
          <div class="text">
            {{ text }}
          </div>
          <div class="price">
            {{ price }}
          </div>
        </div>
      </div>
    </div>

    <div class="controls">
      <ds-box color="red">
        <ul>
          <li>Print on A5.</li>
          <li>Set print margins to None.</li>
        </ul>
      </ds-box>

      <ds-css-control v-model="gap" label="Gap" type="range" min="0" max="8" step="0.1" />

      <ds-box color="green">
        <ds-css-control v-model="paddingX" label="Padding horizontal" type="range" min="0" max="4" step="0.1"
          is-grouped />
        <ds-css-control v-model="paddingY" label="Padding vertical" type="range" min="0" max="10" step="0.1" is-grouped />
      </ds-box>

      <text-control v-model:text="title" v-model:size="titleSize" v-model:line-height="titleLineHeight" label="Title" />

      <text-control v-model:text="subtitle" v-model:size="subtitleSize" v-model:line-height="subtitleLineHeight"
        label="Subtitle" />

      <text-control v-model:text="text" v-model:size="textSize" v-model:line-height="textLineHeight" label="Text"
        is-text-area />

      <text-control v-model:text="price" v-model:size="priceSize" v-model:line-height="priceLineHeight" label="Price" />

      <button @click="download">Download</button>
    </div>
  </div>
</template>

<script>
import "@fontsource/bodoni-moda";
import html2canvas from "html2canvas";

export default {
  data() {
    return {
      gap: 1,
      paddingX: 1,
      paddingY: 1,
      title: "Today's Special",
      titleSize: 130,
      titleLineHeight: 0.8,
      subtitle: "Crispy Sticky Sweet Chilli Beef Salad",
      subtitleSize: 54,
      subtitleLineHeight: 1.2,
      text: "Prime fillet steak, crispy and sticky, garnished with sweet pepper and red onion with chips and salad!",
      textSize: 38,
      textLineHeight: 1.2,
      price: "£8.95",
      priceSize: 69,
      priceLineHeight: 1,
      maxPageHeight: null,
      pageContainerResizeObserver: null,
      pageHeight: null,
    };
  },
  computed: {
    pageStyle() {
      return {
        ["--gap"]: `${this.gap}em`,
        ["--padding-x"]: `${this.paddingX}cm`,
        ["--padding-y"]: `${this.paddingY}cm`,
        ["--title-size"]: `${this.titleSize}px`,
        ["--title-line-height"]: `${this.titleLineHeight}em`,
        ["--subtitle-size"]: `${this.subtitleSize}px`,
        ["--subtitle-line-height"]: `${this.subtitleLineHeight}em`,
        ["--text-size"]: `${this.textSize}px`,
        ["--text-line-height"]: `${this.textLineHeight}em`,
        ["--price-size"]: `${this.priceSize}px`,
        ["--price-line-height"]: `${this.priceLineHeight}em`,
      };
    },
  },
  methods: {
    scalePage() {
      console.log(`Scaling page.`);
      if (this.pageHeight > this.maxPageHeight) {
        const scale = this.maxPageHeight / this.pageHeight;

        console.log(
          `Applying transformation to page: scale(${scale}), max height: ${this.maxPageHeight}px`
        );
        this.$refs.page.style.transform = `scale(${scale})`;
      } else {
        console.log(`Removing transformation from page`);
        this.$refs.page.style.transform = null;
      }
    },
    removeScaling() {
      console.log(`Removing scaling from page.`);
      this.$refs.page.style.transform = null;
    },
    download() {
      document.querySelector(".page").classList.add("border-hidden");
      html2canvas(this.$refs.page).then(function (canvas) {
        const a = document.createElement("a");
        // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
        a.href = canvas.toDataURL();
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const filename = `daily-specials-${year}-${month}-${day}_${hours}-${minutes}-${seconds}.png`;
        a.download = filename;

        a.click();
        document.querySelector(".page").classList.remove("border-hidden");
      });
    },
  },
  mounted() {
    this.pageContainerResizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      const { height, width } = entry.contentRect;

      console.log(`Max page height: ${height}px`);

      // For some reason, mobile Safari scales to 0.
      this.maxPageHeight = height;
      this.scalePage();
    });

    this.pageContainerResizeObserver.observe(this.$refs.pageContainer);

    this.pageHeight = this.$refs.page.clientHeight;
    this.pageWidth = this.$refs.page.clientWidth;

    const beforePrint = () => {
      console.log("Functionality to run before printing.");
      this.removeScaling();
    };

    const afterPrint = () => {
      this.scalePage();
    };

    if (window.matchMedia) {
      var mediaQueryList = window.matchMedia("print");
      mediaQueryList.addListener(function (mql) {
        if (mql.matches) {
          beforePrint();
        } else {
          afterPrint();
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.daily-special {
  display: flex;
  gap: 1em;
  justify-content: center;
  align-items: center;

  .page-container {
    .page {
      position: relative;
      color: black;
      background-image: url("/img/background.png");
      background-size: cover;

      // A5.
      width: 148.5mm;
      height: 210mm;
      border: 1px solid #000;

      &.border-hidden {
        border: none;
      }

      // These are the margins of the printable area inside the page.
      // They haven't been tested and probably vary according to the printer.
      // There is a coupling here to the background image.
      padding-left: 8mm;
      padding-right: 8mm;
      padding-top: 10mm;
      padding-bottom: 10mm;

      display: flex;
      align-items: center;
      justify-content: center;

      @media print {
        border: none;
        position: absolute;
        top: 0;
        left: 0;

        // A5.
        width: 148.5mm;
        height: 210mm;
      }

      .content-area {
        width: 132mm;
        height: 190mm;
        position: relative;

        display: flex;
        align-items: center;
        flex-direction: column;
        text-align: center;
        gap: var(--gap);

        padding-left: var(--padding-x);
        padding-right: var(--padding-x);
        padding-top: var(--padding-y);
        padding-bottom: var(--padding-y);

        .title {
          font-family: "Brush Script";
          font-size: var(--title-size);
          line-height: var(--title-line-height);
        }

        .subtitle {
          font-family: "Bodoni 72";
          font-size: var(--subtitle-size);
          line-height: var(--subtitle-line-height);
        }

        .text {
          font-family: "Bodoni 72 Book Italic";
          font-style: italic;

          font-size: var(--text-size);
          line-height: var(--text-line-height);
        }

        .price {
          position: absolute;
          bottom: 1cm;
          font-family: "Bodoni 72";
          font-size: var(--price-size);
          line-height: var(--price-line-height);
        }
      }
    }
  }

  .controls {
    font-family: "Maven Pro";
    display: flex;
    flex-direction: column;
    gap: 1em;
    min-width: 400px; // TODO: Responsive.
    margin-bottom: 2em;

    .slider {
      width: 100%;
    }

    @media print {
      display: none;
    }
  }
}
</style>
