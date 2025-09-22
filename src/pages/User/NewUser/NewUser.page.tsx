import { UserFormPage } from "@/pages/User/UserFormPage/UserFormPage";
import { AggregatedUserT } from "@/types/Types";
import { createUser } from "@/utils/api/UserApiService";
import { useNavigate } from "react-router-dom";




export function NewUserPage() {
    const navigate = useNavigate();

    async function handleCreate(values: AggregatedUserT) {
        // z. B. POST-Call
        await createUser(values);
        navigate("/users");
    }

    return (
        <UserFormPage
            mode="create"
            initialUser={null} // leeres Formular
            onSubmit={handleCreate}
        />
    );
}
