/* eslint-disable no-unused-vars,no-underscore-dangle */
declare const __PROD__: boolean;
declare const __DEV__: boolean;
declare const __DEVSERVER__: boolean;
declare const __DEVTOOLS__: boolean;
declare const __VERSION__: string;
/* eslint-enable no-unused-vars,no-underscore-dangle */

declare module '*.vue' {
  import Vue from 'vue';

  export default Vue;
}
