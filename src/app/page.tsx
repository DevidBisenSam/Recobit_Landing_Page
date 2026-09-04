import { HeroFilmScene } from '@/components/scenes/HeroFilmScene';
import { DeploymentModesScene } from '@/components/scenes/DeploymentModesScene';
import { SieveScene } from '@/components/scenes/SieveScene';
import { BookDemoScene } from '@/components/scenes/BookDemoScene';

export default function Home() {
  return (
    <>
      {/* 01. The Cinematic Hook (Screen 1: Hero, Screen 2: Why RecoBit, Screen 3: Industry Demand) */}
      <HeroFilmScene />

      {/* 02. Deployment Flexibility: 3 Ways to Run RecoBit */}
      <DeploymentModesScene />

      {/* 03. The Floating 5-Stream Auto-Classification Sieve */}
      <SieveScene />

      {/* 04. Executive Finale: Dedicated 100vh Book Demo Suite */}
      <BookDemoScene />
    </>
  );
}
