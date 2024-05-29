import Image from 'next/image';
import { useEffect, useState } from 'react';

// interface TitleProps {
//   active: boolean;
//   children: React.ReactNode;
// }
interface ContentProps {
  active: boolean;
  children: React.ReactNode;
}

// const TitleComponent = ({ active, children }: TitleProps) => {
//   return (
//     <h2
//       className={`absolute left-1/2 -translate-x-1/2 text-5xl uppercase${
//         active ? 'opacity-100' : 'opacity-0'
//       } transition-all duration-1000`}
//     >
//       {children}
//     </h2>
//   );
// };

const ContentComponent = ({ active, children }: ContentProps) => {
  return (
    <div className="flex justify-center">
      <h4
        className={`absolute text-2xl uppercase ${
          active ? 'opacity-100' : 'opacity-0'
        } transition-all duration-1000`}
      >
        {children}
      </h4>
    </div>
  );
};

export default function BenefitSection() {
  const [activeContentIndex, setActiveContentIndex] = useState(0);
  const [activeContentIndex1, setActiveContentIndex1] = useState(0);
  const [activeContentIndex2, setActiveContentIndex2] = useState(0);
  const [activeContentIndex3, setActiveContentIndex3] = useState(0);
  const [activeContentIndex4, setActiveContentIndex4] = useState(0);
  const [activeContentIndex5, setActiveContentIndex5] = useState(0);
  const [activeContentIndex6, setActiveContentIndex6] = useState(0);

  useEffect(() => {
    let contentIntervalId: NodeJS.Timeout,
      contentIntervalId1: NodeJS.Timeout,
      contentIntervalId2: NodeJS.Timeout,
      contentIntervalId3: NodeJS.Timeout,
      contentIntervalId4: NodeJS.Timeout,
      contentIntervalId5: NodeJS.Timeout,
      contentIntervalId6: NodeJS.Timeout;

    setTimeout(() => {
      contentIntervalId = setInterval(() => {
        setActiveContentIndex((prev) => (prev + 1) % 6);
      }, 3000);
      contentIntervalId1 = setInterval(() => {
        setActiveContentIndex1((prev) => (prev + 1) % 5);
      }, 3000);
      contentIntervalId2 = setInterval(() => {
        setActiveContentIndex2((prev) => (prev + 1) % 3);
      }, 3000);
      contentIntervalId3 = setInterval(() => {
        setActiveContentIndex3((prev) => (prev + 1) % 5);
      }, 3000);
      contentIntervalId4 = setInterval(() => {
        setActiveContentIndex4((prev) => (prev + 1) % 3);
      }, 3000);
      contentIntervalId5 = setInterval(() => {
        setActiveContentIndex5((prev) => (prev + 1) % 5);
      }, 3000);
      contentIntervalId6 = setInterval(() => {
        setActiveContentIndex6((prev) => (prev + 1) % 4);
      }, 3000);
    }, 500);
    return () => {
      clearInterval(contentIntervalId!);
      clearInterval(contentIntervalId1!);
      clearInterval(contentIntervalId2!);
      clearInterval(contentIntervalId3!);
      clearInterval(contentIntervalId4!);
      clearInterval(contentIntervalId5!);
      clearInterval(contentIntervalId6!);
    };
  }, []);

  return (
    <div className="relative py-16">
      <div id="content" className="px-16 text-center">
        <div className="center relative pb-48 pt-8 font-bold">
          <ContentComponent active={activeContentIndex === 0}>
            <span className="text-6xl text-white">The</span>&nbsp;
            <span className="text-6xl text-black">Cheapest</span>
          </ContentComponent>
          <ContentComponent active={activeContentIndex === 1}>
            <span className="text-6xl text-white">The</span>&nbsp;
            <span className="text-6xl text-black">Fastest</span>
          </ContentComponent>
          <ContentComponent active={activeContentIndex === 2}>
            <span className="text-6xl text-white">The</span>&nbsp;
            <span className="text-6xl text-black">Most Efficient</span>
          </ContentComponent>
          <ContentComponent active={activeContentIndex === 3}>
            <span className="text-6xl text-black">Revolutionary</span>
            <br />
            <span className="text-6xl text-white">Player Solutions</span>
          </ContentComponent>
          <ContentComponent active={activeContentIndex === 4}>
            <span className="text-6xl text-black">Revolutionary</span>
            <br />
            <span className="text-6xl text-white">Team Solutions</span>
          </ContentComponent>
          <ContentComponent active={activeContentIndex === 5}>
            <span className="text-6xl text-black">Revolutionary</span>
            <br />
            <span className="text-6xl text-white">Event Solutions</span>
          </ContentComponent>
        </div>
        <div className="grid grid-cols-1 gap-4 font-bold sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative h-32">
            <ContentComponent active={activeContentIndex1 === 0}>
              <span className="text-4xl text-white">Instant</span>&nbsp;
              <span className="text-4xl text-black">Stream</span>
              <br />
              <span>
                <span className="text-4xl text-black">Editing</span>&nbsp;
                <span className="text-4xl text-white">Software</span>
              </span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex1 === 1}>
              <span className="text-4xl text-white">Productions</span>
              <br />
              <span className="text-4xl text-black">Host & Dashboard</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex1 === 2}>
              <span className="text-4xl text-white">Productions</span>
              <br />
              <span className="text-4xl text-black">Editable Graphics</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex1 === 3}>
              <span className="text-4xl text-white">Stream</span>&nbsp;
              <span className="text-4xl text-black">Templates</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex1 === 4}>
              <span>
                <span className="text-4xl text-white">Instant</span>&nbsp;
                <span className="text-4xl text-black">Video</span>
              </span>
              <br />
              <span>
                <span className="text-4xl text-black">Editing</span>&nbsp;
                <span className="text-4xl text-white">Software</span>
              </span>
            </ContentComponent>
          </div>
          <div className="relative h-32">
            <ContentComponent active={activeContentIndex2 === 0}>
              <span className="text-4xl text-white">Instant</span>&nbsp;
              <span className="text-4xl text-black">Team</span>
              <br />
              <span className="text-4xl text-white">Statistics</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex2 === 1}>
              <span className="text-4xl text-white">Instant</span>&nbsp;
              <span className="text-4xl text-black">Event</span>
              <br />
              <span className="text-4xl text-white">Statistics</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex2 === 2}>
              <span className="text-4xl text-white">Instant</span>&nbsp;
              <span className="text-4xl text-black">Player</span>
              <br />
              <span className="text-4xl text-white">Statistics</span>
            </ContentComponent>
          </div>
          <div className="relative h-32">
            <ContentComponent active={activeContentIndex3 === 0}>
              <span className="text-4xl text-white">Instant Opponent</span>
              <br />
              <span className="text-4xl text-black">Communication</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex3 === 1}>
              <span className="text-4xl text-white">Event Stuff</span>
              <br />
              <span className="text-4xl text-black">Support Options</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex3 === 2}>
              <span className="text-4xl text-white">Add Rulebooks &</span>
              <br />
              <span className="text-4xl text-black">Custom Regulations</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex3 === 3}>
              <span className="text-4xl text-white">Easily Register</span>
              <br />
              <span className="text-4xl text-black">Event Licenses</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex3 === 4}>
              <span className="text-4xl text-white">Instant Game</span>
              <br />
              <span className="text-4xl text-black">Match-Making</span>
            </ContentComponent>
          </div>
          <div className="relative h-32">
            <ContentComponent active={activeContentIndex4 === 0}>
              <span className="text-4xl text-white">Support</span>
              <br />
              <span className="text-4xl text-black">Nonprofits</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex4 === 1}>
              <span className="text-4xl text-white">Crowd-funding</span>
              <br />
              <span className="text-4xl text-black">Contributions</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex4 === 2}>
              <span className="text-4xl text-white">Link Your</span>
              <br />
              <span className="text-4xl text-black">Existing Community</span>
            </ContentComponent>
          </div>
          <div className="relative h-32">
            <ContentComponent active={activeContentIndex5 === 0}>
              <span className="text-4xl text-white">Find</span>&nbsp;
              <span className="text-4xl text-black">Players</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex5 === 1}>
              <span className="text-4xl text-white">Find</span>&nbsp;
              <span className="text-4xl text-black">Teams</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex5 === 2}>
              <span className="text-4xl text-white">Find</span>&nbsp;
              <span className="text-4xl text-black">Events</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex5 === 3}>
              <span className="text-4xl text-white">Find</span>
              <br />
              <span className="text-4xl text-black">Production Staff</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex5 === 4}>
              <span className="text-4xl text-white">Find</span>&nbsp;
              <span className="text-4xl text-black">Sponsors</span>
            </ContentComponent>
          </div>
          <div className="relative h-32">
            <ContentComponent active={activeContentIndex6 === 0}>
              <span className="text-4xl text-white">Esports</span>
              <br />
              <span className="text-4xl text-black">Social Media</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex6 === 1}>
              <span>
                <span className="text-4xl text-white">Live</span>&nbsp;
                <span className="text-4xl text-black">Games</span>
              </span>
              <br />
              <span className="text-4xl text-black">& Stream Chats</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex6 === 2}>
              <span className="text-4xl text-white">Instant Social</span>
              <br />
              <span className="text-4xl text-black">Media Manager</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex6 === 3}>
              <span className="text-4xl text-white">Social Media</span>
              <br />
              <span className="text-4xl text-black">Editable Templates</span>
            </ContentComponent>
          </div>
        </div>
      </div>
      <div className="pt-20">
        <div className="border-t-3 pby-8 mx-auto flex h-32 w-64  justify-center border-white">
          <Image
            className="object-contain brightness-0"
            alt="gr-letters"
            src="/static/images/home/gr_letters.png"
            width={120}
            height={100}
          />
        </div>
      </div>
    </div>
  );
}
