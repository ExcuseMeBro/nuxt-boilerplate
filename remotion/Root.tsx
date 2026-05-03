import { Composition } from 'remotion'
import { IntroComposition } from './IntroComposition'

export const RemotionRoot = () => {
  return (
    <Composition
      id="Intro"
      component={IntroComposition}
      durationInFrames={150}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{
        title: 'Nuxt Boilerplate',
        subtitle: 'REST • JWT • i18n • Biome • Remotion'
      }}
    />
  )
}
