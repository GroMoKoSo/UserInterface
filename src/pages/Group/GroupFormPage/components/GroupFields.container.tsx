import { AggregatedGroupT } from "@/types/Types.js";
import { Fieldset } from "@mantine/core";
import { GroupMembersField } from "./GroupMembersField.view.js";
import { GroupInformationField } from "./GroupInformationField.view.js";
import { GroupApisField } from "./GroupApisField.container.js";
import { useContext } from "react";
import { SessionContext } from "@/utils/authentication/Authwrapper.js";

// kleine Hilfsfunktion / Hook direkt in dieser Datei
export function useGroupSession(group: AggregatedGroupT | null) {
  const sessionContext = useContext(SessionContext);
  const systemRole = sessionContext?.user?.systemrole ?? "member";
  const groupRole =
    sessionContext?.user?.groupMemberships.find(
      (gr) => gr.group.name === group?.name
    )?.roleInGroup ?? "member";

  return { systemRole, groupRole };
}

export function GroupFieldsLeft({ group }: { group: AggregatedGroupT | null }) {
  const { systemRole, groupRole } = useGroupSession(group);

  return (
    <div style={{ minWidth: 600 }}>
      <Fieldset legend="Group Information">
        <GroupInformationField
          group={group}
          systemRole={systemRole}
          groupRole={groupRole}
        />
      </Fieldset>

      <Fieldset legend="Group Members" mt="md" w="100%" maw={1000}>
        <GroupMembersField
          group={group}
          systemRole={systemRole}
          groupRole={groupRole}
        />
      </Fieldset>
    </div>
  );
}

export function GroupFieldsRight({ group }: { group: AggregatedGroupT | null }) {
  const { systemRole, groupRole } = useGroupSession(group);

  return (
    <Fieldset legend="Api's">
      <GroupApisField
        group={group}
        systemRole={systemRole}
        groupRole={groupRole}
      />
    </Fieldset>
  );
}
