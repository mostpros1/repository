import type { EmailJSResponseStatus } from './models/EmailJSResponseStatus';
import { init } from './methods/init/init';
import { send } from './methods/send/send';
import { sendForm } from './methods/sendForm/sendForm';
export type { EmailJSResponseStatus };
export { init, send, sendForm };
declare const _default: {
    init: (options: string | import("./types/Options").Options, origin?: string) => void;
    send: (serviceID: string, templateID: string, templateParams?: Record<string, unknown> | undefined, options?: string | import("./types/Options").Options | undefined) => Promise<EmailJSResponseStatus>;
    sendForm: (serviceID: string, templateID: string, form: string | HTMLFormElement, options?: string | import("./types/Options").Options | undefined) => Promise<EmailJSResponseStatus>;
};
export default _default;
