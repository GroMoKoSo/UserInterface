import { UserFormPage } from "@/pages/User/UserFormPage/UserFormPage.js";
import { AggregatedUserT } from "@/types/Types.js";
import { getAggregatedUser, deleteUser, updateUser } from "@/utils/api/UserApiService.js";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function UserDetailsPage() {
    const [user, setUser] = useState<AggregatedUserT | null>(null);
    const { username } = useParams<{ username: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (username) {
            getAggregatedUser(username).then(setUser);
        }
    }, [username]);

    async function handleDelete(u: AggregatedUserT) {
        await deleteUser(u.username);
        navigate(-1);
    }

    return (
        <UserFormPage
            mode="edit"
            initialUser={user}
            onSubmit={updateUser}
            onDelete={handleDelete}
        />
    );
}
