import {load as loadReCaptcha} from 'recaptcha-v3'
import _Vue from 'vue'
import {IReCaptchaOptions} from './IReCaptchaOptions'

export function VueReCaptcha(Vue: typeof _Vue, options: IReCaptchaOptions) {
  const plugin = new ReCaptchaVuePlugin()

  plugin.initializeReCaptcha(options.siteKey).then((wrapper) => {
    Vue.prototype.$recaptcha = (action: string): Promise<string> => {
      return wrapper.execute(action)
    }
  })
}

class ReCaptchaVuePlugin {
  public async initializeReCaptcha(siteKey: string) {
    return await loadReCaptcha(siteKey)
  }
}

declare module 'vue/types/vue' {
  // tslint:disable-next-line:interface-name
  interface Vue {
    $recaptcha(action: string): Promise<string>
  }
}
