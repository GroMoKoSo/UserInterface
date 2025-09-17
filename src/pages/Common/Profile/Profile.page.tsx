import Header from "@/components/Header/Header.view";
import { TwoColumnLayout } from "@/components/TwoColumnLayout/TwoColumnLayout.container";


export function ProfilePage() {
    return (
        <TwoColumnLayout
            headerContent={<Header title="My Profile" />}
            leftContent={<></>}
        />
    )
}