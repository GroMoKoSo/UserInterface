import Header from "@/components/Header/Header.view.js";
import { TwoColumnLayout } from "@/components/TwoColumnLayout/TwoColumnLayout.container.js";
import { SimpleUserT, SYSTEM_ROLES } from "@/types/Types.js";
import { getAggregatedUser, getAllUsers } from "@/utils/api/UserApiService.js";
import { Fieldset } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { UserProfileFields } from "./components/ProfileFields.js";
import { DeleteSaveButtonGroup } from "@/components/deleteSaveButtonGroup/DeleteSaveButtonGroup.view.js";

import { useEffect } from "react";

export function ProfilePage() {
  const [usermeta, setUsermeta] = useState<SimpleUserT | null>(null);

  const form = useForm<SimpleUserT>({
    initialValues: {
      username: '',
      firstName: '',
      lastName: '',
      name: '',
      email: '',
      systemrole: SYSTEM_ROLES[0],
    },
  });

  // TODO: Use logged in user to get user data
  useEffect(() => {
    getAllUsers().then((data) => {
      if (data && data.length > 0) {
        getAggregatedUser(data[0].username).then((userData) => {
          setUsermeta(userData);
          if (userData) {
            form.setValues({
              username: userData.username,
              firstName: userData.firstName,
              lastName: userData.lastName,
              name: userData.name,
              email: userData.email,
              systemrole: userData.systemrole,
            });
          }
        });
      }
    });
  }, []); 

  return (
    <TwoColumnLayout
      headerContent={<Header title="My Profile" />}
      leftContent={
        <form
          onSubmit={form.onSubmit((values: any) => console.log(values))}
          style={{ minWidth: 600 }}
        >
          <Fieldset legend="My Information" w={"100%"}>
            <UserProfileFields form={form} user={usermeta} />
          </Fieldset>
          <DeleteSaveButtonGroup
            deleteLabel=""
            saveLabel={"Save Changes"}
            nameLabel={usermeta ? usermeta.name : ""}
            onDelete={() => {}}
            onSave={() => form.setSubmitting(true)}
            showDelete={false}
          />
        </form>
      }
    />
  );
}
