import { Module } from '@nestjs/common'

import { MusicResolver } from './music.resolver'
import { MusicService } from './music.service'

@Module({
  providers: [MusicResolver, MusicService]
})
export class MusicModule {}
