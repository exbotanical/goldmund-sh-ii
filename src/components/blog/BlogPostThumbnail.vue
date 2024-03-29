<script setup>
import { not, objNotEmptyDeep } from 'js-heuristics';

import { ref, defineProps } from 'vue';

/* Props */
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  imgSrc: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  }
});

/* Data */
const showContent = ref(false);

/* Methods */
function setShowContent () {
  showContent.value = !showContent.value;
}

// if any of the props are null or undefined, trigger error boundary
if (not(objNotEmptyDeep(props))) {
  throw new Error('Rendering error');
}
</script>

<template lang="pug">
.grid__item.blog-post(
  @mouseenter="setShowContent"
  @mouseleave="setShowContent"
)
  img.img-responsive(
    :src="imgSrc"
    alt="blog post thumbnail"
  )
  router-link.blog-post__overlay(:to="`/blog/${slug}`")
    .blog-post__content(v-show="showContent")
      .blog-post__header
        .blog-post__title {{ title }}

</template>

<style lang="scss" scoped>
@mixin overlay-text($height, $weight) {
  font-weight: $weight;
  letter-spacing: $height * 1px;
  line-height: 1;
}

img {
  width: 100%;
}

.blog-post {
  &__overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 20px;
    background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1));

    &:hover {
      background: none;
    }
  }

  &__content {
    position: relative;
    display: flex;
    overflow: hidden;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    padding-right: 1.2em;
    background: linear-gradient($main-accent-color, rgba(5, 240, 150, 0.4));
    float: right;
  }

  &__header {
    max-height: 100%;
    margin-bottom: 2em;
  }

  &__title {
    max-height: 100%;
    margin-bottom: 0.25em;
    color: #fff;
    font-size: 2.2em;
    text-transform: uppercase;

    @include overlay-text(3, 500);
  }
}
</style>
