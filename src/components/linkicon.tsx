import {Box, Github, Link, SquareTerminal, Youtube} from "lucide-react";

export default function CustomLinkIcon({icon}) {
    switch (icon) {
        case "GitHub":
            return <Github />;
        case "YouTube":
            return <Youtube />;
        case "3D":
            return <Box />;
        case "Demo":
            return <SquareTerminal />;
        default:
            return <Link />;
    }
}
