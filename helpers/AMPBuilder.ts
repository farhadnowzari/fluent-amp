import { v4 as uuid4 } from 'uuid';

export default class AMPBuilder {

    private elementId: string | null = null;
    options: amp.Player.Options = {};

    constructor() {
        this.options.techOrder = ['AzureHtml5JS'];
    }

    forElement(el: HTMLVideoElement | string): AMPBuilder {
        if (typeof el === 'string') {
            this.elementId = el;
            return this;
        }
        if (el.id) {
            this.elementId = el.id;
        } else {
            el.id = `player-${uuid4().replaceAll('-', '')}`;
            this.elementId = el.id;
        }
        return this;
    }

    build(src: amp.Player.Source): Promise<amp.Player> {
        return new Promise<amp.Player>((resolve, reject) => {
            const player = amp(this.elementId, this.options, () => {
                resolve(player);
            }).src([src]);

        });
    }

}