import { Card, Text } from "dracula-ui"

export function Widget({ Title, Content }) {
    return (
        <Card 
            display="inline-grid"
            color="black"
            width="xxs"
            p="sm"
            style={{ boxShadow: "none", textAlign: "center", paddingTop: "15%", paddingBottom: "15%" }}
            >
                <Text color="pink" weight="bold" size="md" style={{ opacity: 0.8 }}>{Title}</Text>
                {Content}
        </Card>
    )
}