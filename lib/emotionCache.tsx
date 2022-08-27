import { createEmotionCache } from "@mantine/core";
// import createCache, { Options as CacheOptions } from "@emotion/cache";
// import { StyleSheet, Options } from "@emotion/sheet";

// export const createEmotionCache = (options: CacheOptions) => {
//   const cache = createCache(options);

//   /**
//    * A custom styleSheet is used here because emotion's Global component creates a separate styleSheet,
//    * making some of the cache's options ineffective, like 'prepend' and 'insertionPoint',
//    * details: https://github.com/emotion-js/emotion/issues/2790
//    */
//   class MyStyleSheet extends StyleSheet {
//     constructor(options?: Options) {
//       super(options);
//       // hack emotion's Global new styleSheet
//       // @ts-ignore
//       this.prepend = cache.sheet.prepend;
//       // @ts-ignore
//       this.insertionPoint = cache.sheet.insertionPoint;
//     }
//   }

//   const isBrowser = typeof document !== "undefined";
//   let container: Node;
//   if (isBrowser) {
//     container = options.container || document.head;
//   }
//   // @ts-ignore
//   cache.sheet = new MyStyleSheet({
//     key: options.key,
//     // @ts-ignore
//     container: container,
//     nonce: options.nonce,
//     speedy: options.speedy,
//     prepend: options.prepend,
//     insertionPoint: options.insertionPoint,
//   });

//   return cache;
// };

export const emCache = createEmotionCache({
  key: "mantine",
  prepend: false,
  //@ts-ignore
  // insertionPoint: globalThis.document?.querySelector(
  //   'meta[name="emotion-insertion-point"]'
  // ),
});
