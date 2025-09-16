import type { UserT } from "@/types/Types";

export const userMockData:UserT[] = [
  {
    "id": 1,
    "name": "Alice Müller",
    "firstName": "Alice",
    "lastName": "Müller",
    "role": "Admin",
    "email": "alice.mueller@example.com",
    "groups": [
      { "id": 1, "role": "User" },
      { "id": 2, "role": "Admin" }
    ]
  },
  {
    "id": 2,
    "name": "Bob Schneider",
    "firstName": "Bob",
    "lastName": "Schneider",
    "role": "User",
    "email": "bob.schneider@example.com",
    "groups": [
      { "id": 2, "role": "Admin" },
      { "id": 3, "role": "User" }
    ]
  },
  {
    "id": 3,
    "name": "Clara Fischer",
    "firstName": "Clara",
    "lastName": "Fischer",
    "role": "Manager",
    "email": "clara.fischer@example.com",
    "groups": [
      { "id": 1, "role": "User" }
    ]
  },
  {
    "id": 4,
    "name": "David Becker",
    "firstName": "David",
    "lastName": "Becker",
    "role": "User",
    "email": "david.becker@example.com",
    "groups": [
      { "id": 3, "role": "Admin" }
    ]
  },
  {
    "id": 5,
    "name": "Eva Wagner",
    "firstName": "Eva",
    "lastName": "Wagner",
    "role": "Admin",
    "email": "eva.wagner@example.com",
    "groups": [
      { "id": 1, "role": "User" },
      { "id": 4, "role": "Admin" }
    ]
  },
  {
    "id": 6,
    "name": "Felix Braun",
    "firstName": "Felix",
    "lastName": "Braun",
    "role": "User",
    "email": "felix.braun@example.com",
    "groups": [
      { "id": 2, "role": "Admin" }
    ]
  },
  {
    "id": 7,
    "name": "Greta Hofmann",
    "firstName": "Greta",
    "lastName": "Hofmann",
    "role": "User",
    "email": "greta.hofmann@example.com",
    "groups": [
      { "id": 2, "role": "Admin" },
      { "id": 3, "role": "User" }
    ]
  },
  {
    "id": 8,
    "name": "Henry Krause",
    "firstName": "Henry",
    "lastName": "Krause",
    "role": "Manager",
    "email": "henry.krause@example.com",
    "groups": [
      { "id": 3, "role": "Admin" },
      { "id": 4, "role": "User" }
    ]
  },
  {
    "id": 9,
    "name": "Isabel König",
    "firstName": "Isabel",
    "lastName": "König",
    "role": "User",
    "email": "isabel.koenig@example.com",
    "groups": [
      { "id": 1, "role": "User" }
    ]
  },
  {
    "id": 10,
    "name": "Jonas Vogel",
    "firstName": "Jonas",
    "lastName": "Vogel",
    "role": "User",
    "email": "jonas.vogel@example.com",
    "groups": [
      { "id": 1, "role": "User" },
      { "id": 2, "role": "Admin" }
    ]
  },
  {
    "id": 11,
    "name": "Klara Busch",
    "firstName": "Klara",
    "lastName": "Busch",
    "role": "Admin",
    "email": "klara.busch@example.com",
    "groups": [
      { "id": 4, "role": "User" }
    ]
  },
  {
    "id": 12,
    "name": "Lukas Wolf",
    "firstName": "Lukas",
    "lastName": "Wolf",
    "role": "User",
    "email": "lukas.wolf@example.com",
    "groups": [
      { "id": 2, "role": "Admin" },
      { "id": 3, "role": "User" }
    ]
  },
  {
    "id": 13,
    "name": "Mara Weiß",
    "firstName": "Mara",
    "lastName": "Weiß",
    "role": "Manager",
    "email": "mara.weiss@example.com",
    "groups": [
      { "id": 1, "role": "User" },
      { "id": 4, "role": "Admin" }
    ]
  },
  {
    "id": 14,
    "name": "Noah Schäfer",
    "firstName": "Noah",
    "lastName": "Schäfer",
    "role": "User",
    "email": "noah.schaefer@example.com",
    "groups": [
      { "id": 3, "role": "User" }
    ]
  },
  {
    "id": 15,
    "name": "Olivia Hartmann",
    "firstName": "Olivia",
    "lastName": "Hartmann",
    "role": "User",
    "email": "olivia.hartmann@example.com",
    "groups": [
      { "id": 1, "role": "Admin" },
      { "id": 2, "role": "User" }
    ]
  },
  {
    "id": 16,
    "name": "Paul Neumann",
    "firstName": "Paul",
    "lastName": "Neumann",
    "role": "Admin",
    "email": "paul.neumann@example.com",
    "groups": [
      { "id": 2, "role": "User" },
      { "id": 4, "role": "Admin" }
    ]
  },
  {
    "id": 17,
    "name": "Quentin Richter",
    "firstName": "Quentin",
    "lastName": "Richter",
    "role": "User",
    "email": "quentin.richter@example.com",
    "groups": [
      { "id": 4, "role": "User" }
    ]
  },
  {
    "id": 18,
    "name": "Rosa Lange",
    "firstName": "Rosa",
    "lastName": "Lange",
    "role": "User",
    "email": "rosa.lange@example.com",
    "groups": [
      { "id": 1, "role": "Admin" },
      { "id": 3, "role": "User" }
    ]
  },
  {
    "id": 19,
    "name": "Stefan Keller",
    "firstName": "Stefan",
    "lastName": "Keller",
    "role": "Manager",
    "email": "stefan.keller@example.com",
    "groups": [
      { "id": 2, "role": "User" }
    ]
  },
  {
    "id": 20,
    "name": "Tina Schmitt",
    "firstName": "Tina",
    "lastName": "Schmitt",
    "role": "User",
    "email": "tina.schmitt@example.com",
    "groups": [
      { "id": 3, "role": "Admin" },
      { "id": 4, "role": "User" }
    ]
  }
]
