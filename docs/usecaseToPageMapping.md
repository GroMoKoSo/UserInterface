
# Use Case to Page Mapping
This document maps user roles and their associated [use cases](https://git.thm.de/softwarearchitektur-wz-ss24/studentswa2025/enton/gromokoso/-/blob/master/docs/diagrams/use_case.svg?ref_type=heads) to specific [pages](../src/pages/) in the application, along with mockup IDs and links to component that implement these pages.


| Actor         | Use Case                    | Page             | Mockup ID | Link to component                                                              |
| ------------- | --------------------------- | ---------------- | --------- | ------------------------------------------------------------------------------ |
| unknown user  | login                       | LoginPage        | #L1       | [Login.page.tsx](../src/pages/Common/Login/Login.page.tsx)                          |
| System member | view personal tools         | ApiPage          | #A1       |                                                                                |
|               | add personal tools          | ApiPage          | #A1       |                                                                                |
|               | edit personal tools         | ApiPage          | #A2       |                                                                                |
|               | delete personal tools       | ApiPage          | #A3       |                                                                                |
|               | view and join public groups | PublicGroupsPage | #G2       | [PublicGroups.page.tsx](../src/pages/Group/PublicGroups/PublicGroups.page.tsx) |
|               | view and edit profile       | ProfilePage      | #P1       | [Profile.page.tsx](../src/pages/Common/Profile/Profile.page.tsx)               |
| GroupMember   | view group tools            | GroupDetailsPage | #G3M      | [GroupDetails.page.tsx](../src/pages/Group/GroupDetails/GroupDetails.page.tsx) |
|               | view group profile          | GroupDetailsPage | #G3M      | [GroupDetails.page.tsx](../src/pages/Group/GroupDetails/GroupDetails.page.tsx) |
|               | leave group                 | GroupDetailsPage | #G3M      | [GroupDetails.page.tsx](../src/pages/Group/GroupDetails/GroupDetails.page.tsx) |
| GroupEditor   | add group tools             | GroupDetailsPage | #G3E      | [GroupDetails.page.tsx](../src/pages/Group/GroupDetails/GroupDetails.page.tsx) |
|               | edit group tools            | GroupDetailsPage | #G3E      | [GroupDetails.page.tsx](../src/pages/Group/GroupDetails/GroupDetails.page.tsx) |
|               | delete group tools          | GroupDetailsPage | #G3E      | [GroupDetails.page.tsx](../src/pages/Group/GroupDetails/GroupDetails.page.tsx) |
| GroupAdmin    | edit group profile          | GroupDetailsPage | #G3A      | [GroupDetails.page.tsx](../src/pages/Group/GroupDetails/GroupDetails.page.tsx) |
|               | manage group members        | GroupDetailsPage | #G3A      | [GroupDetails.page.tsx](../src/pages/Group/GroupDetails/GroupDetails.page.tsx) |
| SystemAdmin   | manage all groups           | AdminGroupsPage  | #G1       | [ManageGroups.page.tsx](../src/pages/Group/ManageGroups/ManageGroups.page.tsx) |
|               | manage all users            | AdminUsersPage   | #U1       | [ManageUsers.page.tsx](../src/pages/User/ManageUsers/ManageUsers.page.tsx)     |
|               | manage system tools         | n/a              |           |                                                                                |
