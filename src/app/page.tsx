import { Hero } from '@/components/sections/Hero';
import { Prequel } from '@/components/sections/Prequel';
import { Cartoon } from '@/components/sections/Cartoon';
import { Weeks } from '@/components/sections/Weeks';
import { Domains } from '@/components/sections/Domains';
import { Graduation } from '@/components/sections/Graduation';
import { Finale } from '@/components/sections/Finale';
import { Memes } from '@/components/sections/Memes';
import { Credits } from '@/components/sections/Credits';
import { Footer } from '@/components/sections/Footer';

export default function Home(){
  return <>
    <a className="skip-link" href="#prequel">Skip to the story</a>
    <main id="story">
      <Hero/>
      <Prequel/>
      <Cartoon/>
      <Weeks/>
      <Domains/>
      <Graduation/>
      <Finale/>
      <Memes/>
      <Credits/>
    </main>
    <Footer/>
  </>;
}
