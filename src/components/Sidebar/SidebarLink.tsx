import { Icon, Link as ChakraLink, Text } from "@chakra-ui/react";
import { ElementType } from "react";
import { ActiveLink } from "../ActiveLink";

interface SidebarLinkProps {
  icon: ElementType;
  href: string;
  children: string;
}

export function SiderbarLink({icon, href, children, ...rest}: SidebarLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" alignContent="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium" textTransform="capitalize">{children}</Text>
      </ChakraLink>
    </ActiveLink>
  )
}