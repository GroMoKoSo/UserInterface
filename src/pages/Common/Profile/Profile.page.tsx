import Header from "@/components/Header/Header";
import { TwoColumnLayout } from "@/components/TwoColumnLayout/TwoColumnLayout";


export function ProfilePage() {
    return (
        <TwoColumnLayout
            headerContent={<Header title="My Profile" />}
            leftContent={<></>}
        />
    )
}