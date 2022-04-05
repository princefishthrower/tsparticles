import { ClickMode } from "../../../Enums/Modes/ClickMode";
import type { Container } from "../../../Core/Container";
import { ExternalInteractorBase } from "../../../Core/Utils/ExternalInteractorBase";
import { itemFromArray } from "../../../Utils/Utils";

/**
 * Particle attract manager
 * @category Interactions
 */
export class Pusher extends ExternalInteractorBase {
    handleClickMode: (mode: ClickMode | string) => void;

    constructor(container: Container) {
        super(container);

        this.handleClickMode = (mode): void => {
            if (mode !== ClickMode.push) {
                return;
            }

            const container = this.container;
            const options = container.actualOptions;
            const pushNb = options.interactivity.modes.push.quantity;

            if (pushNb <= 0) {
                return;
            }

            const pushOptions = options.interactivity.modes.push;
            const group = itemFromArray([undefined, ...pushOptions.groups]);
            const groupOptions = group !== undefined ? container.actualOptions.particles.groups[group] : undefined;

            container.particles.push(pushNb, container.interactivity.mouse, groupOptions, group);
        };
    }

    isEnabled(): boolean {
        return true;
    }

    reset(): void {
        // do nothing
    }

    async interact(): Promise<void> {
        // do nothing
    }
}