import { Button } from '@repo/ui/components/nextui/button';
import { Tooltip } from '@repo/ui/components/nextui/tooltip';
import Image from 'next/image';
import { useState } from 'react';
import {
  MdAddComment,
  MdArrowLeft,
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowUp,
  MdMessage,
  MdQuestionAnswer,
  MdSell,
} from 'react-icons/md';

const Messages = () => {
  const [open, setOpen] = useState(false);
  const [chatting, setChatting] = useState(0);

  const onToggleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="fixed bottom-0 right-20 z-50 min-w-[416px]">
      <div className="bg-foreground flex cursor-pointer items-center justify-between gap-2 rounded-b-none rounded-t-[5px] px-4 py-3 text-xl">
        <div
          className="absolute left-0 top-0 z-0 size-full bg-transparent"
          onClick={onToggleOpen}
        ></div>
        <div className="flex items-center gap-1 text-white">
          <MdMessage />
          <h6 className="px-1 text-base">Messages</h6>
        </div>
        <div className="relative flex items-center gap-1 text-white">
          <Tooltip content="Tickets" className="text-xs text-white" placement="top">
            <button className="px-2 py-1">
              <MdSell />
            </button>
          </Tooltip>
          <Tooltip content="Requests" className="text-xs text-white" placement="top">
            <button className="px-2 py-1">
              <MdQuestionAnswer />
            </button>
          </Tooltip>
          <Tooltip content="Create" className="text-xs text-white" placement="top">
            <button className="px-2 py-1">
              <MdAddComment />
            </button>
          </Tooltip>
          <button onClick={onToggleOpen} className="px-2 py-1">
            {open ? <MdKeyboardDoubleArrowDown /> : <MdKeyboardDoubleArrowUp />}
          </button>
        </div>
      </div>

      {open && (
        <div className="h-[500px] overflow-auto bg-white">
          {chatting === 0 ? (
            <div className="flex flex-col">
              <Button className="flex cursor-pointer justify-start gap-4 rounded-none bg-white py-8 text-black hover:bg-orange-200">
                <Image src="/static/images/home/dark_logo.png" alt="" width={50} height={50} />
                Karnage
              </Button>
            </div>
          ) : (
            <div className="h-[500px]">
              <button
                className="flex h-[40px] w-full items-center justify-start border-b border-solid border-[rgba(255,255,255,.2)] text-[20px] text-black"
                onClick={() => {
                  setChatting(0);
                }}
              >
                <MdArrowLeft />
                Back
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Messages;
