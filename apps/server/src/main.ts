import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import {
	FastifyAdapter,
	NestFastifyApplication
} from '@nestjs/platform-fastify'

import { AppModule } from './app.module'
//
;(async function () {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
		{
			bodyParser: true,
			cors: { origin: '*' }
		}
	)

	await app.listen(4000, '0.0.0.0')

	console.log(`\n\n Server is listening at http://0.0.0.0:4000 (@ ╯﹏╰)♡ \n\n`)
})()
