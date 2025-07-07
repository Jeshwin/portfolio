"use client";

import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import styles from "./css/liquid-glass.module.css";

interface LiquidGlassProps {
    children: React.ReactNode;
    radius?: number;
    border?: number;
    blend?: string;
    lightness?: number;
    alpha?: number;
    blur?: number;
    frost?: number;
    displace?: number;
    scale?: number;
    chromaticAberration?: number;
    className?: string;
    [key: string]: any; // Allow arbitrary props
}

export default function LiquidGlass({
    children,
    radius = 32,
    border = 0.1,
    blend = "difference",
    lightness = 50,
    alpha = 0.9,
    blur = 11,
    frost = 0.75,
    displace = 3,
    scale = -100,
    chromaticAberration = 3,
    className = "",
    ...restProps
}: LiquidGlassProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const glassRef = useRef<HTMLDivElement>(null);
    const debugRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({width: 100, height: 100});
    const [filterId] = useState(
        () => `liquid-glass-${Math.random().toString(36).substring(2, 11)}`
    );

    // Calculate chromatic aberration values
    const r = 0;
    const g = chromaticAberration;
    const b = chromaticAberration * 2;

    useEffect(() => {
        const updateDimensions = () => {
            if (glassRef.current) {
                const rect = glassRef.current.getBoundingClientRect();
                setDimensions({
                    width: rect.width || 100,
                    height: rect.height || 100,
                });
            }
        };

        // Initial measurement
        updateDimensions();

        // Update on resize
        const resizeObserver = new ResizeObserver(updateDimensions);
        if (glassRef.current) {
            resizeObserver.observe(glassRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        const {width, height} = dimensions;
        const borderSize = Math.min(width, height) * (border * 0.5);

        // Create displacement map SVG
        const svgContent = `
      <svg id="debug-${filterId}" class="${styles.displacementImage}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="red-${filterId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="blue-${filterId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${width}" height="${height}" fill="black"/>
        <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" fill="url(#red-${filterId})" />
        <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" fill="url(#blue-${filterId})" style="mix-blend-mode: ${blend}" />
        <rect
          x="${borderSize}" y="${borderSize}"
          width="${width - borderSize * 2}" height="${height - borderSize * 2}"
          rx="${radius}" fill="hsl(0 0% ${lightness}% / ${alpha})"
          style="filter:blur(${blur}px)" />
      </svg>
    `;

        debugRef.current.innerHTML = svgContent;
        const encodedSVG = encodeURIComponent(svgContent);
        const dataUri = `data:image/svg+xml,${encodedSVG}`;

        // Update feImage elements
        const feImageEls = containerRef.current.querySelectorAll(`feImage`);
        feImageEls.forEach((el) => {
            console.log("Found SVG Image");
            el.setAttribute("href", dataUri);
        });

        // Update displacement map elements
        const feDisplacementMapEls =
            containerRef.current.querySelectorAll(`feDisplacementMap`);
        feDisplacementMapEls.forEach((el) => {
            console.log("Found SVG Displacement");
            el.setAttribute("xChannelSelector", "R");
            el.setAttribute("yChannelSelector", "B");
            el.setAttribute("scale", scale.toString());
        });

        // Update individual channel scales
        containerRef.current
            .querySelectorAll(`#${filterId} #redchannel-${filterId}`)
            .forEach((el) => {
                el.setAttribute("scale", (scale + r).toString());
            });
        containerRef.current
            .querySelectorAll(`#${filterId} #greenchannel-${filterId}`)
            .forEach((el) => {
                el.setAttribute("scale", (scale + g).toString());
            });
        containerRef.current
            .querySelectorAll(`#${filterId} #bluechannel-${filterId}`)
            .forEach((el) => {
                el.setAttribute("scale", (scale + b).toString());
            });

        // Update blur
        containerRef.current
            .querySelectorAll(`#${filterId} feGaussianBlur`)
            .forEach((el) => {
                el.setAttribute("stdDeviation", displace.toString());
            });
    }, [
        dimensions,
        radius,
        border,
        blend,
        lightness,
        alpha,
        blur,
        displace,
        scale,
        r,
        g,
        b,
        filterId,
        containerRef,
    ]);

    return (
        <div className="relative" ref={containerRef}>
            <div
                ref={glassRef}
                className={`${styles.glassFilter} ${className}`}
                style={
                    {
                        borderRadius: `${radius}px`,
                        "--frost": frost.toString(),
                        backdropFilter: `url(#${filterId}) saturate(1.5) brightness(1.1) contrast(0.8)`,
                    } as React.CSSProperties
                }
                {...restProps}
            >
                {children}
            </div>

            {/* SVG Filter Definition */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <filter id={filterId} colorInterpolationFilters="sRGB">
                    <feImage
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        result="map"
                    />

                    {/* RED channel with strongest displacement */}
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="map"
                        id={`redchannel-${filterId}`}
                        xChannelSelector="R"
                        yChannelSelector="G"
                        result="dispRed"
                    />
                    <feColorMatrix
                        in="dispRed"
                        type="matrix"
                        values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
                        result="red"
                    />

                    {/* GREEN channel (reference / least displaced) */}
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="map"
                        id={`greenchannel-${filterId}`}
                        xChannelSelector="R"
                        yChannelSelector="G"
                        result="dispGreen"
                    />
                    <feColorMatrix
                        in="dispGreen"
                        type="matrix"
                        values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
                        result="green"
                    />

                    {/* BLUE channel with medium displacement */}
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="map"
                        id={`bluechannel-${filterId}`}
                        xChannelSelector="R"
                        yChannelSelector="G"
                        result="dispBlue"
                    />
                    <feColorMatrix
                        in="dispBlue"
                        type="matrix"
                        values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
                        result="blue"
                    />

                    {/* Blend channels back together */}
                    <feBlend in="red" in2="green" mode="screen" result="rg" />
                    <feBlend in="rg" in2="blue" mode="screen" result="output" />

                    {/* Final blur */}
                    <feGaussianBlur in="output" stdDeviation={displace} />
                </filter>
            </svg>

            {/* Debug visualization (hidden by default) */}
            <div ref={debugRef} className={styles.displacementDebug} />
        </div>
    );
}

// Demo component showing usage
export function Demo() {
    return (
        <div className="min-h-screen bg-slate-900 text-white p-8">
            <div className="relative w-full h-screen overflow-hidden">
                {/* Background images */}
                <div className="absolute inset-0 flex flex-col">
                    <Image
                        width={1920}
                        height={1080}
                        className="w-full h-1/3 object-cover"
                        src="https://images.pexels.com/photos/68507/spring-flowers-flowers-collage-floral-68507.jpeg"
                        alt="Spring flowers"
                    />
                    <Image
                        width={1920}
                        height={1080}
                        className="w-full h-1/3 object-cover"
                        src="https://images.pexels.com/photos/1292998/pexels-photo-1292998.jpeg"
                        alt="Nature"
                    />
                    <Image
                        width={1920}
                        height={1080}
                        className="w-full h-1/3 object-cover"
                        src="https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg"
                        alt="Mountains"
                    />
                </div>

                {/* Glass effect overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col gap-8 items-center">
                        <LiquidGlass
                            radius={9999}
                            chromaticAberration={3}
                            frost={0.75}
                            className="p-4"
                            onClick={() => console.log("Glass clicked!")}
                            data-testid="glass-button"
                        >
                            <svg
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M5 12h14M12 5v14" />
                            </svg>
                        </LiquidGlass>

                        <LiquidGlass
                            radius={16}
                            chromaticAberration={5}
                            frost={0.5}
                            lightness={60}
                            className="p-6"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) =>
                                e.key === "Enter" &&
                                console.log("Glass activated!")
                            }
                        >
                            <div className="text-center">
                                <h2 className="text-xl font-bold mb-2">
                                    Liquid Glass
                                </h2>
                                <p className="text-sm opacity-80">
                                    Advanced glass morphism effect
                                </p>
                            </div>
                        </LiquidGlass>
                    </div>
                </div>
            </div>
        </div>
    );
}
