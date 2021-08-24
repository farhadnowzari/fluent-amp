import { v4 as uuid4 } from 'uuid';
import AMPPlugin from '../interfaces/AMPPlugin';

export default class AMPBuilder {

    private elementId: string | null = null;
    private skin: string;
    options: amp.Player.Options = {};
    plugins: { [id: string]: unknown } = {};
    

    constructor(skin: string) {
        this.options.techOrder = ['AzureHtml5JS'];
        this.skin = skin;
    }

    forElement(el: HTMLVideoElement | string): AMPBuilder {
        if (typeof el === 'string') {
            this.elementId = el;
            this.adjustCSSClasses();
            return this;
        }
        if (el.id) {
            this.elementId = el.id;
        } else {
            el.id = `player-${uuid4().replaceAll('-', '')}`;
            this.elementId = el.id;
        }
        this.adjustCSSClasses();
        return this;
    }

    private adjustCSSClasses(): void {
        const element = document.getElementById(this.elementId as string);
        
        if(!element) return;
        
        element.classList.add("azuremediaplayer", `${this.skin}-skin`);
    }

    usePlugin(...params: AMPPlugin[]): AMPBuilder {
        params
        .filter(plugin => !!plugin)
        .forEach(plugin => {
            plugin.install();
            this.plugins[plugin.name] = plugin.options;
        });
        this.options.plugins = this.plugins;
        return this;
    }

    build(src: amp.Player.Source): Promise<amp.Player> {
        if(!this.elementId) {
            throw "The VideoElementId cannot be null, please first initialize it";
        }
        return new Promise<amp.Player>((resolve, reject) => {
            const player = amp(this.elementId, this.options, () => {
                resolve(player);
            }).src([src]);
        });
    }

}