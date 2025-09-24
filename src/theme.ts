import { createTheme, MantineColorsTuple } from '@mantine/core';


const myGreen: MantineColorsTuple = [
  "#ecfdf2",
  "#d8fae3",
  "#abf6c3",
  "#7cf1a1",
  "#58ee84",
  "#44eb72",
  "#39ea68",
  "#2dd057",
  "#23b94c",
  "#053b17"
]

export const theme = createTheme({
    colors: {
        myGreen: myGreen,
    }
});
