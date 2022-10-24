import { Resolver, Query } from '@nestjs/graphql'

// import { MusicService } from './music.service'

@Resolver()
export class MusicResolver {
  // constructor(private readonly service: MusicService) {}

  @Query(() => String)
  hello(): string {
    return 'hello world'
  }
}
