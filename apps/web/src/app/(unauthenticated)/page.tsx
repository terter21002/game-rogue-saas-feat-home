'use client';

import { Button } from '@repo/ui/components/nextui/button';
import { Link } from '@repo/ui/components/nextui/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Messages from '../../components/message/Messages';
import AboutSection from '@/components/Homepage/aboutSection';
import BenefitSection from '@/components/Homepage/benefitSection';
import CarouselSection from '@/components/Homepage/carouselSection';
import Footer from '@/components/Homepage/Footer';
import NextGenerationSection from '@/components/Homepage/nextGenerationSection';
import SponsoredBySection from '@/components/Homepage/sponsoredBySection';
import DefaultLayoutComponent from '@/components/layout/default';

export default function Web(): JSX.Element {
  const [banner, setBanner] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBanner((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <DefaultLayoutComponent>
      <div className="pt-16">
        <div className="relative h-14">
          <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500">
            {banner % 2 === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-white">
                <Image
                  src="/static/images/home/grlogo_o_b.webp"
                  alt="Logo"
                  width={57}
                  height={57}
                />
              </div>
            )}
            <div
              className={`bg-primary absolute inset-0 flex items-center justify-center ${banner !== 1 && banner !== 3 && banner !== 5 ? 'opacity-0' : 'opacity-100'}`}
            >
              {banner === 1 && (
                <Link href="">
                  <a className="text-center text-lg font-bold text-white">
                    TOO MANY HEADACHES FROM HOSTING EVENTS? WE GOT YOU COVERED, CLICK HERE!
                  </a>
                </Link>
              )}
              {banner === 3 && (
                <Link href="">
                  <a className="text-center text-lg font-bold text-white">
                    GET 10 PIECES OF TEAM MERCH FOR A FRACTION OF THE COST, TAILORED FOR YOU!
                  </a>
                </Link>
              )}
              {banner === 5 && (
                <Link href="">
                  <a className="text-center text-lg font-bold text-white">
                    LOOKING TO START A TEAM? CLICK HERE!
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div
          className="relative flex h-screen items-center justify-center overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: 'url(/static/images/home/back1.png)' }}
        >
          <video
            className="absolute left-0 top-0 object-cover"
            autoPlay
            loop
            muted
            poster="/static/images/home/back1.png"
          >
            <source src="/static/videos/intro.mp4" type="video/mp4" />
          </video>
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 pt-20 text-center">
            <div className="text-6xl font-bold italic leading-tight text-black">
              PLUS PLANS
              <br />
              AVAILABLE JULY 25TH
            </div>
            <div className="mt-5 flex justify-center">
              <Button className="bg-foreground rounded-none px-5 py-9 text-5xl font-bold text-white">
                SUBSCRIBE
              </Button>
            </div>
          </div>
        </div>

        <CarouselSection />
        <NextGenerationSection />
        <div className="bg-primary relative">
          <BenefitSection />
        </div>
        <AboutSection />
        <SponsoredBySection />
        <Footer />
        <Messages />
      </div>
    </DefaultLayoutComponent>
  );
}
