import { Card, Text } from "dracula-ui"

export function Widget({ Title, Content }) {
    return (
        <Card 
            display="inline-grid"
            color="black"
            p="sm"
            style={{boxShadow: "none"}}>
                <Text color="pink" weight="bold" size="md">{Title}</Text>
                {Content}
        </Card>
    )
}