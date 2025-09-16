import { Title, useMantineColorScheme } from '@mantine/core';

export function HomePage() {
  const { setColorScheme } = useMantineColorScheme();
  setColorScheme('light')
  return (
    <>
      <Title>GroMoKoSo</Title>
    </>
  );
}
