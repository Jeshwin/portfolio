import {Button} from "@/components/ui/button";
import {Linkedin, Mail} from "lucide-react";
import {Helmet} from "react-helmet-async";
import ProfilePhoto from "/profile.jpg";

export default function ContactPage() {
    return (
        <>
            <Helmet>
                <title>Contact | Jeshwin's Portfolio</title>
                <meta name="description" content="Get in touch with Jeshwin Prince" />
            </Helmet>
            <div className="w-screen h-screen">
                <div className="w-full h-full cgrid place-content-center">
                    <div className="flex flex-col items-center container mx-auto">
                        <img
                            src={ProfilePhoto}
                            alt="Profile Photo"
                            className="rounded-full size-40 drop-shadow-xl object-cover"
                        />
                        <span className="font-bold text-7xl">Contact</span>
                        <div className="text-2xl mb-4 text-center">
                            I&apos;d love to hear from you! Shoot me an email or
                            send a message on LinkedIn!
                        </div>
                        <div className="flex space-x-2">
                            <a href="mailto:jeshwinjprince@gmail.com">
                                <Button size="lg">
                                    <Mail />
                                    jeshwinjprince@gmail.com
                                </Button>
                            </a>
                            <a href="https://www.linkedin.com/in/jeshwinprince/" target="_blank" rel="noopener noreferrer">
                                <Button size="lg">
                                    <Linkedin />
                                    jeshwinprince
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
