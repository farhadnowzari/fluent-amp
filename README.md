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

# TODO
1. **(Typescript related)** Export the AMP type declerations with the package so the `options` doesn't get an `any` type.
2. **(General purpose)** Add a plugin installer to make it more fluent to add plugin packages to the project and inject them into the amp object.

