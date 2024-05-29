import { Button } from '@repo/ui/components/nextui/button';
import Image from 'next/image';
import { useState } from 'react';

export default function AboutSection() {
  const [aboutUsHover, setAboutUsHover] = useState(false);

  return (
    <div
      className="section pt-70 bg-cover bg-center px-52 pt-16"
      style={{ backgroundImage: 'url(/static/images/home/about_us_bg.gif)' }}
    >
      <div className="max-w-940 border-3 border-primary py-30 mx-auto rounded-3xl bg-black px-10 pb-12 text-center text-white">
        <h3 className="mb-4 pt-10 text-3xl font-bold  md:mb-6 md:text-3xl lg:text-4xl">
          WHAT IS GAME ROGUE?
        </h3>
        <p className="mb-4 text-lg md:mb-6 md:text-xl">
          Don't know Game Rogue? We've been hosting tournaments since 2018 and would love for you to
          join the experience! We tailor to our community, fulfilling our obligations time-in and
          time-out since our creation.
        </p>
        <p className="mb-4 text-lg md:mb-6 md:text-xl">
          Thank you to our community for giving us the ability to host tournaments and provide the
          next generation of esports globally.
        </p>
        <Image
          src="/static/images/home/game_rogue_text_trans.png"
          className="mx-auto mt-4 h-20 max-w-full md:h-24"
          alt="Game Rogue"
          width={690}
          height={80}
        />
        <Button
          className="bg-primary mt-10 rounded-none px-16 py-8 font-bold text-white transition duration-200 ease-in-out hover:scale-105 md:mt-10"
          onMouseOver={() => setAboutUsHover(true)}
          onMouseOut={() => setAboutUsHover(false)}
          // onClick={() => router.push('/about')}
        >
          {aboutUsHover ? (
            <span className="text-3xl md:text-3xl">ABOUT US</span>
          ) : (
            <span className="text-3xl md:text-3xl">ABOUT US</span>
          )}
        </Button>
      </div>
      <div className="flex items-center justify-center pb-12 pt-16 text-center">
        <button
          onClick={() =>
            document.scrollingElement?.scroll({
              left: 0,
              top: 0,
              behavior: 'smooth',
            })
          }
          className="mx-auto flex flex-col items-center gap-2 bg-transparent hover:bg-transparent hover:opacity-70"
        >
          <Image
            src={'/static/images/home/back_to_top.svg'}
            className="w-18 h-14"
            alt="Back to Top"
            width={80}
            height={120}
          />
          <p className="text-lg text-white">BACK TO TOP</p>
        </button>
      </div>
    </div>
  );
}
