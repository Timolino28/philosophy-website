"use client"

import Image from "next/image"

export default function WobbleDecor() {
    return (
        <>
            {/* Top */}
            <div className="pointer-events-none fixed top-6 left-0 w-full z-0">
                <div className="flex w-fit gap-20 wobble-x mx-auto w-[240px] opacity-80">
                    <Image
                        src="/ancient_rome.jpg"
                        alt=""
                        width={240}
                        height={140}
                        priority
                        className="w-full h-auto rounded-xl"
                    />
                    <Image
                        src="/acropolis.png"
                        alt=""
                        width={240}
                        height={140}
                        priority
                        className="w-full h-auto rounded-xl"
                    />
                </div>
            </div>

            {/* Bottom */}
            <div className="pointer-events-none fixed bottom-6 left-0 w-full z-0">
                <div className="flex mx-auto gap-20 wobble-x  w-fit opacity-80">
                    <Image
                        src="/confucius.jpg"
                        alt=""
                        width={140}
                        height={140}
                        className="w-full h-auto rounded-xl"
                    />
                    <Image
                        src="/teddy_roosevelt.jpg"
                        alt=""
                        width={140}
                        height={140}
                        className="object-cover rounded-xl"
                    />
                    <Image
                        src="/seneca.jpg"
                        alt=""
                        width={140}
                        height={140}
                        priority
                        className="w-full h-auto rounded-xl"
                    />
                </div>
            </div>
        </>
    )
}