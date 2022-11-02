import { Extra, Database } from './index.js'
import { Context, SessionFlavor } from 'grammy'
import { I18nContextFlavor, TemplateData } from '@grammyjs/i18n'

interface Custom<C extends Context> {
	text: (
		text: string,
		templateData?: TemplateData,
		extra?: Extra
	) => ReturnType<C['reply']>
	db: Database
	admins: number[]
	groups: number[]
}

type CustomContextMethods = Custom<Context>

type CustomContext = Context &
	Custom<Context> &
	I18nContextFlavor &
	SessionFlavor<{}>

export { CustomContext, CustomContextMethods }
