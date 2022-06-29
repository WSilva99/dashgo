import { Stack } from "@chakra-ui/react";
import { RiDashboardLine, RiContactsLine, RiInputMethodLine, RiGitMergeLine } from "react-icons/ri";
import { SiderbarLink } from "./SidebarLink";
import { SiderbarSection } from "./SidebarSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="start">
      <SiderbarSection title="Geral">
        <SiderbarLink icon={RiDashboardLine} href="/dashboard">Dashboard</SiderbarLink>
        <SiderbarLink icon={RiContactsLine} href="/users">Usuários</SiderbarLink>
      </SiderbarSection>
      <SiderbarSection title="Automação">
        <SiderbarLink icon={RiInputMethodLine} href="/forms">Formulários</SiderbarLink>
        <SiderbarLink icon={RiGitMergeLine} href="/automation">Automação</SiderbarLink>
      </SiderbarSection>
    </Stack>
  )
}