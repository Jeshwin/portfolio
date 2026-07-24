import {Linkedin, Mail} from "lucide-react";
import {Button} from "@/components/ui/button";

export function Contact() {
    return (
        <div className="w-full h-full overflow-auto">
            <div className="w-full min-h-full grid place-content-center p-8">
                <div className="flex flex-col items-center container mx-auto">
                    <img
                        src="/images/site/profile.jpg"
                        alt="Profile Photo"
                        width={256}
                        height={256}
                        className="rounded-full size-40 drop-shadow-xl"
                    />
                    <span className="font-bold text-4xl">Contact</span>
                    <div className="text-lg w-96 mb-4 text-center">
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
                        <a
                            href="https://www.linkedin.com/in/jeshwinprince/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button size="lg">
                                <Linkedin />
                                jeshwinprince
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
