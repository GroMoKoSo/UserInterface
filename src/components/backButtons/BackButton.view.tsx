import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
    const navigate = useNavigate();

    return (
        <Button 
            variant="light" 
            color="red" 
            onClick={() => navigate(-1)}
            size="md"
        >
            Back
        </Button>
    );
}