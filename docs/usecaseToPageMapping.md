
# Use Case to Page Mapping
This document maps user roles and their associated [use cases](https://git.thm.de/softwarearchitektur-wz-ss24/studentswa2025/enton/gromokoso/-/blob/master/docs/diagrams/use_case.svg?ref_type=heads) to specific [pages](../src/pages/) in the application, along with mockup IDs and links to component that implement these pages.


| Actor         | Use Case              | Mockup ID | Page                                                                           | Implemented | Needed Entpoints                             |
| ------------- | --------------------- | --------- | ------------------------------------------------------------------------------ | ----------- | -------------------------------------------- |
| unknown user  | login                 | #L1       | [Login.page.tsx](../src/pages/Common/Login/Login.page.tsx)                     |             |                                              |
| System member | view personal tools   | #A1       |                                                                                |             | **GET** `/users/<username>/apis`             |
|               | add personal tools    | #A1       |                                                                                |             | **POST** `/users/<username>/apis`            |
|               | edit personal tools   | #A2       |                                                                                |             | **PUT** `/users/<username>/apis/<_id>`       |
|               | delete personal tools | #A3       |                                                                                |             | **DELETE** `/users/<username>/apis/<_id>`    |
|               | view public groups    | #G2       | [PublicGroups.page.tsx](../src/pages/Group/PublicGroups/PublicGroups.page.tsx) |             | **GET** `/groups?accessibility=public`       |
|               | join public groups    | #G2       | [PublicGroups.page.tsx](../src/pages/Group/PublicGroups/PublicGroups.page.tsx) |             | **POST** `/groups/<name>/users`              |
|               | view and edit profile | #P1       | [Profile.page.tsx](../src/pages/Common/Profile/Profile.page.tsx)               |             | **GET** `/users/<username> `                 |
| GroupMember   | view group tools      | #G3M      | [GroupDetails.page.tsx](../src/pages/Group/GroupDetails/GroupDetails.page.tsx) |             | **GET** `/groups/<name>/apis`                |
|               | view group profile    | #G3M      | [GroupDetails.page.tsx](../src/pages/Group/GroupDetails/GroupDetails.page.tsx) |             | **GET** `/groups/<name>`                     |
|               | leave group           | #G3M      | [GroupDetails.page.tsx](../src/pages/Group/GroupDetails/GroupDetails.page.tsx) |             | **DELETE** `/groups/<name>/users/<username>` |
| GroupEditor   | add group tools       | #G3E      | [GroupDetails.page.tsx](../src/pages/Group/GroupDetails/GroupDetails.page.tsx) |             | **POST** `/groups/<name>/apis`               |
|               | edit group tools      | #G3E      | [GroupDetails.page.tsx](../src/pages/Group/GroupDetails/GroupDetails.page.tsx) |             | **PUT** `/groups/<name>/apis/<api_id>`       |
|               | delete group tools    | #G3E      | [GroupDetails.page.tsx](../src/pages/Group/GroupDetails/GroupDetails.page.tsx) |             | **DELETE** `/groups/<name>/apis/<api_id>`    |
| GroupAdmin    | edit group profile    | #G3A      | [GroupDetails.page.tsx](../src/pages/Group/GroupDetails/GroupDetails.page.tsx) |             | **PUT** `/groups/<name>`                     |
|               | delete group          | #G3A      | [GroupDetails.page.tsx](../src/pages/Group/GroupDetails/GroupDetails.page.tsx) |             | **DELETE** `/groups/<name>`                     |
|               | add group members     | #G3A      | [GroupDetails.page.tsx](../src/pages/Group/GroupDetails/GroupDetails.page.tsx) |             | **POST** `/groups/<name>/users`              |
|               | remove group members  | #G3A      | [GroupDetails.page.tsx](../src/pages/Group/GroupDetails/GroupDetails.page.tsx) |             | **DELETE** `/groups/<name>/users`            |
| SystemAdmin   | manage all groups     | #G1       | [ManageGroups.page.tsx](../src/pages/Group/ManageGroups/ManageGroups.page.tsx) |             | **FULL CRUD**                                |
|               | manage all users      | #U1       | [ManageUsers.page.tsx](../src/pages/User/ManageUsers/ManageUsers.page.tsx)     |             | **FULL CRUD**                                |
|               | manage system tools   |           |                                                                                |             |                                              |
