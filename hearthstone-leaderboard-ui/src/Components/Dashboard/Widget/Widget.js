import { Card, Text } from "dracula-ui"

export function Widget({ Title, Content }) {
    return (
        <Card 
            display="inline-grid"
            style={{boxShadow: "none", backgroundColor: "#1e212a", padding: "1.5em"}}>
                <Text color="pink" weight="bold" size="md">{Title}</Text>
                {Content}
        </Card>
    )
}