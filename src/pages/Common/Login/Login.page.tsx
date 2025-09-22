import Header from "@/components/Header/Header.view";
import { TwoColumnLayout } from "@/components/TwoColumnLayout/TwoColumnLayout.container";
import { Title, Text, Anchor, Paper, TextInput, PasswordInput, Group, Checkbox, Button, Container } from "@mantine/core";
import classes from "./Login.module.css"
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

export function LoginPage() {

    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
        },
    })

    function handleSubmit(values: typeof form.values) {
        console.log(values);
        navigate('/');
    }


    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Container size={420} my={40}>

                <Title ta="center" className={classes.title}>
                    Welcome to Gromokoso!
                </Title>

                <Text className={classes.subtitle}>
                    Do not have an account yet? <Anchor>Create account</Anchor>
                </Text>

                <Paper withBorder shadow="sm" p={22} mt={30} radius="md">

                    <TextInput
                        label="Email"
                        placeholder="max.patternman@gmail.com"
                        required
                        radius="md"
                        {...form.getInputProps('email')}
                    />

                    <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        required
                        mt="md"
                        radius="md"
                        {...form.getInputProps('password')}
                    />

                    <Group justify="space-between" mt="lg">

                        <Checkbox label="Remember me" />

                        <Anchor component="button" type="button" size="sm">
                            Forgot password?
                        </Anchor>

                    </Group>

                    <Button
                        fullWidth
                        mt="xl"
                        radius="md"
                        type="submit"
                    >
                        Sign in
                    </Button>

                </Paper>

            </Container>
        </form>
    )
}