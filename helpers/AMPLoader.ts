import AMPBuilder from "./AMPBuilder";


const AMP_STYLESHEET_ID = "azure-media-player-style";
const AMP_SCRIPT_ID = "azure-media-player-script";

export default class AMPLoader {

    private version: string;
    private skin = 'amp-default';

    constructor(version: string) {
        this.version = version;
    }

    /**
     * Please check here for extra information for versions: https://amp.azure.net/libs/amp/latest/docs/changelog.html
     * @param version By default is set to latest. Please note that for production set the latest "STABLE" version.
     */
    static withVersion(version: string = "latest"): AMPLoader {
        return new AMPLoader(version);
    }
    
    /**
     * Promises to load the needed stylesheets and script tags for azure media player
     * @returns Gives the AMPBuilder to initiate the AMP options and build the player
     */
    load(): Promise<AMPBuilder> {
        return new Promise<AMPBuilder>((resolve, reject) => {
            this.buildStyles()
                .then(() => {
                    this.buildScripts()
                        .then(() => resolve(new AMPBuilder(this.skin)))
                        .catch(() => reject());
                }).catch(() => reject());
        });
    }


    private buildStyles(): Promise<void> {
        return new Promise((resolve, reject) => {
            const stylesheet = document.getElementById(AMP_STYLESHEET_ID);

            if(typeof(stylesheet) !== 'undefined' && stylesheet !== null) resolve();

            const linkTag = document.createElement("link");
            linkTag.href = `//amp.azure.net/libs/amp/${this.version}/skins/${this.skin}/azuremediaplayer.min.css`;
            linkTag.rel = "stylesheet";
            linkTag.id = AMP_STYLESHEET_ID;
            document.head.appendChild(linkTag);
            linkTag.onload = () => {
                resolve();
            };
            linkTag.onerror = () => {
                console.warn("Error loading amp stylesheet");
                reject();
            }
        })
    }

    private buildScripts(): Promise<void> {
        return new Promise((resolve, reject) => {
            const script = document.getElementById(AMP_SCRIPT_ID);

            if(typeof(script) !== 'undefined' && script !== null) resolve();

            const scriptTag = document.createElement("script");
            scriptTag.id = AMP_SCRIPT_ID;
            scriptTag.src = `//amp.azure.net/libs/amp/${this.version}/azuremediaplayer.min.js`;
            document.body.appendChild(scriptTag);
            scriptTag.onload = () => {
                resolve();
            };
            scriptTag.onerror = () => {
                console.warn("Error loading amp script");
                reject();
            };
        });
    }
}