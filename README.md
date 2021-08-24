# Fluent Azure Media Player

This package is a helper to import the AMP script programmatically into the frontend application. It is mostly useful for frameworks like vue, react and angular where you may not want to manipulate the index.html file yourself and want to create components which is going to benefit from `Azure Media Player`.

**Note:** typescript supported.

## How it works?

1. Please install the package as below.

    ```
    npm i fluent-amp
    ```
2. Import the package into your component/project.
    ```
    import AMPLoader from 'fluent-amp';
    ```
3. Initiate the script like below
    ```
            AMPLoader
            .withVersion() //by default is latest (Not production recommended)
            .load()
            .then(builder => {
                builder.options.fluid = true;
                builder.options.autoplay = true;
                //Other options will appear here
                builder
                    .forElement('test')
                    .build({
                        src: "YOUR_ASSET_ADDRESS",
                        type: "YOUR_USING_PROTOCOL"
                    });
            })
    ```

# Plugins
The way that AMP handles the plugins is first by registering them in the global `amp` instance and then use the registered plugin in the player instance.

This package gives you an interface for building your plugin. You should use the `AMPPlugin<TOptions>` interface to implement your plugins and then on registering the plugins the `AMPBuilder` will give use the method `usePlugin` to install your plugins on a player instance.

Let's assume you have implemented the following plugin.

```
export default class MyPlugin implements AMPPlugin {
    name: 'MyPlugin'
    install() {
        amp.plugin(this.name, function() => {
            const player = this;
            //Write your plugin logic.
        });
    }
}
```

and now you use it as below.

```
.
.
.
ampBuilder.usePlugin(new MyPlugin());
```

Please note that it is totally fine the way that AMP natively registers plugins but the issue is when you want to use full type safety(even this method still needs more improvement) and you need to give this a structure so it will be possible to install your plugin just by one method instead of registering it once and adding it to the player's plugin collection.


# TODO
1. **(Typescript related)** Export the AMP type declerations with the package so the `options` doesn't get an `any` type.
2. <strike>**(General purpose)** Add a plugin installer to make it more fluent to add plugin packages to the project and inject them into the amp instance.</strike>

