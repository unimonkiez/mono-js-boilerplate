# mono-js-boilerplate
## Mono repository with true separation between key packages

### Features
  * Lerna 
  * Webpack
    * typescript
    * babel
  * All devtools in package `scripts`, less dirt
  * Clinet
    * Vue
    * Mobx
  * Server
    * Mock server
    * Graphql

### Installation
  * install the dependencies: (**only yarn**)
    ```bash
    yarn
    ```
  * You are now ready!

### Usage
* `npm start` - Start website on [localhost:8080](http://localhost:8080) with **watching**.
* `yarn workspace client run start` - Start website on [localhost:8080](http://localhost:8080) with mock server and **watching**.
* `yarn workspace server run start` - Start website on [localhost:8080](http://localhost:8080) only server without client with **watching**.
* `npm run lint[:report][:error][:fix]` - Run lints usings eslint, recommand to install eslint-plugin on your editor.
* `npm run typecheck` - Run typechecking on project.

### Known issues
* `.vue` files written with typescript should have `.ts.vue` as well as `<script lang="ts"> ... </script>` tag.
* Eslint works from the command lint, but if you want it to work with VsCode, add these to your `User settings`:
  ```json
    "eslint.options": {
        "extensions": [".js", ".jsx", ".ts", ".tsx", ".vue"]
    },
    "eslint.validate": [
        {
            "language": "javascript",
            "autoFix": true
        },
        {
            "language": "javascriptreact",
            "autoFix": true
        },
        {
            "language": "typescript",
            "autoFix": true
        },
        {
            "language": "typescriptreact",
            "autoFix": true
        },
        {
            "language": "vue",
            "autoFix": true
        }
    ]
  ```
