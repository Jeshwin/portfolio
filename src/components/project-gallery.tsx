"use client";

import {ProjectArtifact} from "src/lib/types";
import {Card, CardContent} from "@/components/ui/card";
import AutoHeight from "embla-carousel-auto-height";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import {useEffect, useState} from "react";
import Image from "next/image";

function RenderArtifact({
    artifact,
    onImageLoad,
}: {
    artifact: ProjectArtifact;
    onImageLoad?: () => void;
}) {
    if (artifact.type === "image") {
        return (
            <div className="flex justify-center">
                <Image
                    src={artifact.url}
                    alt={artifact.alt}
                    height={1080}
                    width={1920}
                    className="rounded-2xl h-auto max-w-full"
                    onLoad={onImageLoad}
                    priority={true}
                />
            </div>
        );
    } else {
        return <Card>Hai :3</Card>;
    }
}

export default function ProjectGallery({
    artifacts,
}: {
    artifacts: ProjectArtifact[];
}) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    const handleImageLoad = () => {
        // Trigger AutoHeight recalculation after image loads
        if (api) {
            api.reInit();
        }
    };

    useEffect(() => {
        if (!api) {
            return;
        }

        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <div className="w-1/2 mx-auto">
            <Carousel
                setApi={setApi}
                className="w-full"
                plugins={[AutoHeight()]}
                opts={{
                    align: "center",
                }}
            >
                <CarouselContent className="flex items-start transition-[height] duration-700">
                    {artifacts.map((artifact, index) => (
                        <CarouselItem key={index}>
                            <RenderArtifact
                                artifact={artifact}
                                onImageLoad={handleImageLoad}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="text-muted-foreground py-2 text-center text-sm">
                {artifacts[current]?.alt}
            </div>
        </div>
    );
}
