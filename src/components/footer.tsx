"use client"

import Image from "next/image"
import Float from "../fancy/components/blocks/float"
import ScrambleLink from "./scramble-link"

export default function Footer() {
  return (
    <div className="relative mb-16 flex h-16 w-full items-center justify-center px-8 sm:mt-16 sm:mb-4">
      <div className="text-center text-slate-700 text-xs sm:text-lg dark:text-slate-300">
        © {new Date().getFullYear()} Ahmad Zakiy. All rights reserved. Built
        with{" "}
        <span className="group/item relative cursor-pointer">
          <ScrambleLink
            className="text-slate-700 text-xs sm:text-lg dark:text-slate-300"
            href="https://en.wikipedia.org/wiki/Vibe_coding"
            maxIterations={15}
            scrambleSpeed={50}
            target="_blank"
            text="Vibe coding"
          />
          <div className="-right-10 invisible absolute bottom-10 z-10 group-hover/item:visible">
            <Float amplitude={[5, 10, 10]} rotationRange={[5, 5, 10]} speed={3}>
              <div className="relative h-32 w-32 cursor-zoom-in overflow-hidden rounded-full shadow-2xl transition-transform duration-200 hover:scale-105 sm:h-40 sm:w-40 md:h-48 md:w-48">
                <Image
                  alt="Ahmad Zakiy"
                  className="absolute top-0 left-0 h-full w-full object-cover"
                  height={128}
                  priority={true}
                  src="/sijaki-vibe-coding.png"
                  width={128}
                />
              </div>
            </Float>
          </div>
        </span>
      </div>
    </div>
  )
}
