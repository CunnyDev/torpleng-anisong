import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius'

import { MusicModule } from './gql/music/music.module'

@Module({
  imports: [
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      cache: true,
      autoSchemaFile: true,
      driver: MercuriusDriver
    }),
    MusicModule
  ]
})
export class AppModule {}
