import {Button} from "@/components/ui/button";
import {Linkedin, Mail} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ProfilePhoto from "../../../public/profile.jpg";

export default function ContactPage() {
    return (
        <div className="w-screen h-screen">
            <div className="w-full h-full cgrid place-content-center">
                <div className="flex flex-col items-center container mx-auto">
                    <Image
                        src={ProfilePhoto}
                        alt="Profile Photo"
                        width={256}
                        height={256}
                        className="rounded-full drop-shadow-xl"
                    />
                    <span className="font-bold text-7xl">Contact</span>
                    <div className="text-2xl mb-4 text-center">
                        I&apos;d love to hear from you! Shoot me an email or
                        send a message on LinkedIn!
                    </div>
                    <div className="flex space-x-2">
                        <Link href="mailto:jeshwinjprince@gmail.com">
                            <Button size="lg">
                                <Mail />
                                jeshwinjprince@gmail.com
                            </Button>
                        </Link>
                        <Link href="https://www.linkedin.com/in/jeshwinprince/">
                            <Button size="lg">
                                <Linkedin />
                                jeshwinprince
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
