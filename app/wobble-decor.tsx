"use client"

import Image from "next/image"

export default function WobbleDecor() {
    return (
        <>
            {/* Top Liquid Shape/Images */}
            <div className="pointer-events-none fixed -top-12 left-0 w-full z-0 overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent z-10" />
                <div className="flex w-fit gap-12 wobble-x mx-auto opacity-40">
                    <div className="relative w-[280px] h-[180px] grayscale hover:grayscale-0 transition-all duration-700">
                        <Image
                            src="/ancient_rome.jpg"
                            alt=""
                            fill
                            className="object-cover rounded-2xl shadow-2xl mix-blend-multiply"
                            priority
                        />
                    </div>
                    <div className="relative w-[240px] h-[160px] translate-y-8 grayscale hover:grayscale-0 transition-all duration-700">
                        <Image
                            src="/acropolis.png"
                            alt=""
                            fill
                            className="object-cover rounded-2xl shadow-2xl mix-blend-multiply"
                            priority
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Liquid Shape/Images */}
            <div className="pointer-events-none fixed -bottom-12 left-0 w-full z-0 overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent z-10" />
                <div className="flex justify-center gap-16 wobble-x w-fit mx-auto opacity-40">
                    <div className="relative w-[160px] h-[160px] -rotate-3 grayscale hover:grayscale-0 transition-all duration-700">
                        <Image
                            src="/confucius.jpg"
                            alt=""
                            fill
                            className="object-cover rounded-2xl shadow-lg mix-blend-multiply"
                        />
                    </div>

                    <div className="relative w-[180px] h-[180px] -translate-y-6 rotate-2 grayscale hover:grayscale-0 transition-all duration-700">
                        <Image
                            src="/teddy_roosevelt.jpg"
                            alt=""
                            fill
                            className="object-cover rounded-2xl shadow-lg mix-blend-multiply"
                        />
                    </div>

                    <div className="relative w-[150px] h-[150px] -rotate-6 grayscale hover:grayscale-0 transition-all duration-700">
                        <Image
                            src="/seneca.jpg"
                            alt=""
                            fill
                            className="object-cover rounded-2xl shadow-lg mix-blend-multiply"
                            priority
                        />
                    </div>
                </div>
            </div>
        </>
    )
}